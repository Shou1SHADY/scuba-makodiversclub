"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, MoreVertical, Edit2, Trash2, Tag, Loader2, Calendar, MapPin, Anchor, DollarSign, Ship } from "lucide-react";
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

export default function SafarisAdminPage() {
    const [safaris, setSafaris] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedSafari, setSelectedSafari] = useState<any>(null);
    const supabase = createClient();

    const [formData, setFormData] = useState<any>({
        title: "",
        type: "Full Liveaboard",
        route: "",
        dates: "",
        port: "",
        yacht: "HH II",
        price: "",
        earlyBird: "",
        status: "Booking Now",
        itinerary: [{ activities: [] }],
        included: [],
        notIncluded: []
    });

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
            setFormData(safari);
        } else {
            setSelectedSafari(null);
            setFormData({
                title: "",
                type: "Full Liveaboard",
                route: "",
                dates: "",
                port: "",
                yacht: "HH II",
                price: "",
                earlyBird: "",
                status: "Booking Now",
                itinerary: [{ activities: [] }],
                included: ["Full board", "Guided dives"] as any,
                notIncluded: ["Equipment"] as any
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (selectedSafari) {
                const { error } = await supabase.from('safaris').update(formData).eq('id', selectedSafari.id);
                if (error) throw error;
                toast.success("Safari updated!");
            } else {
                const { error } = await supabase.from('safaris').insert([formData]);
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
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenDialog(s)}
                                                className="h-12 w-12 rounded-xl text-gray-500 hover:text-white hover:bg-white/5"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-brand-navy border-white/5 text-white max-w-2xl rounded-[3rem] p-0 overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] border border-white/10">
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

                    <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
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
                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Classification Pool</Label>
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
                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Vessel Name</Label>
                                <Input
                                    value={formData.yacht}
                                    onChange={e => setFormData({ ...formData, yacht: e.target.value })}
                                    className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
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
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Early Entry Price</Label>
                                <Input
                                    value={formData.earlyBird}
                                    onChange={e => setFormData({ ...formData, earlyBird: e.target.value })}
                                    className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                    placeholder="e.g. 25K EGP"
                                />
                            </div>
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Standard Entry Price</Label>
                                <Input
                                    value={formData.price}
                                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                    placeholder="e.g. 28K EGP"
                                />
                            </div>
                            <div className="space-y-3 col-span-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Mission Route / Summary</Label>
                                <Textarea
                                    value={formData.route}
                                    onChange={e => setFormData({ ...formData, route: e.target.value })}
                                    className="min-h-[100px] bg-white/5 border-white/10 rounded-2xl p-6 focus:border-primary/50 text-white placeholder:text-white/20 resize-none"
                                    rows={3}
                                />
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
