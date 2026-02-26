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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white font-display">Special Offers</h1>
                    <p className="text-zinc-400 mt-1">Manage promotions and discounts for your divers.</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-blue-600 hover:bg-blue-500 gap-2 w-full md:w-auto font-bold uppercase tracking-widest text-[11px] h-11"
                >
                    <Plus className="w-4 h-4" />
                    Add New Offer
                </Button>
            </div>

            <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
                <CardHeader className="border-b border-zinc-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <Input
                                placeholder="Search offers..."
                                className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-zinc-800 hover:bg-transparent">
                                <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Offer Details</TableHead>
                                <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] text-center">Discount</TableHead>
                                <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] text-center">Status</TableHead>
                                <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-20">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                                        <p className="text-zinc-500 text-sm">Loading offers from Supabase...</p>
                                    </TableCell>
                                </TableRow>
                            ) : filteredOffers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-20">
                                        <div className="flex flex-col items-center gap-2">
                                            <Tag className="w-10 h-10 text-zinc-700 mb-2" />
                                            <p className="text-zinc-100 font-semibold">No offers found</p>
                                            <p className="text-zinc-500 text-xs text-center max-w-[200px]">Try adjusting your search or add a new offer to get started.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredOffers.map((offer) => (
                                    <TableRow key={offer.id} className="border-zinc-800 hover:bg-white/5 transition-colors">
                                        <TableCell className="py-5">
                                            <div className="flex items-start gap-4">
                                                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 mt-1">
                                                    <Tag className="w-5 h-5 text-blue-500" />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="font-bold text-white text-base">{offer.title}</div>
                                                    <div className="text-sm text-zinc-400 max-w-sm line-clamp-1">{offer.description}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="font-black text-emerald-400 text-lg">{offer.discount}</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={cn(
                                                "font-bold uppercase tracking-widest text-[9px] px-3 py-1 border",
                                                offer.status === 'active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                    offer.status === 'scheduled' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                                        "bg-zinc-800 text-zinc-500 border-zinc-700"
                                            )}>
                                                {offer.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white hover:bg-zinc-800">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-100 min-w-[160px] p-2">
                                                    <DropdownMenuItem
                                                        onClick={() => handleOpenDialog(offer)}
                                                        className="gap-3 py-3 font-medium cursor-pointer rounded-lg hover:bg-zinc-800 focus:bg-zinc-800"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-zinc-400" /> Edit Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-3 py-3 font-medium cursor-pointer rounded-lg hover:bg-zinc-800 focus:bg-zinc-800">
                                                        <ExternalLink className="w-4 h-4 text-zinc-400" /> View on Site
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => { setSelectedOffer(offer); setIsDeleteDialogOpen(true); }}
                                                        className="gap-3 py-3 font-medium cursor-pointer rounded-lg hover:bg-red-500/10 text-red-400 focus:text-red-400 focus:bg-red-500/10"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete Offer
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
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                    <DialogHeader className="space-y-3">
                        <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                            {selectedOffer ? <Edit2 className="w-6 h-6 text-blue-500" /> : <Plus className="w-6 h-6 text-blue-500" />}
                            {selectedOffer ? "Edit Offer" : "Create New Offer"}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 text-base">
                            Fill in the details below to publish this promotion on the website.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <Label htmlFor="title" className="text-sm font-bold uppercase tracking-widest text-zinc-400">Offer Title</Label>
                                <Input
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-zinc-800 border-zinc-700 h-12 focus:border-blue-500"
                                    placeholder="e.g. Summer Diving Special"
                                />
                            </div>
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <Label htmlFor="discount" className="text-sm font-bold uppercase tracking-widest text-zinc-400">Discount Value</Label>
                                <Input
                                    id="discount"
                                    required
                                    value={formData.discount}
                                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                    className="bg-zinc-800 border-zinc-700 h-12 focus:border-blue-500"
                                    placeholder="e.g. 20% OFF or $50 Credit"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="description" className="text-sm font-bold uppercase tracking-widest text-zinc-400">Short Description</Label>
                                <Textarea
                                    id="description"
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="bg-zinc-800 border-zinc-700 min-h-[100px] focus:border-blue-500"
                                    placeholder="Briefly describe the offer..."
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label className="text-sm font-bold uppercase tracking-widest text-zinc-400">Offer Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                                >
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700 h-12">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                        <SelectItem value="active" className="py-2 cursor-pointer">Active</SelectItem>
                                        <SelectItem value="scheduled" className="py-2 cursor-pointer">Scheduled</SelectItem>
                                        <SelectItem value="expired" className="py-2 cursor-pointer text-zinc-500">Expired</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter className="pt-4 gap-3">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-zinc-400 hover:text-white">
                                Cancel
                            </Button>
                            <Button type="submit" disabled={submitting} className="bg-blue-600 hover:bg-blue-500 px-10 h-12 font-bold uppercase tracking-[0.2em] text-[11px]">
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                {selectedOffer ? "Update Offer" : "Publish Offer"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-red-500">
                            <AlertCircle className="w-6 h-6" />
                            Delete Offer?
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 py-4">
                            Are you sure you want to delete <span className="text-white font-bold">{selectedOffer?.title}</span>? This action cannot be undone and will remove it from the website immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="text-zinc-400 hover:text-white">
                            Keep it
                        </Button>
                        <Button onClick={handleDelete} disabled={submitting} className="bg-red-600 hover:bg-red-500 font-bold uppercase tracking-widest text-[11px]">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Confirm Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
