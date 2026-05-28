"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, MoreVertical, Edit2, Trash2, Tag, Loader2, Calendar, MapPin, Anchor, DollarSign, Ship, Eye, Upload, X, ImagePlus, Check, Minus, PlusCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface CustomDetailSection {
    header: string;
    items: string[];
}

interface ItineraryDay {
    day: string;
    activities: string[];
}

export default function SafarisAdminPage() {
    const [safaris, setSafaris] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedSafari, setSelectedSafari] = useState<any>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const emptyForm = {
        title: "",
        type: "Full Liveaboard",
        route: "",
        dates: "",
        port: "",
        yacht: "HH II",
        price: "",
        earlyBird: "",
        status: "Booking Now",
        itinerary: [{ day: "Day 1", activities: [""] }],
        included: [""],
        notIncluded: [""],
        images: [] as string[],
        customDetails: [] as CustomDetailSection[]
    };

    const [formData, setFormData] = useState<any>(emptyForm);

    useEffect(() => {
        fetchSafaris();
    }, []);

    const fetchSafaris = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from('safaris').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            setSafaris(data || []);
        } catch (e: any) {
            toast.error("Safaris table not found. Please run the SQL migration.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (safari?: any) => {
        if (safari) {
            setSelectedSafari(safari);
            const s = { ...safari };
            if (!s.itinerary || s.itinerary.length === 0) s.itinerary = [{ day: "Day 1", activities: [""] }];
            if (!s.included || s.included.length === 0) s.included = [""];
            if (!s.notIncluded || s.notIncluded.length === 0) s.notIncluded = [""];
            if (!s.images) s.images = [];
            if (!s.customDetails) s.customDetails = [];
            setFormData(s);
        } else {
            setSelectedSafari(null);
            setFormData({ ...emptyForm });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const cleaned = {
                ...formData,
                included: formData.included.filter((x: string) => x.trim() !== ""),
                notIncluded: formData.notIncluded.filter((x: string) => x.trim() !== ""),
                itinerary: formData.itinerary.map((d: ItineraryDay) => ({
                    ...d,
                    activities: d.activities.filter((a: string) => a.trim() !== "")
                })).filter((d: ItineraryDay) => d.activities.length > 0),
                customDetails: formData.customDetails.filter((s: CustomDetailSection) =>
                    s.header.trim() !== "" && s.items.filter((i: string) => i.trim() !== "").length > 0
                ).map((s: CustomDetailSection) => ({
                    ...s,
                    items: s.items.filter((i: string) => i.trim() !== "")
                }))
            };

            if (selectedSafari) {
                const { error } = await supabase.from('safaris').update(cleaned).eq('id', selectedSafari.id);
                if (error) throw error;
                toast.success("Safari updated!");
            } else {
                const { error } = await supabase.from('safaris').insert([cleaned]);
                if (error) throw error;
                toast.success("Safari created!");
            }
            setIsDialogOpen(false);
            fetchSafaris();
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingImage(true);
        const uploadedUrls: string[] = [];

        for (const file of Array.from(files)) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
            const filePath = `trip-images/${fileName}`;

            const { data, error } = await supabase.storage
                .from('trip-images')
                .upload(filePath, file, { upsert: true });

            if (error) {
                toast.error(`Failed to upload ${file.name}: ${error.message}`);
                continue;
            }

            const { data: urlData } = supabase.storage
                .from('trip-images')
                .getPublicUrl(filePath);

            if (urlData?.publicUrl) {
                uploadedUrls.push(urlData.publicUrl);
            }
        }

        if (uploadedUrls.length > 0) {
            setFormData({
                ...formData,
                images: [...(formData.images || []), ...uploadedUrls]
            });
            toast.success(`${uploadedUrls.length} image(s) uploaded`);
        }

        setUploadingImage(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeImage = (index: number) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData({ ...formData, images: newImages });
    };

    const addArrayItem = (field: string) => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const updateArrayItem = (field: string, index: number, value: string) => {
        const arr = [...formData[field]];
        arr[index] = value;
        setFormData({ ...formData, [field]: arr });
    };

    const removeArrayItem = (field: string, index: number) => {
        const arr = [...formData[field]];
        arr.splice(index, 1);
        setFormData({ ...formData, [field]: arr });
    };

    const addItineraryDay = () => {
        setFormData({
            ...formData,
            itinerary: [...formData.itinerary, { day: `Day ${formData.itinerary.length + 1}`, activities: [""] }]
        });
    };

    const updateItineraryDay = (dayIndex: number, value: string) => {
        const itin = [...formData.itinerary];
        itin[dayIndex] = { ...itin[dayIndex], day: value };
        setFormData({ ...formData, itinerary: itin });
    };

    const addItineraryActivity = (dayIndex: number) => {
        const itin = [...formData.itinerary];
        itin[dayIndex] = { ...itin[dayIndex], activities: [...itin[dayIndex].activities, ""] };
        setFormData({ ...formData, itinerary: itin });
    };

    const updateItineraryActivity = (dayIndex: number, actIndex: number, value: string) => {
        const itin = [...formData.itinerary];
        const acts = [...itin[dayIndex].activities];
        acts[actIndex] = value;
        itin[dayIndex] = { ...itin[dayIndex], activities: acts };
        setFormData({ ...formData, itinerary: itin });
    };

    const removeItineraryActivity = (dayIndex: number, actIndex: number) => {
        const itin = [...formData.itinerary];
        const acts = [...itin[dayIndex].activities];
        acts.splice(actIndex, 1);
        if (acts.length === 0) acts.push("");
        itin[dayIndex] = { ...itin[dayIndex], activities: acts };
        setFormData({ ...formData, itinerary: itin });
    };

    const removeItineraryDay = (dayIndex: number) => {
        const itin = [...formData.itinerary];
        itin.splice(dayIndex, 1);
        setFormData({ ...formData, itinerary: itin.length > 0 ? itin : [{ day: "Day 1", activities: [""] }] });
    };

    const addCustomSection = () => {
        setFormData({
            ...formData,
            customDetails: [...(formData.customDetails || []), { header: "", items: [""] }]
        });
    };

    const updateCustomHeader = (sectionIndex: number, value: string) => {
        const sections = [...(formData.customDetails || [])];
        sections[sectionIndex] = { ...sections[sectionIndex], header: value };
        setFormData({ ...formData, customDetails: sections });
    };

    const addCustomItem = (sectionIndex: number) => {
        const sections = [...(formData.customDetails || [])];
        sections[sectionIndex] = { ...sections[sectionIndex], items: [...sections[sectionIndex].items, ""] };
        setFormData({ ...formData, customDetails: sections });
    };

    const updateCustomItem = (sectionIndex: number, itemIndex: number, value: string) => {
        const sections = [...(formData.customDetails || [])];
        const items = [...sections[sectionIndex].items];
        items[itemIndex] = value;
        sections[sectionIndex] = { ...sections[sectionIndex], items };
        setFormData({ ...formData, customDetails: sections });
    };

    const removeCustomItem = (sectionIndex: number, itemIndex: number) => {
        const sections = [...(formData.customDetails || [])];
        const items = [...sections[sectionIndex].items];
        items.splice(itemIndex, 1);
        if (items.length === 0) items.push("");
        sections[sectionIndex] = { ...sections[sectionIndex], items };
        setFormData({ ...formData, customDetails: sections });
    };

    const removeCustomSection = (sectionIndex: number) => {
        const sections = [...(formData.customDetails || [])];
        sections.splice(sectionIndex, 1);
        setFormData({ ...formData, customDetails: sections });
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-display font-black text-white tracking-tight leading-none uppercase">
                        EXPEDITION <span className="text-primary italic">COMMAND</span>
                    </h1>
                    <p className="text-gray-400 font-body text-base max-w-lg">
                        Manage diving trips, liveaboards, and hotel packages. Data updates real-time across the site.
                    </p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-primary hover:bg-white text-brand-navy gap-3 h-14 px-8 rounded-2xl shadow-xl shadow-primary/10 transition-all font-display font-black uppercase text-[10px] tracking-[0.2em] w-full md:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    New Expedition
                </Button>
            </div>

            <Card className="bg-[#020408]/40 border-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent h-16">
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] pl-8">Trip Identifier</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Classification</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Operational Window</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Financials</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] text-right pr-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-32">
                                        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6 opacity-50" />
                                        <p className="text-gray-500 font-display text-xs uppercase tracking-[0.3em]">Synching with Red Sea Grid...</p>
                                    </TableCell>
                                </TableRow>
                            ) : safaris.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-32">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-2">
                                                <Anchor className="w-10 h-10 text-gray-700" />
                                            </div>
                                            <p className="text-white font-display font-black text-xl uppercase tracking-widest">Fleet Grounded</p>
                                            <p className="text-gray-500 text-xs uppercase tracking-widest max-w-[240px] leading-relaxed">No expedition data found. Initiate a new mission to begin.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                safaris.map((s) => (
                                    <TableRow key={s.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="py-8 pl-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-8 bg-primary rounded-full group-hover:h-10 transition-all duration-300" />
                                                <div className="font-display font-black text-white text-lg tracking-wide uppercase">{s.title}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className="bg-primary/10 text-primary border-primary/20 font-black uppercase tracking-[0.1em] text-[9px] px-3 py-1 rounded-full">
                                                {s.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-400 font-body text-sm font-medium">{s.dates}</TableCell>
                                        <TableCell>
                                            <div className="font-display font-black text-primary text-lg tracking-tighter">
                                                {s.earlyBird || s.price || 'P.O.A'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/safaris/${s.id}`} target="_blank">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-12 w-12 rounded-xl text-gray-500 hover:text-primary hover:bg-primary/10"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenDialog(s)}
                                                    className="h-12 w-12 rounded-xl text-gray-500 hover:text-white hover:bg-white/5"
                                                >
                                                    <Edit2 className="w-5 h-5" />
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-brand-navy border-white/5 text-white max-w-3xl rounded-[3rem] p-0 overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] border border-white/10">
                    <div className="bg-black/40 p-10 border-b border-white/5">
                        <DialogHeader className="space-y-4">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
                                <Ship className="w-7 h-7 text-primary" />
                            </div>
                            <DialogTitle className="text-3xl font-display font-black uppercase tracking-tighter">
                                {selectedSafari ? "EXPEDITION" : "MISSION"} <span className="text-primary italic">CONFIG</span>
                            </DialogTitle>
                            <DialogDescription className="text-gray-400 text-base font-light font-body">
                                Calibrate trip parameters and deployment schedule.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-10 max-h-[55vh] overflow-y-auto custom-scrollbar">
                        {/* ── Basic Info ── */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                <div className="h-px flex-1 bg-white/10" />
                                BASIC INFORMATION
                                <div className="h-px flex-1 bg-white/10" />
                            </h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3 col-span-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Banner Designation</Label>
                                    <Input
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Classification</Label>
                                    <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                                        <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-0 focus:border-primary/50"><SelectValue /></SelectTrigger>
                                        <SelectContent className="bg-brand-navy border-white/10 text-white rounded-2xl">
                                            <SelectItem value="Full Liveaboard" className="py-4 cursor-pointer focus:bg-white/5 rounded-xl">FULL LIVEABOARD</SelectItem>
                                            <SelectItem value="Mini Safari" className="py-4 cursor-pointer focus:bg-white/5 rounded-xl">MINI SAFARI</SelectItem>
                                            <SelectItem value="Hotel Package" className="py-4 cursor-pointer focus:bg-white/5 rounded-xl">HOTEL PACKAGE</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Status</Label>
                                    <Select value={formData.status} onValueChange={v => setFormData({ ...formData, status: v })}>
                                        <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-0 focus:border-primary/50"><SelectValue /></SelectTrigger>
                                        <SelectContent className="bg-brand-navy border-white/10 text-white rounded-2xl">
                                            <SelectItem value="Booking Now">BOOKING NOW</SelectItem>
                                            <SelectItem value="Limited Spots">LIMITED SPOTS</SelectItem>
                                            <SelectItem value="Early Bird Open">EARLY BIRD OPEN</SelectItem>
                                            <SelectItem value="Holiday Special">HOLIDAY SPECIAL</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Vessel Name</Label>
                                    <Input
                                        value={formData.yacht}
                                        onChange={e => setFormData({ ...formData, yacht: e.target.value })}
                                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Port</Label>
                                    <Input
                                        value={formData.port || ""}
                                        onChange={e => setFormData({ ...formData, port: e.target.value })}
                                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                        placeholder="e.g. Hurghada"
                                    />
                                </div>
                                <div className="space-y-3 col-span-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Deployment Window (Dates)</Label>
                                    <Input
                                        value={formData.dates}
                                        onChange={e => setFormData({ ...formData, dates: e.target.value })}
                                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ── Pricing ── */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                <div className="h-px flex-1 bg-white/10" />
                                PRICING
                                <div className="h-px flex-1 bg-white/10" />
                            </h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Early Entry Price</Label>
                                    <Input
                                        value={formData.earlyBird || ""}
                                        onChange={e => setFormData({ ...formData, earlyBird: e.target.value })}
                                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                        placeholder="e.g. 25K EGP"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Standard Entry Price</Label>
                                    <Input
                                        value={formData.price || ""}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                        placeholder="e.g. 28K EGP"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ── Route ── */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                <div className="h-px flex-1 bg-white/10" />
                                ROUTE / SUMMARY
                                <div className="h-px flex-1 bg-white/10" />
                            </h3>
                            <Textarea
                                value={formData.route || ""}
                                onChange={e => setFormData({ ...formData, route: e.target.value })}
                                className="min-h-[100px] bg-white/5 border-white/10 rounded-2xl p-6 focus:border-primary/50 text-white placeholder:text-white/20 resize-none"
                                rows={4}
                            />
                        </div>

                        {/* ── Itinerary ── */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-white/10" />
                                    ITINERARY
                                    <div className="h-px flex-1 bg-white/10" />
                                </h3>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={addItineraryDay}
                                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 text-[10px] font-black uppercase tracking-[0.2em] gap-2"
                                >
                                    <PlusCircle className="w-4 h-4" /> Add Day
                                </Button>
                            </div>
                            <div className="space-y-6">
                                {(formData.itinerary || []).map((day: ItineraryDay, dayIndex: number) => (
                                    <div key={dayIndex} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Input
                                                value={day.day}
                                                onChange={e => updateItineraryDay(dayIndex, e.target.value)}
                                                className="h-12 bg-white/5 border-white/10 rounded-xl px-4 text-white text-sm font-bold flex-1"
                                                placeholder="Day title..."
                                            />
                                            {(formData.itinerary || []).length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeItineraryDay(dayIndex)}
                                                    className="h-10 w-10 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                        <div className="space-y-2 pl-2">
                                            {day.activities.map((act: string, actIndex: number) => (
                                                <div key={actIndex} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0" />
                                                    <Input
                                                        value={act}
                                                        onChange={e => updateItineraryActivity(dayIndex, actIndex, e.target.value)}
                                                        className="h-10 bg-white/5 border-white/5 rounded-xl px-4 text-white text-sm flex-1"
                                                        placeholder="Activity description..."
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeItineraryActivity(dayIndex, actIndex)}
                                                        className="h-8 w-8 rounded-lg text-gray-500 hover:text-red-400 shrink-0"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => addItineraryActivity(dayIndex)}
                                            className="text-emerald-400/60 hover:text-emerald-400 text-[10px] font-bold uppercase tracking-[0.15em] ml-2"
                                        >
                                            <Plus className="w-3 h-3 mr-1" /> Add Activity
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── What's Included ── */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-400 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-white/10" />
                                    WHAT'S INCLUDED
                                    <div className="h-px flex-1 bg-white/10" />
                                </h3>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => addArrayItem('included')}
                                    className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 text-[10px] font-black uppercase tracking-[0.2em] gap-2"
                                >
                                    <PlusCircle className="w-4 h-4" /> Add Item
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {(formData.included || []).map((item: string, index: number) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <Input
                                            value={item}
                                            onChange={e => updateArrayItem('included', index, e.target.value)}
                                            className="h-12 bg-white/5 border-white/5 rounded-xl px-4 text-white text-sm flex-1"
                                            placeholder="e.g. Full-board accommodation"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeArrayItem('included', index)}
                                            className="h-10 w-10 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 shrink-0"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Not Included ── */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-rose-400 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-white/10" />
                                    NOT INCLUDED
                                    <div className="h-px flex-1 bg-white/10" />
                                </h3>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => addArrayItem('notIncluded')}
                                    className="text-rose-400 hover:text-rose-300 hover:bg-rose-400/10 text-[10px] font-black uppercase tracking-[0.2em] gap-2"
                                >
                                    <PlusCircle className="w-4 h-4" /> Add Item
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {(formData.notIncluded || []).map((item: string, index: number) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <X className="w-4 h-4 text-rose-400 shrink-0" />
                                        <Input
                                            value={item}
                                            onChange={e => updateArrayItem('notIncluded', index, e.target.value)}
                                            className="h-12 bg-white/5 border-white/5 rounded-xl px-4 text-white text-sm flex-1"
                                            placeholder="e.g. Equipment rental"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeArrayItem('notIncluded', index)}
                                            className="h-10 w-10 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 shrink-0"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Custom Detail Sections ── */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                    <div className="h-px flex-1 bg-white/10" />
                                    CUSTOM DETAIL SECTIONS
                                    <div className="h-px flex-1 bg-white/10" />
                                </h3>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={addCustomSection}
                                    className="text-primary hover:text-primary-light hover:bg-primary/10 text-[10px] font-black uppercase tracking-[0.2em] gap-2"
                                >
                                    <PlusCircle className="w-4 h-4" /> Add Section
                                </Button>
                            </div>
                            <div className="space-y-6">
                                {(formData.customDetails || []).map((section: CustomDetailSection, secIndex: number) => (
                                    <div key={secIndex} className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Input
                                                value={section.header}
                                                onChange={e => updateCustomHeader(secIndex, e.target.value)}
                                                className="h-12 bg-white/5 border-white/10 rounded-xl px-4 text-white text-sm font-bold flex-1"
                                                placeholder="Section header (e.g. Equipment Details)"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeCustomSection(secIndex)}
                                                className="h-10 w-10 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="space-y-2 pl-2">
                                            {section.items.map((item: string, itemIndex: number) => (
                                                <div key={itemIndex} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                                                    <Input
                                                        value={item}
                                                        onChange={e => updateCustomItem(secIndex, itemIndex, e.target.value)}
                                                        className="h-10 bg-white/5 border-white/5 rounded-xl px-4 text-white text-sm flex-1"
                                                        placeholder="Detail item..."
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeCustomItem(secIndex, itemIndex)}
                                                        className="h-8 w-8 rounded-lg text-gray-500 hover:text-red-400 shrink-0"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => addCustomItem(secIndex)}
                                            className="text-primary/60 hover:text-primary text-[10px] font-bold uppercase tracking-[0.15em] ml-2"
                                        >
                                            <Plus className="w-3 h-3 mr-1" /> Add Item
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Images ── */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                                <div className="h-px flex-1 bg-white/10" />
                                IMAGE GALLERY
                                <div className="h-px flex-1 bg-white/10" />
                            </h3>
                            <div className="space-y-4">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploadingImage}
                                    className="w-full h-16 border-dashed border-2 border-white/10 rounded-2xl text-gray-400 hover:text-primary hover:border-primary/30 transition-all gap-3"
                                >
                                    {uploadingImage ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Upload className="w-5 h-5" />
                                    )}
                                    {uploadingImage ? "Uploading..." : "Upload Images"}
                                </Button>

                                {(formData.images || []).length > 0 && (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                        {(formData.images || []).map((img: string, index: number) => (
                                            <div key={index} className="relative group aspect-video rounded-xl overflow-hidden border border-white/5">
                                                <img
                                                    src={img}
                                                    alt={`Trip image ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-500/90 hover:bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-3.5 h-3.5 text-white" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>

                    <div className="p-10 bg-black/40 border-t border-white/5">
                        <DialogFooter>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="w-full h-16 rounded-2xl bg-primary hover:bg-white text-brand-navy font-display font-black uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-primary/20 transition-all"
                            >
                                {submitting ? <Loader2 className="animate-spin mr-3 w-5 h-5" /> : null}
                                {selectedSafari ? "Sync Expedition" : "Launch Mission"}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
