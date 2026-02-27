"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Calendar,
    Newspaper,
    Eye,
    Loader2,
    AlertCircle,
    FileText
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

interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    status: 'published' | 'draft';
    published_at: string | null;
    created_at: string;
}

export default function UpdatesPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const supabase = createClient();

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        author: "",
        status: "draft" as Post['status']
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('updates')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error: any) {
            console.error("Fetch error:", error);
            toast.error("Failed to load updates. Did you run the SQL migration?");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (post?: Post) => {
        if (post) {
            setSelectedPost(post);
            setFormData({
                title: post.title,
                content: post.content,
                author: post.author,
                status: post.status
            });
        } else {
            setSelectedPost(null);
            setFormData({
                title: "",
                content: "",
                author: "Mako Team",
                status: "draft"
            });
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const dbData = {
                ...formData,
                published_at: formData.status === 'published' ? new Date().toISOString() : null
            };

            if (selectedPost) {
                const { error } = await supabase
                    .from('updates')
                    .update(dbData)
                    .eq('id', selectedPost.id);
                if (error) throw error;
                toast.success("Update improved successfully");
            } else {
                const { error } = await supabase
                    .from('updates')
                    .insert([dbData]);
                if (error) throw error;
                toast.success("New update published");
            }
            setIsDialogOpen(false);
            fetchPosts();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedPost) return;
        setSubmitting(true);
        try {
            const { error } = await supabase
                .from('updates')
                .delete()
                .eq('id', selectedPost.id);
            if (error) throw error;
            toast.success("Post deleted");
            setIsDeleteDialogOpen(false);
            fetchPosts();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-display font-black text-white tracking-tight leading-none uppercase">
                        INTELLIGENCE <span className="text-primary italic">FEED</span>
                    </h1>
                    <p className="text-gray-400 font-body text-base max-w-lg">
                        Broadcast latest news, safety updates, and community highlights to the Mako network.
                    </p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-primary hover:bg-white text-brand-navy gap-3 h-14 px-8 rounded-2xl shadow-xl shadow-primary/10 transition-all font-display font-black uppercase text-[10px] tracking-[0.2em] w-full md:w-auto"
                >
                    <Plus className="w-5 h-5" />
                    Broadcast Update
                </Button>
            </div>

            <Card className="bg-[#020408]/40 border-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/5">
                <CardHeader className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center gap-6 bg-black/20">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <Input
                            placeholder="Filter transmissions by title..."
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
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] pl-8">Transmission Title</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px]">Origin</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] text-center">Status</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] text-center">Timestamp</TableHead>
                                <TableHead className="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] text-right pr-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-32">
                                        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6 opacity-50" />
                                        <p className="text-gray-500 font-display text-xs uppercase tracking-[0.3em]">Decoding Signal...</p>
                                    </TableCell>
                                </TableRow>
                            ) : filteredPosts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-32">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-2">
                                                <Newspaper className="w-10 h-10 text-gray-700" />
                                            </div>
                                            <p className="text-white font-display font-black text-xl uppercase tracking-widest">Silence on Frequencies</p>
                                            <p className="text-gray-500 text-xs uppercase tracking-widest max-w-[240px] leading-relaxed">No updates have been transmitted yet. Initiate a broadcast to inform the community.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPosts.map((post) => (
                                    <TableRow key={post.id} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <TableCell className="py-8 pl-8">
                                            <div className="flex items-center gap-4">
                                                <FileText className="w-4 h-4 text-primary opacity-50" />
                                                <span className="font-display font-black text-white text-base tracking-wide uppercase">{post.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-400 font-bold text-xs uppercase tracking-widest">{post.author}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={cn(
                                                "font-black uppercase tracking-[0.2em] text-[9px] px-4 py-1.5 border-2 rounded-full",
                                                post.status === 'published' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                    "bg-white/5 text-gray-500 border-white/10"
                                            )}>
                                                {post.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] font-black tracking-widest uppercase">
                                                <Calendar className="w-3.5 h-3.5 text-primary/40" />
                                                {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'PENDING'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-xl">
                                                    <Eye className="w-5 h-5" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl">
                                                            <MoreVertical className="w-5 h-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-[#0D2451] border-white/5 text-white min-w-[200px] p-3 rounded-2xl shadow-2xl backdrop-blur-3xl">
                                                        <DropdownMenuItem
                                                            onClick={() => handleOpenDialog(post)}
                                                            className="gap-4 py-4 px-4 font-display text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer rounded-xl hover:bg-white/5 focus:bg-white/5 transition-all"
                                                        >
                                                            <Edit2 className="w-4 h-4 text-primary" /> Edit Broadcast
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => { setSelectedPost(post); setIsDeleteDialogOpen(true); }}
                                                            className="gap-4 py-4 px-4 font-display text-[10px] font-black uppercase tracking-[0.2em] cursor-pointer rounded-xl hover:bg-red-500/10 text-red-400 focus:text-red-400 focus:bg-red-500/10 transition-all"
                                                        >
                                                            <Trash2 className="w-4 h-4" /> Terminate Signal
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
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
                <DialogContent className="bg-brand-navy border-white/5 text-white max-w-3xl rounded-[3rem] p-0 overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] border border-white/10">
                    <div className="bg-black/40 p-10 border-b border-white/5">
                        <DialogHeader className="space-y-4">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-2">
                                <Newspaper className="w-7 h-7 text-primary" />
                            </div>
                            <DialogTitle className="text-3xl font-display font-black uppercase tracking-tighter">
                                {selectedPost ? "EQUIP" : "COMPOSE"} <span className="text-primary italic">TRANSMISSION</span>
                            </DialogTitle>
                            <DialogDescription className="text-gray-400 text-base font-light font-body">
                                Draft your message. Published updates are instantly distributed to the homepage news feed.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10 space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-3 col-span-2 md:col-span-1">
                                <Label htmlFor="post-title" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Headline</Label>
                                <Input
                                    id="post-title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                    placeholder="Enter transmission subject..."
                                />
                            </div>
                            <div className="space-y-3 col-span-2 md:col-span-1">
                                <Label htmlFor="author" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Operator Signature</Label>
                                <Input
                                    id="author"
                                    required
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                                />
                            </div>
                            <div className="space-y-3 col-span-2">
                                <Label htmlFor="content" className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Payload Content</Label>
                                <Textarea
                                    id="content"
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="min-h-[200px] bg-white/5 border-white/10 rounded-2xl p-6 focus:border-primary/50 text-white placeholder:text-white/20 leading-relaxed resize-none"
                                    placeholder="Input signal data..."
                                />
                            </div>
                            <div className="space-y-3 col-span-2 md:col-span-1">
                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 ml-1">Deployment Level</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                                >
                                    <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-0 focus:border-primary/50">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-brand-navy border-white/10 text-white rounded-2xl">
                                        <SelectItem value="published" className="py-4 cursor-pointer focus:bg-white/5 rounded-xl">PUBLIC BROADCAST</SelectItem>
                                        <SelectItem value="draft" className="py-4 cursor-pointer focus:bg-white/5 rounded-xl">LOCAL DRAFT</SelectItem>
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
                                {selectedPost ? "Update Transmission" : "Launch Broadcast"}
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
                            Are you certain you want to terminate signal <span className="text-white font-bold uppercase">{selectedPost?.title}</span>? This action will purge the transmission from the public grid.
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
