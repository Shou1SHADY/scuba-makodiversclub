"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Edit2, Trash2, Loader2, Package, X, PlusCircle, Star, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function PackagesAdminPage() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState<any>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingPkg, setDeletingPkg] = useState<any>(null);
    const [deleting, setDeleting] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const emptyForm = {
        city: "",
        details: "",
        duration: "",
        description: "",
        highlights: ["", "", ""],
        dates: [""],
        featured: false,
        accent: "from-blue-600",
        image: "",
    };

    const [formData, setFormData] = useState<any>(emptyForm);

    useEffect(() => { fetchPackages(); }, []);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from("packages").select("*").order("created_at", { ascending: false });
            if (error) throw error;
            setPackages(data || []);
        } catch {
            toast.error("Packages table not found. Please run the SQL migration.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (pkg?: any) => {
        if (pkg) {
            setSelectedPkg(pkg);
            setFormData({
                ...pkg,
                highlights: pkg.highlights?.length > 0 ? pkg.highlights : ["", "", ""],
                dates: pkg.dates?.length > 0 ? pkg.dates : [""],
            });
        } else {
            setSelectedPkg(null);
            setFormData({ ...emptyForm });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.city?.trim()) { toast.error("Please enter a city / destination name."); return; }
        setSubmitting(true);
        try {
            const cleaned = {
                city: formData.city.trim(),
                details: formData.details?.trim() || "",
                duration: formData.duration?.trim() || "",
                description: formData.description?.trim() || "",
                highlights: (formData.highlights || []).filter((h: string) => h?.trim() !== ""),
                dates: (formData.dates || []).filter((d: string) => d?.trim() !== ""),
                featured: formData.featured || false,
                accent: formData.accent?.trim() || "from-blue-600",
                image: formData.image?.trim() || "",
            };

            const result = selectedPkg
                ? await supabase.from("packages").update(cleaned).eq("id", selectedPkg.id)
                : await supabase.from("packages").insert([cleaned]);

            if (result.error) throw new Error(result.error.message);

            toast.success(selectedPkg ? "Package updated!" : "Package created!");
            setIsDialogOpen(false);
            fetchPackages();
        } catch (e: any) {
            toast.error(e?.message || "An error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingPkg) return;
        setDeleting(true);
        try {
            const { error } = await supabase.from("packages").delete().eq("id", deletingPkg.id);
            if (error) throw error;
            toast.success(`"${deletingPkg.city}" deleted.`);
            setIsDeleteDialogOpen(false);
            setDeletingPkg(null);
            fetchPackages();
        } catch (e: any) {
            toast.error(e?.message || "Failed to delete package.");
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
            const filePath = `trip-images/pkg_${Date.now()}.${fileExt}`;
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

    const updateArrayItem = (field: string, index: number, value: string) => {
        const arr = [...formData[field]];
        arr[index] = value;
        setFormData({ ...formData, [field]: arr });
    };

    const addArrayItem = (field: string) => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeArrayItem = (field: string, index: number) => {
        const arr = [...formData[field]];
        arr.splice(index, 1);
        setFormData({ ...formData, [field]: arr.length > 0 ? arr : [""] });
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-display font-black text-white tracking-tight leading-none uppercase">
                        PACKAGES <span className="text-primary italic">CONTROL</span>
                    </h1>
                    <p className="text-gray-400 font-body text-base max-w-lg">
                        Manage diving packages, destinations, and departure dates. Updates go live instantly.
                    </p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-primary hover:bg-white text-brand-navy gap-3 h-14 px-8 rounded-2xl shadow-xl shadow-primary/10 transition-all font-display font-black uppercase text-[10px] tracking-[0.2em] w-full md:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    New Package
                </Button>
            </div>

            <Card className="bg-[#020408]/40 border-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent h-16">
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] pl-8">Destination</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Duration</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Departures</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Featured</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] text-right pr-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-32">
                                        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6 opacity-50" />
                                        <p className="text-gray-500 font-display text-xs uppercase tracking-[0.3em]">Loading packages...</p>
                                    </TableCell>
                                </TableRow>
                            ) : packages.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-32">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-2">
                                                <Package className="w-10 h-10 text-gray-700" />
                                            </div>
                                            <p className="text-white font-display font-black text-xl uppercase tracking-widest">No Packages Yet</p>
                                            <p className="text-gray-500 text-xs uppercase tracking-widest max-w-[240px] leading-relaxed">Create your first package to get started.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                packages.map((pkg) => (
                                    <TableRow key={pkg.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="py-8 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-8 bg-primary rounded-full group-hover:h-10 transition-all duration-300" />
                                                <div>
                                                    <div className="font-display font-black text-white text-lg tracking-wide uppercase">{pkg.city}</div>
                                                    {pkg.details && <div className="text-gray-500 text-xs mt-0.5">{pkg.details}</div>}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-400 font-body text-sm">{pkg.duration || "—"}</TableCell>
                                        <TableCell>
                                            <Badge className="bg-primary/10 text-primary border-primary/20 font-black text-[9px] px-3 py-1 rounded-full">
                                                {pkg.dates?.length || 0} dates
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {pkg.featured ? (
                                                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-black text-[9px] px-3 py-1 rounded-full gap-1">
                                                    <Star className="w-3 h-3" /> Featured
                                                </Badge>
                                            ) : (
                                                <span className="text-gray-600 text-xs">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenDialog(pkg)}
                                                    className="h-12 w-12 rounded-xl text-gray-500 hover:text-white hover:bg-white/5"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => { setDeletingPkg(pkg); setIsDeleteDialogOpen(true); }}
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
                                <Package className="w-7 h-7 text-primary" />
                            </div>
                            <DialogTitle className="text-3xl font-display font-black uppercase tracking-tighter">
                                {selectedPkg ? "EDIT" : "NEW"} <span className="text-primary italic">PACKAGE</span>
                            </DialogTitle>
                            <DialogDescription className="text-gray-400 text-base font-light font-body">
                                Configure destination details, departure dates, and highlights.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="p-10 space-y-10 max-h-[55vh] overflow-y-auto custom-scrollbar">

                            {/* Destination Info */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                    <div className="h-px flex-1 bg-white/10" /> DESTINATION INFO <div className="h-px flex-1 bg-white/10" />
                                </h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3 col-span-2">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">City / Destination <span className="text-red-400">*</span></Label>
                                        <Input
                                            value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                            className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                            placeholder="e.g. Hurghada"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Subtitle / Details</Label>
                                        <Input
                                            value={formData.details}
                                            onChange={e => setFormData({ ...formData, details: e.target.value })}
                                            className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                            placeholder="e.g. Red Sea · Egypt"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Duration</Label>
                                        <Input
                                            value={formData.duration}
                                            onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                            className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                            placeholder="e.g. 7 Nights / 8 Days"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Description</Label>
                                    <Textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="min-h-[80px] bg-white/5 border-white/10 rounded-2xl p-6 focus:border-primary/50 text-white placeholder:text-white/20 resize-none"
                                        placeholder="A short quote-style description shown on the card..."
                                        rows={3}
                                    />
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
                                        onClick={() => addArrayItem("highlights")}
                                        className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 text-[10px] font-black uppercase tracking-[0.2em] gap-2"
                                    >
                                        <PlusCircle className="w-4 h-4" /> Add
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {(formData.highlights || []).map((h: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                                <span className="text-emerald-400 text-[10px] font-black">{i + 1}</span>
                                            </div>
                                            <Input
                                                value={h}
                                                onChange={e => updateArrayItem("highlights", i, e.target.value)}
                                                className="h-12 bg-white/5 border-white/5 rounded-xl px-4 text-white text-sm flex-1"
                                                placeholder={`Highlight ${i + 1}...`}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeArrayItem("highlights", i)}
                                                className="h-10 w-10 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 shrink-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Departure Dates */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                        <div className="h-px flex-1 bg-white/10" /> DEPARTURE DATES <div className="h-px flex-1 bg-white/10" />
                                    </h3>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => addArrayItem("dates")}
                                        className="text-primary hover:text-primary-light hover:bg-primary/10 text-[10px] font-black uppercase tracking-[0.2em] gap-2"
                                    >
                                        <PlusCircle className="w-4 h-4" /> Add Date
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {(formData.dates || []).map((d: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Input
                                                value={d}
                                                onChange={e => updateArrayItem("dates", i, e.target.value)}
                                                className="h-12 bg-white/5 border-white/5 rounded-xl px-4 text-white text-sm flex-1"
                                                placeholder="e.g. Feb 14–21, 2026"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeArrayItem("dates", i)}
                                                className="h-10 w-10 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 shrink-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Styling & Image */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                    <div className="h-px flex-1 bg-white/10" /> STYLING & IMAGE <div className="h-px flex-1 bg-white/10" />
                                </h3>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Accent Gradient (Tailwind)</Label>
                                    <Input
                                        value={formData.accent}
                                        onChange={e => setFormData({ ...formData, accent: e.target.value })}
                                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                        placeholder="e.g. from-blue-600 or from-teal-500"
                                    />
                                    <p className="text-gray-600 text-[10px] ml-1">Used as the card colour overlay. Examples: from-blue-600, from-teal-500, from-indigo-600</p>
                                </div>
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
                                <div className="flex items-center gap-4 p-5 bg-white/[0.03] rounded-2xl border border-white/5">
                                    <Switch
                                        checked={formData.featured}
                                        onCheckedChange={v => setFormData({ ...formData, featured: v })}
                                    />
                                    <div>
                                        <p className="text-white text-sm font-bold">Featured Package</p>
                                        <p className="text-gray-500 text-xs">Shows a &quot;Most Popular&quot; badge on the package card</p>
                                    </div>
                                </div>
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
                                    {selectedPkg ? "Save Changes" : "Create Package"}
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
                                DELETE <span className="text-red-400 italic">PACKAGE</span>
                            </DialogTitle>
                            <DialogDescription className="text-gray-400 text-sm font-light font-body">
                                Are you sure you want to delete <span className="text-white font-bold">&quot;{deletingPkg?.city}&quot;</span>? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                    <div className="p-8 bg-black/40 border-t border-white/5">
                        <DialogFooter className="flex gap-3">
                            <Button
                                variant="ghost"
                                onClick={() => { setIsDeleteDialogOpen(false); setDeletingPkg(null); }}
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
