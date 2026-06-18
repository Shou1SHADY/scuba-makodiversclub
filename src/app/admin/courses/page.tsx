"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit2, Trash2, Loader2, BookOpen, X, PlusCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const ICON_OPTIONS = ["BookOpen", "Award", "Zap", "Target", "Users", "ShieldCheck"];

const COLOR_OPTIONS = [
    { label: "Cyan → Blue", value: "from-cyan-500 to-blue-600" },
    { label: "Teal → Cyan", value: "from-teal-500 to-cyan-600" },
    { label: "Blue → Indigo", value: "from-blue-500 to-indigo-600" },
    { label: "Indigo → Purple", value: "from-indigo-500 to-purple-600" },
    { label: "Purple → Pink", value: "from-purple-500 to-pink-600" },
    { label: "Emerald → Teal", value: "from-emerald-500 to-teal-600" },
    { label: "Amber → Orange", value: "from-amber-500 to-orange-600" },
];

export default function CoursesAdminPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingCourse, setDeletingCourse] = useState<any>(null);
    const [deleting, setDeleting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const emptyForm = {
        title: "",
        level: "",
        description: "",
        icon: "BookOpen",
        color: "from-cyan-500 to-blue-600",
        image: "",
        duration: "",
        highlights: [""],
    };

    const [formData, setFormData] = useState<any>(emptyForm);

    useEffect(() => { fetchCourses(); }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
            if (error) throw error;
            setCourses(data || []);
        } catch {
            toast.error("Courses table not found. Please run the SQL migration.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (course?: any) => {
        if (course) {
            setSelectedCourse(course);
            setFormData({
                ...course,
                highlights: course.highlights?.length > 0 ? course.highlights : [""],
            });
        } else {
            setSelectedCourse(null);
            setFormData({ ...emptyForm });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title?.trim()) { toast.error("Please enter a course title."); return; }
        setSubmitting(true);
        try {
            const cleaned = {
                title: formData.title.trim(),
                level: formData.level?.trim() || "",
                description: formData.description?.trim() || "",
                icon: formData.icon || "BookOpen",
                color: formData.color || "from-cyan-500 to-blue-600",
                image: formData.image?.trim() || "",
                duration: formData.duration?.trim() || "",
                highlights: (formData.highlights || []).filter((h: string) => h?.trim() !== ""),
            };

            const result = selectedCourse
                ? await supabase.from("courses").update(cleaned).eq("id", selectedCourse.id)
                : await supabase.from("courses").insert([cleaned]);

            if (result.error) throw new Error(result.error.message);

            toast.success(selectedCourse ? "Course updated!" : "Course created!");
            setIsDialogOpen(false);
            fetchCourses();
        } catch (e: any) {
            toast.error(e?.message || "An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingCourse) return;
        setDeleting(true);
        try {
            const { error } = await supabase.from("courses").delete().eq("id", deletingCourse.id);
            if (error) throw error;
            toast.success(`"${deletingCourse.title}" deleted.`);
            setIsDeleteDialogOpen(false);
            setDeletingCourse(null);
            fetchCourses();
        } catch (e: any) {
            toast.error(e?.message || "Failed to delete course.");
        } finally {
            setDeleting(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingImage(true);
        try {
            const fileExt = file.name.split(".").pop();
            const filePath = `trip-images/course_${Date.now()}.${fileExt}`;
            const { error } = await supabase.storage.from("trip-images").upload(filePath, file, { upsert: true });
            if (error) throw error;
            const { data: urlData } = supabase.storage.from("trip-images").getPublicUrl(filePath);
            setFormData((prev: any) => ({ ...prev, image: urlData.publicUrl }));
            toast.success("Image uploaded!");
        } catch (e: any) {
            toast.error(`Upload failed: ${e.message}`);
        } finally {
            setUploadingImage(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const updateHighlight = (index: number, value: string) => {
        const arr = [...formData.highlights];
        arr[index] = value;
        setFormData({ ...formData, highlights: arr });
    };

    const addHighlight = () => {
        setFormData({ ...formData, highlights: [...formData.highlights, ""] });
    };

    const removeHighlight = (index: number) => {
        const arr = [...formData.highlights];
        arr.splice(index, 1);
        setFormData({ ...formData, highlights: arr.length > 0 ? arr : [""] });
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-display font-black text-white tracking-tight leading-none uppercase">
                        COURSES <span className="text-primary italic">CONTROL</span>
                    </h1>
                    <p className="text-gray-400 font-body text-base max-w-lg">
                        Manage diving courses, certifications, and highlights. Updates go live instantly.
                    </p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-primary hover:bg-white text-brand-navy gap-3 h-14 px-8 rounded-2xl shadow-xl shadow-primary/10 transition-all font-display font-black uppercase text-[10px] tracking-[0.2em] w-full md:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    New Course
                </Button>
            </div>

            <Card className="bg-[#020408]/40 border-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent h-16">
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] pl-8">Course Title</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Level</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Duration</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Icon</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] text-right pr-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-32">
                                        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6 opacity-50" />
                                        <p className="text-gray-500 font-display text-xs uppercase tracking-[0.3em]">Loading courses...</p>
                                    </TableCell>
                                </TableRow>
                            ) : courses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-32">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-2">
                                                <BookOpen className="w-10 h-10 text-gray-700" />
                                            </div>
                                            <p className="text-white font-display font-black text-xl uppercase tracking-widest">No Courses Yet</p>
                                            <p className="text-gray-500 text-xs uppercase tracking-widest max-w-[240px] leading-relaxed">Create your first course to get started.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                courses.map((course) => (
                                    <TableRow key={course.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="py-8 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-8 bg-primary rounded-full group-hover:h-10 transition-all duration-300" />
                                                <div className="font-display font-black text-white text-lg tracking-wide uppercase">{course.title}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {course.level ? (
                                                <Badge className="bg-primary/10 text-primary border-primary/20 font-black text-[9px] px-3 py-1 rounded-full">
                                                    {course.level}
                                                </Badge>
                                            ) : <span className="text-gray-600 text-xs">—</span>}
                                        </TableCell>
                                        <TableCell className="text-gray-400 font-body text-sm">{course.duration || "—"}</TableCell>
                                        <TableCell>
                                            <span className="text-gray-400 text-xs font-mono">{course.icon}</span>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenDialog(course)}
                                                    className="h-12 w-12 rounded-xl text-gray-500 hover:text-white hover:bg-white/5"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => { setDeletingCourse(course); setIsDeleteDialogOpen(true); }}
                                                    className="h-12 w-12 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add / Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-brand-navy border-white/5 text-white max-w-2xl rounded-[3rem] p-0 overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] border border-white/10">
                    <div className="bg-black/40 p-10 border-b border-white/5">
                        <DialogHeader className="space-y-4">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
                                <BookOpen className="w-7 h-7 text-primary" />
                            </div>
                            <DialogTitle className="text-3xl font-display font-black uppercase tracking-tighter">
                                {selectedCourse ? "EDIT" : "NEW"} <span className="text-primary italic">COURSE</span>
                            </DialogTitle>
                            <DialogDescription className="text-gray-400 text-base font-light font-body">
                                Set course details, certification level, and highlights.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="p-10 space-y-10 max-h-[55vh] overflow-y-auto custom-scrollbar">

                            {/* Course Info */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                    <div className="h-px flex-1 bg-white/10" /> COURSE INFO <div className="h-px flex-1 bg-white/10" />
                                </h3>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Title <span className="text-red-400">*</span></Label>
                                    <Input
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                        placeholder="e.g. Open Water Diver"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Level / Badge</Label>
                                        <Input
                                            value={formData.level}
                                            onChange={e => setFormData({ ...formData, level: e.target.value })}
                                            className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                            placeholder="e.g. Beginner"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Duration</Label>
                                        <Input
                                            value={formData.duration}
                                            onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                            className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                            placeholder="e.g. 3–4 Days"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Description</Label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="min-h-[80px] bg-white/5 border-white/10 rounded-2xl p-6 focus:border-primary/50 text-white placeholder:text-white/20 resize-none"
                                        placeholder="Short description of what students will learn..."
                                        rows={3}
                                    />
                                </div>
                            </div>

                            {/* Appearance */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                    <div className="h-px flex-1 bg-white/10" /> APPEARANCE <div className="h-px flex-1 bg-white/10" />
                                </h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Icon</Label>
                                        <Select value={formData.icon} onValueChange={v => setFormData({ ...formData, icon: v })}>
                                            <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-0 focus:border-primary/50">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-brand-navy border-white/10 text-white rounded-2xl">
                                                {ICON_OPTIONS.map(icon => (
                                                    <SelectItem key={icon} value={icon} className="py-3 cursor-pointer focus:bg-white/5 rounded-xl">
                                                        {icon}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Colour Theme</Label>
                                        <Select value={formData.color} onValueChange={v => setFormData({ ...formData, color: v })}>
                                            <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-0 focus:border-primary/50">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-brand-navy border-white/10 text-white rounded-2xl">
                                                {COLOR_OPTIONS.map(opt => (
                                                    <SelectItem key={opt.value} value={opt.value} className="py-3 cursor-pointer focus:bg-white/5 rounded-xl">
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Highlights */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-3">
                                        <div className="h-px flex-1 bg-white/10" /> HIGHLIGHTS <div className="h-px flex-1 bg-white/10" />
                                    </h3>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={addHighlight}
                                        className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 text-[10px] font-black uppercase tracking-[0.2em] gap-2"
                                    >
                                        <PlusCircle className="w-4 h-4" /> Add
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {(formData.highlights || []).map((h: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0" />
                                            <Input
                                                value={h}
                                                onChange={e => updateHighlight(i, e.target.value)}
                                                className="h-12 bg-white/5 border-white/5 rounded-xl px-4 text-white text-sm flex-1"
                                                placeholder={`Highlight ${i + 1}...`}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeHighlight(i)}
                                                className="h-10 w-10 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 shrink-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Image */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                    <div className="h-px flex-1 bg-white/10" /> COURSE IMAGE <div className="h-px flex-1 bg-white/10" />
                                </h3>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Image URL</Label>
                                    <Input
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploadingImage}
                                        className="w-full h-14 border-dashed border-2 border-white/10 rounded-2xl text-gray-400 hover:text-primary hover:border-primary/30 transition-all gap-3"
                                    >
                                        {uploadingImage ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                                        {uploadingImage ? "Uploading..." : "Or Upload Image"}
                                    </Button>
                                </div>
                                {formData.image && (
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-10 bg-black/40 border-t border-white/5">
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full h-16 rounded-2xl bg-primary hover:bg-white text-brand-navy font-display font-black uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-primary/20 transition-all"
                                >
                                    {submitting && <Loader2 className="animate-spin mr-3 w-5 h-5" />}
                                    {selectedCourse ? "Save Changes" : "Create Course"}
                                </Button>
                            </DialogFooter>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="bg-brand-navy border-white/5 text-white max-w-md rounded-[3rem] p-0 overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] border border-white/10">
                    <div className="bg-black/40 p-8 border-b border-white/5 text-center">
                        <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-7 h-7 text-red-400" />
                        </div>
                        <DialogHeader className="space-y-2">
                            <DialogTitle className="text-xl font-display font-black uppercase tracking-tighter">
                                DELETE <span className="text-red-400 italic">COURSE</span>
                            </DialogTitle>
                            <DialogDescription className="text-gray-400 text-sm font-light font-body">
                                Are you sure you want to delete <span className="text-white font-bold">&quot;{deletingCourse?.title}&quot;</span>? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <div className="p-8 bg-black/40 border-t border-white/5">
                        <DialogFooter className="flex gap-3">
                            <Button
                                variant="ghost"
                                onClick={() => { setIsDeleteDialogOpen(false); setDeletingCourse(null); }}
                                disabled={deleting}
                                className="h-14 px-8 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 font-display font-black uppercase text-[10px] tracking-[0.2em] flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="h-14 px-8 rounded-2xl bg-red-500 hover:bg-red-400 text-white font-display font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-red-500/10 transition-all flex-1 gap-2"
                            >
                                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                {deleting ? "Deleting..." : "Delete"}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
