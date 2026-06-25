"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, User, ArrowRight, Newspaper, Loader2, ChevronLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import WaveSeparator from '@/components/ui/wave-separator';

interface BlogSection {
    title: string;
    description: string;
    image_url: string;
}

interface Post {
    id: string;
    title: string;
    content: string;
    sections: BlogSection[];
    author: string;
    published_at: string;
}

export default function UpdateDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchPost() {
            try {
                const { data, error } = await supabase
                    .from('updates')
                    .select('*')
                    .eq('id', id)
                    .eq('status', 'published')
                    .single();

                if (error) throw error;
                setPost({
                    ...data,
                    sections: data.sections || [],
                } as Post);
            } catch (e) {
                console.error("Error fetching post:", e);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-brand-navy min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="bg-brand-navy min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-2">
                    <Newspaper className="w-10 h-10 text-gray-700" />
                </div>
                <h1 className="text-white text-2xl font-display font-black uppercase tracking-widest">Post Not Found</h1>
                <p className="text-gray-500 text-sm">This article doesn't exist or hasn't been published yet.</p>
                <a href="/updates" className="inline-flex items-center gap-2 bg-primary text-brand-navy font-bold uppercase text-xs tracking-widest py-4 px-8 rounded-xl hover:bg-white transition-all">
                    Back to Updates <ArrowRight size={16} />
                </a>
            </div>
        );
    }

    const hasSections = post.sections && post.sections.length > 0;

    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Page Header */}
            <div className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-brand-navy z-0" />
                <div className="container-width px-4 md:px-6 relative z-10 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <a href="/updates" className="text-gray-400 hover:text-primary transition-colors text-xs md:text-sm flex items-center gap-1">
                            <ChevronLeft size={16} /> Back to Updates
                        </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                            <Calendar size={12} />
                            {post.published_at
                                ? new Date(post.published_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
                                : ''}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <User size={12} />
                            {post.author}
                        </div>
                    </div>

                    <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-display font-medium leading-tight">
                        {post.title}
                    </h1>
                </div>
            </div>

            {/* Blog Content */}
            <div className="container-width px-4 md:px-6 pb-24 relative z-10 max-w-5xl mx-auto space-y-16 md:space-y-24">

                {/* Legacy single content fallback */}
                {!hasSections && post.content && (
                    <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/5">
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">{post.content}</p>
                    </div>
                )}

                {/* Multi-section blog layout */}
                {hasSections && post.sections.map((section, idx) => {
                    const imageLeft = idx % 2 === 0;
                    const hasImage = section.image_url && section.image_url.trim() !== '';

                    return (
                        <div key={idx} className="glass-card rounded-[2rem] border border-white/5 overflow-hidden">
                            <div className={`flex flex-col ${hasImage ? (imageLeft ? 'md:flex-row' : 'md:flex-row-reverse') : ''}`}>

                                {/* Image */}
                                {hasImage && (
                                    <div className="md:w-2/5 flex-shrink-0">
                                        <div className="relative h-64 md:h-full min-h-[260px]">
                                            <img
                                                src={section.image_url}
                                                alt={section.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-r ${imageLeft ? 'from-transparent to-[#020408]/60' : 'from-[#020408]/60 to-transparent'} md:block hidden`} />
                                        </div>
                                    </div>
                                )}

                                {/* Content */}
                                <div className={`flex-1 p-6 md:p-10 flex flex-col justify-center ${hasImage ? '' : 'w-full'}`}>
                                    {section.title && (
                                        <h2 className="text-white text-xl md:text-3xl font-display font-medium mb-4 leading-snug">
                                            {section.title}
                                        </h2>
                                    )}
                                    {section.description && (
                                        <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                            {section.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer CTA */}
            <div className="container-width px-4 md:px-6 pb-24 relative z-10 max-w-5xl mx-auto">
                <div className="text-center">
                    <a
                        href="/updates"
                        className="inline-flex items-center gap-3 text-primary hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        <ChevronLeft size={16} /> All Updates
                    </a>
                </div>
            </div>

            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
}
