"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    ExternalLink,
    Tag,
    Loader2,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Offer {
    id: string;
    title: string;
    description: string;
    discount: string;
    status: 'active' | 'scheduled' | 'expired';
    created_at: string;
}

export default function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const supabase = createClient();

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        discount: "",
        status: "active" as Offer['status']
    });

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('offers')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOffers(data || []);
        } catch (error: any) {
            console.error("Fetch error:", error);
            toast.error("Failed to load offers. Did you run the SQL migration?");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (offer?: Offer) => {
        if (offer) {
            setSelectedOffer(offer);
            setFormData({
                title: offer.title,
                description: offer.description,
                discount: offer.discount,
                status: offer.status
            });
        } else {
            setSelectedOffer(null);
            setFormData({
                title: "",
                description: "",
                discount: "",
                status: "active"
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (selectedOffer) {
                const { error } = await supabase
                    .from('offers')
                    .update(formData)
                    .eq('id', selectedOffer.id);
                if (error) throw error;
                toast.success("Offer updated successfully");
            } else {
                const { error } = await supabase
                    .from('offers')
                    .insert([formData]);
                if (error) throw error;
                toast.success("Offer created successfully");
            }
            setIsDialogOpen(false);
            fetchOffers();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedOffer) return;
        setSubmitting(true);
        try {
            const { error } = await supabase
                .from('offers')
                .delete()
                .eq('id', selectedOffer.id);
            if (error) throw error;
            toast.success("Offer deleted");
            setIsDeleteDialogOpen(false);
            fetchOffers();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredOffers = offers.filter(offer =>
        offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-display font-black text-white tracking-tight leading-none uppercase">
                        SPECIAL <span className="text-primary italic">OFFERS</span>
                    </h1>
                    <p className="text-gray-400 font-body text-base max-w-lg">
                        Manage promotions and discounts for your divers. Active offers appear on the homepage.
                    </p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-primary hover:bg-white text-brand-navy gap-3 h-14 px-8 rounded-2xl shadow-xl shadow-primary/10 transition-all font-display font-black uppercase text-[10px] tracking-[0.2em] w-full md:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    Create New Offer
                </Button>
            </div>

            <Card className="bg-[#020408]/40 border-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
                <CardHeader className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center gap-6 bg-black/20">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <Input
                            placeholder="Filter offers by title or description..."
                            className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-2xl focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-gray-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 hover:bg-transparent h-16">
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] pl-8">Offer Details</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] text-center">Discount Factor</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] text-center">Current Status</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] text-right pr-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-32">
                                        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6 opacity-50" />
                                        <p className="text-gray-500 font-display text-xs uppercase tracking-[0.3em]">Synching with Database...</p>
                                    </TableCell>
                                </TableRow>
                            ) : filteredOffers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-32">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-2">
                                                <Tag className="w-10 h-10 text-gray-700" />
                                            </div>
                                            <p className="text-white font-display font-black text-xl uppercase tracking-widest">No Targets Identified</p>
                                            <p className="text-gray-500 text-xs uppercase tracking-widest max-w-[240px] leading-relaxed">Adjust your search parameters or initiate a new offer creation.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredOffers.map((offer) => (
                                    <TableRow key={offer.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="py-8 pl-8">
                                            <div className="flex items-start gap-6">
                                                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 group-hover:bg-primary/10 transition-all">
                                                    <Tag className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="font-display font-black text-white text-lg tracking-wide uppercase">{offer.title}</div>
                                                    <div className="text-sm font-body text-gray-500 max-w-md line-clamp-1">{offer.description}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="font-display font-black text-primary text-2xl italic tracking-tighter">{offer.discount}</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={cn(
                                                "font-black uppercase tracking-[0.2em] text-[9px] px-4 py-1.5 border-2 rounded-full",
                                                offer.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                    offer.status === 'scheduled' ? "bg-primary/10 text-primary border-primary/20" :
                                                        "bg-white/5 text-gray-500 border-white/10"
                                            )}>
                                                {offer.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-gray-500 hover:text-white hover:bg-white/5">
                                                        <MoreVertical className="w-6 h-6" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-[#0D2451] border-white/5 text-white min-w-[200px] p-3 rounded-2xl shadow-2xl backdrop-blur-3xl">
                                                    <DropdownMenuItem
                                                        onClick={() => handleOpenDialog(offer)}
                                                        className="gap-4 py-4 px-4 font-display text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-primary" /> Edit Offer
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => { setSelectedOffer(offer); setIsDeleteDialogOpen(true); }}
                                                        className="gap-4 py-4 px-4 font-display text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer rounded-xl hover:bg-red-500/10 text-red-400 focus:text-red-400 focus:bg-red-500/10 transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Decommission
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-brand-navy border-white/5 text-white max-w-2xl rounded-[3rem] p-0 overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] border border-white/10">
                    <div className="bg-black/40 p-10 border-b border-white/5">
                        <DialogHeader className="space-y-4">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
                                {selectedOffer ? <Edit2 className="w-7 h-7 text-primary" /> : <Plus className="w-7 h-7 text-primary" />}
                            </div>
                            <DialogTitle className="text-3xl font-display font-black uppercase tracking-tighter">
                                {selectedOffer ? "EDIT" : "CREATE NEW"} <span className="text-primary italic">OFFER</span>
                            </DialogTitle>
                            <DialogDescription className="text-gray-400 text-base font-light font-body">
                                Configure the promotion parameters below. Changes take effect across all distribution channels immediately.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-3 col-span-2 md:col-span-1">
                                <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Mission Title</Label>
                                <Input
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                    placeholder="e.g. SUMMER EXPEDITION"
                                />
                            </div>
                            <div className="space-y-3 col-span-2 md:col-span-1">
                                <Label htmlFor="discount" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Discount Magnitude</Label>
                                <Input
                                    id="discount"
                                    required
                                    value={formData.discount}
                                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                    className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                    placeholder="e.g. 25% OFF"
                                />
                            </div>
                            <div className="space-y-3 col-span-2">
                                <Label htmlFor="description" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Intelligence Summary</Label>
                                <Textarea
                                    id="description"
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="min-h-[120px] bg-white/5 border-white/10 rounded-2xl p-6 focus:border-primary/50 text-white placeholder:text-white/20 resize-none"
                                    placeholder="Provide a compelling description of the offer..."
                                />
                            </div>
                            <div className="space-y-3 col-span-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Current State</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                                >
                                    <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-0 focus:border-primary/50">
                                        <SelectValue placeholder="Select Deployment Status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-brand-navy border-white/10 text-white rounded-2xl">
                                        <SelectItem value="active" className="py-4 cursor-pointer focus:bg-white/5 rounded-xl">ACTIVE DEPLOYMENT</SelectItem>
                                        <SelectItem value="scheduled" className="py-4 cursor-pointer focus:bg-white/5 rounded-xl">STAGING / SCHEDULED</SelectItem>
                                        <SelectItem value="expired" className="py-4 cursor-pointer focus:bg-white/5 rounded-xl text-gray-500 italic">ARCHIVED / EXPIRED</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter className="pt-6 gap-4">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="h-14 px-8 rounded-2xl text-gray-500 hover:text-white font-display text-[10px] font-black uppercase tracking-widest">
                                Abort
                            </Button>
                            <Button type="submit" disabled={submitting} className="h-14 px-12 rounded-2xl bg-primary hover:bg-white text-brand-navy font-display font-black uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-primary/20 transition-all">
                                {submitting ? <Loader2 className="w-5 h-5 animate-spin mr-3" /> : null}
                                {selectedOffer ? "Confirm Modification" : "Publish to Grid"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="bg-brand-navy border-white/5 text-white max-w-md rounded-[2.5rem] p-10 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] border border-white/10">
                    <DialogHeader className="space-y-6">
                        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <DialogTitle className="text-2xl font-display font-black uppercase tracking-tighter">
                            CONFIRM <span className="text-red-500 italic">PURGE</span>
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-base leading-relaxed">
                            Are you certain you want to decommission <span className="text-white font-bold uppercase">{selectedOffer?.title}</span>? This operation is irreversible and will purge all related data.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-10 gap-4 flex-col sm:flex-row">
                        <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="h-14 flex-1 rounded-2xl text-gray-500 hover:text-white font-display text-[10px] font-black uppercase tracking-widest">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} disabled={submitting} className="h-14 flex-1 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-display font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-red-500/20">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Confirm Purge
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
