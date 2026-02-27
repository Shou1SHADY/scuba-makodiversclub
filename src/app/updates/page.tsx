"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Calendar, User, ArrowRight, Newspaper, Loader2, ChevronRight } from 'lucide-react';
import WaveSeparator from '@/components/ui/wave-separator';

interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    published_at: string;
}

export default function UpdatesPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const { data, error } = await supabase
                    .from('updates')
                    .select('*')
                    .eq('status', 'published')
                    .order('published_at', { ascending: false });

                if (error) throw error;
                setPosts(data || []);
            } catch (e) {
                console.error("Error fetching updates:", e);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Page Header */}
            <div className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://img1.wsimg.com/isteam/getty/156323241/:/rs=w:2400,h:1200,cg:true"
                        alt="Diving Background"
                        fill
                        className="object-cover opacity-10"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/80 to-brand-navy" />
                </div>

                <div className="container-width px-6 relative z-10 text-center max-w-3xl mx-auto">
                    <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block animate-fade-in">Mako Community News</span>
                    <h1 className="text-white mb-6 text-3xl md:text-5xl lg:text-6xl font-display font-medium">
                        Latest <span className="text-primary italic">Updates</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Stay informed about our upcoming expeditions, new equipment, and diving highlights from the Red Sea.
                    </p>
                </div>
            </div>

            <div className="container-width px-4 md:px-6 pb-16 md:pb-24 relative z-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Syncing with Red Sea data...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-24 glass-card rounded-[3rem] border border-white/5 max-w-2xl mx-auto">
                        <Newspaper size={64} className="text-white/10 mx-auto mb-6" />
                        <h3 className="text-white text-2xl font-display font-bold mb-2">No updates yet</h3>
                        <p className="text-gray-500">Check back soon for news and trip reports!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="group glass-card rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-primary/30 transition-all duration-500 flex flex-col h-full"
                            >
                                <div className="p-6 md:p-8 lg:p-10 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                                            <Calendar size={12} />
                                            {new Date(post.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-4 flex-grow italic">
                                        {post.content}
                                    </p>

                                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary border border-white/10">
                                                <User size={14} />
                                            </div>
                                            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{post.author}</span>
                                        </div>
                                        <button className="text-primary group/link flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                                            Read More
                                            <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
}
