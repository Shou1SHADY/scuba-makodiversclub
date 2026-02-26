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
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white font-display">Updates & News</h1>
                    <p className="text-zinc-400 mt-1">Keep your community informed with latest diving news.</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-blue-600 hover:bg-blue-500 gap-2 w-full md:w-auto font-bold uppercase tracking-widest text-[11px] h-11"
                >
                    <Plus className="w-4 h-4" />
                    Create Update
                </Button>
            </div>

            <Card className="bg-zinc-900 border-zinc-800 shadow-2xl">
                <CardHeader className="border-b border-zinc-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <Input
                                placeholder="Search updates..."
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
                                <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Title</TableHead>
                                <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Author</TableHead>
                                <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] text-center">Status</TableHead>
                                <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] text-center">Published</TableHead>
                                <TableHead className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                                        <p className="text-zinc-500 text-sm">Syncing with Red Sea data...</p>
                                    </TableCell>
                                </TableRow>
                            ) : filteredPosts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-20">
                                        <div className="flex flex-col items-center gap-2">
                                            <Newspaper className="w-10 h-10 text-zinc-700 mb-2" />
                                            <p className="text-zinc-100 font-semibold">No updates yet</p>
                                            <p className="text-zinc-500 text-xs text-center max-w-[200px]">Start writing news about diving trips or new equipment.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPosts.map((post) => (
                                    <TableRow key={post.id} className="border-zinc-800 hover:bg-white/5 transition-colors">
                                        <TableCell className="py-5">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-4 h-4 text-zinc-500" />
                                                <span className="font-bold text-zinc-100">{post.title}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-zinc-400 font-medium">{post.author}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge className={cn(
                                                "font-bold uppercase tracking-widest text-[9px] px-3 py-1 border",
                                                post.status === 'published' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                                    "bg-zinc-800 text-zinc-500 border-zinc-700"
                                            )}>
                                                {post.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center text-zinc-500 text-xs">
                                            <div className="flex items-center justify-center gap-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white hover:bg-zinc-800">
                                                            <MoreVertical className="w-5 h-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-100 min-w-[160px] p-2 shadow-2xl">
                                                        <DropdownMenuItem
                                                            onClick={() => handleOpenDialog(post)}
                                                            className="gap-3 py-3 font-medium cursor-pointer rounded-lg hover:bg-zinc-800 focus:bg-zinc-800"
                                                        >
                                                            <Edit2 className="w-4 h-4 text-zinc-400" /> Quick Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => { setSelectedPost(post); setIsDeleteDialogOpen(true); }}
                                                            className="gap-3 py-3 font-medium cursor-pointer rounded-lg hover:bg-red-500/10 text-red-400 focus:text-red-400 focus:bg-red-500/10"
                                                        >
                                                            <Trash2 className="w-4 h-4" /> Move to Trash
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
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl">
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                            <Newspaper className="w-6 h-6 text-blue-500" />
                            {selectedPost ? "Edit Update" : "Create New Update"}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Share the latest news with the Mako community.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <Label htmlFor="post-title" className="text-sm font-bold uppercase tracking-widest text-zinc-400">Title</Label>
                                <Input
                                    id="post-title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-zinc-800 border-zinc-700 h-12 focus:border-blue-500"
                                    placeholder="Headline of the update"
                                />
                            </div>
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <Label htmlFor="author" className="text-sm font-bold uppercase tracking-widest text-zinc-400">Author</Label>
                                <Input
                                    id="author"
                                    required
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="bg-zinc-800 border-zinc-700 h-12 focus:border-blue-500"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="content" className="text-sm font-bold uppercase tracking-widest text-zinc-400">Content</Label>
                                <Textarea
                                    id="content"
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="bg-zinc-800 border-zinc-700 min-h-[200px] focus:border-blue-500 leading-relaxed py-4"
                                    placeholder="Describe what's happening..."
                                />
                            </div>
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <Label className="text-sm font-bold uppercase tracking-widest text-zinc-400">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val: any) => setFormData({ ...formData, status: val })}
                                >
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700 h-12">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                        <SelectItem value="published" className="py-2 cursor-pointer">Published</SelectItem>
                                        <SelectItem value="draft" className="py-2 cursor-pointer">Draft Only</SelectItem>
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
                                {selectedPost ? "Update News" : "Share Update"}
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
                            Remove Update?
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400 py-4">
                            Are you sure you want to delete <span className="text-white font-bold">{selectedPost?.title}</span>? This will hide it from the site immediately.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button variant="ghost" onClick={() => setIsDeleteDialogOpen(false)} className="text-zinc-400 hover:text-white">
                            Go Back
                        </Button>
                        <Button onClick={handleDelete} disabled={submitting} className="bg-red-600 hover:bg-red-500 font-bold uppercase tracking-widest text-[11px]">
                            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Final Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
