"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export function FacebookSyncModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [loading, setLoading] = useState(false);
    const [reviewBody, setReviewBody] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [rating, setRating] = useState("5");
    const supabase = createClient();

    const handleSync = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('reviews')
                .insert([{
                    name: authorName,
                    content: reviewBody,
                    rating: parseInt(rating),
                    date: new Date().toISOString().split('T')[0],
                    verified: true
                }]);

            if (error) throw error;

            toast.success("Review imported from Facebook!");
            setReviewBody("");
            setAuthorName("");
            onOpenChange(false);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Facebook className="w-5 h-5 text-[#1877F2]" />
                        Import Facebook Review
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Paste the content of a review from your Facebook page here to display it on the website.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSync} className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="fb-author">Reviewer Name</Label>
                        <Input
                            id="fb-author"
                            placeholder="e.g. Mahmoud Shebl"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            required
                            className="bg-zinc-800 border-zinc-700"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fb-content">Review Content</Label>
                        <Textarea
                            id="fb-content"
                            placeholder="Copy-paste the review text here..."
                            value={reviewBody}
                            onChange={(e) => setReviewBody(e.target.value)}
                            required
                            className="bg-zinc-800 border-zinc-700 min-h-[120px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="fb-rating">Rating (1-5)</Label>
                        <Input
                            id="fb-rating"
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 w-24"
                        />
                    </div>
                    <DialogFooter className="pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1877F2] hover:bg-[#1665cf] text-white"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            Sync to Website
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
