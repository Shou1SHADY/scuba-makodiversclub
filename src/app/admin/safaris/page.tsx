"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Search, MoreVertical, Edit2, Trash2, Tag, Loader2, Calendar, MapPin, Anchor, DollarSign } from "lucide-react";
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
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white font-display">Manage Safaris</h1>
                    <p className="text-zinc-400">Update trips for Schedule and Mini Safaris tabs.</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="bg-primary text-brand-navy font-bold uppercase tracking-widest text-xs h-11 px-6">
                    <Plus className="w-4 h-4 mr-2" /> Add Safari
                </Button>
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
                <Table>
                    <TableHeader>
                        <TableRow className="border-zinc-800">
                            <TableHead className="text-zinc-400">Trip Name</TableHead>
                            <TableHead className="text-zinc-400">Type</TableHead>
                            <TableHead className="text-zinc-400">Dates</TableHead>
                            <TableHead className="text-zinc-400">Price/EB</TableHead>
                            <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={5} className="text-center py-10"><Loader2 className="animate-spin inline mr-2" /> Loading...</TableCell></TableRow>
                        ) : safaris.map((s) => (
                            <TableRow key={s.id} className="border-zinc-800 hover:bg-white/5">
                                <TableCell className="font-bold text-white">{s.title}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-[10px] uppercase">{s.type}</Badge>
                                </TableCell>
                                <TableCell className="text-zinc-400 text-sm">{s.dates}</TableCell>
                                <TableCell className="text-primary font-bold">{s.earlyBird || s.price || 'TBA'}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(s)}><Edit2 className="w-4 h-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>{selectedSafari ? "Edit Safari" : "New Safari Expedition"}</DialogTitle>
                        <DialogDescription>Update pricing, dates, and itinerary for the website.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                        <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                            <div className="space-y-2 col-span-2">
                                <Label>Trip Banner Title</Label>
                                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="bg-zinc-800 border-zinc-700 h-11" required />
                            </div>
                            <div className="space-y-2">
                                <Label>Trip Type</Label>
                                <Select value={formData.type} onValueChange={v => setFormData({ ...formData, type: v })}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700 h-11"><SelectValue /></SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                        <SelectItem value="Full Liveaboard">Full Liveaboard</SelectItem>
                                        <SelectItem value="Mini Safari">Mini Safari</SelectItem>
                                        <SelectItem value="Hotel Package">Hotel Package</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Yacht</Label>
                                <Input value={formData.yacht} onChange={e => setFormData({ ...formData, yacht: e.target.value })} className="bg-zinc-800 border-zinc-700 h-11" />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label>Dates (e.g. 19 to 21 March 2026)</Label>
                                <Input value={formData.dates} onChange={e => setFormData({ ...formData, dates: e.target.value })} className="bg-zinc-800 border-zinc-700 h-11" required />
                            </div>
                            <div className="space-y-2">
                                <Label>Early Bird Price</Label>
                                <Input value={formData.earlyBird} onChange={e => setFormData({ ...formData, earlyBird: e.target.value })} className="bg-zinc-800 border-zinc-700 h-11" placeholder="e.g. 25K EGP" />
                            </div>
                            <div className="space-y-2">
                                <Label>Standard Price</Label>
                                <Input value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="bg-zinc-800 border-zinc-700 h-11" placeholder="e.g. 28K EGP" />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label>Route (Quick Summary)</Label>
                                <Textarea value={formData.route} onChange={e => setFormData({ ...formData, route: e.target.value })} className="bg-zinc-800 border-zinc-700" rows={2} />
                            </div>
                        </div>
                        <DialogFooter className="pt-4 border-t border-zinc-800">
                            <Button type="submit" disabled={submitting} className="bg-primary text-brand-navy font-bold w-full h-12">
                                {submitting ? <Loader2 className="animate-spin" /> : (selectedSafari ? "Save Expedition" : "Publish Expedition")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
