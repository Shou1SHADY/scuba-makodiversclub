"use client";

import React, { useEffect, useState } from 'react';
import { Star, MessageCircle, Facebook, Heart, CheckCircle2, ShieldCheck, Quote, X } from 'lucide-react';
import { getFacebookReviews, Review } from '@/lib/api/reviews';
import WaveSeparator from '@/components/ui/wave-separator';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({ name: '', content: '', rating: 5 });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function loadReviews() {
            try {
                // Fetch reviews and sort by date descending (newest first)
                const data = await getFacebookReviews();
                const sorted = [...data].sort((a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setReviews(sorted);
            } catch (error) {
                console.error("Failed to load reviews:", error);
            } finally {
                setLoading(false);
            }
        }
        loadReviews();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate API delay
        setTimeout(() => {
            const reviewToAdd: Review = {
                id: `local_${Date.now()}`,
                name: newReview.name,
                content: newReview.content,
                rating: newReview.rating,
                date: new Date().toISOString(),
                verified: true
            };

            // Add to list and sort again to ensure it appears at the top
            setReviews(prev => {
                const updated = [reviewToAdd, ...prev];
                return updated.sort((a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
            });

            setNewReview({ name: '', content: '', rating: 5 });
            setShowForm(false);
            setSubmitting(false);
        }, 800);
    };

    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Page Header Section */}
            <div className="relative pt-40 pb-24 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-brand-navy/50 to-brand-navy z-0" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container-width px-6 relative z-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
                        <Heart size={14} className="text-primary fill-primary" />
                        <span className="text-primary uppercase tracking-[0.2em] text-[10px] font-bold">Community Stories</span>
                    </div>
                    <h1 className="text-white mb-6 text-5xl md:text-7xl font-display font-medium tracking-tight animate-fade-in-up">
                        Voices of the <span className="text-primary">Deep</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Discover why divers from across the globe choose Mako Divers Club for their Red Sea explorations.
                    </p>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="container-width px-6 -mt-12 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl">
                    <div className="text-center space-y-2 border-r border-white/5">
                        <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <p className="text-white text-3xl font-display font-bold">5.0</p>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Average Rating</p>
                    </div>
                    <div className="text-center space-y-2 border-r border-white/5">
                        <Facebook size={20} className="text-primary mx-auto mb-1" />
                        <p className="text-white text-3xl font-display font-bold">150+</p>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">FB Reviews</p>
                    </div>
                    <div className="text-center space-y-2 border-r border-white/5">
                        <ShieldCheck size={20} className="text-primary mx-auto mb-1" />
                        <p className="text-white text-3xl font-display font-bold">100%</p>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Safety Record</p>
                    </div>
                    <div className="text-center space-y-2">
                        <CheckCircle2 size={20} className="text-primary mx-auto mb-1" />
                        <p className="text-white text-3xl font-display font-bold">4.5k</p>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Members</p>
                    </div>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="container-width px-6 py-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="glass-card h-[300px] rounded-[2rem] animate-pulse border border-white/5" />
                        ))
                    ) : (
                        reviews.map((review, i) => (
                            <div
                                key={review.id}
                                className="group relative glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all duration-500 flex flex-col shadow-xl hover:-translate-y-2"
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <Quote className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors" size={40} />

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display font-bold text-xl group-hover:scale-110 transition-transform">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg leading-tight group-hover:text-primary transition-colors">{review.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex gap-0.5">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} size={10} fill="currentColor" className="text-primary" />
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Verified Diver</span>
                                        </div>
                                    </div>
                                </div>

                                <blockquote className="flex-grow mb-8">
                                    <p className="text-gray-300 text-lg leading-relaxed font-light italic">
                                        "{review.content}"
                                    </p>
                                </blockquote>

                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-gray-500 text-[11px] font-medium tracking-wider uppercase text-right w-full">
                                        {new Date(review.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Call to Action & Submission Form */}
                <div className="mt-20 text-center">
                    {!showForm ? (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="relative inline-block group">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <a
                                    href="https://www.facebook.com/MAKODIVERSCLUB/reviews/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative z-10 inline-flex items-center gap-4 bg-primary text-brand-navy py-6 px-14 rounded-2xl font-display font-black uppercase text-sm tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl"
                                >
                                    <Facebook size={20} fill="currentColor" />
                                    Review on Facebook
                                </a>
                            </div>
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-4 bg-white/5 border border-white/10 text-white py-6 px-14 rounded-2xl font-display font-black uppercase text-sm tracking-[0.2em] hover:bg-white/20 transition-all duration-300"
                            >
                                <MessageCircle size={20} />
                                Quick Review
                            </button>
                        </div>
                    ) : (
                        <div className="max-w-2xl mx-auto glass-card p-10 rounded-[2.5rem] border border-primary/20 text-left animate-fade-in-up">
                            <h3 className="text-white text-2xl font-display font-bold mb-6 flex justify-between items-center">
                                Share Your Experience
                                <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                        value={newReview.name}
                                        onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                                className={`transition-colors ${newReview.rating >= star ? 'text-primary' : 'text-gray-600'}`}
                                            >
                                                <Star size={24} fill={newReview.rating >= star ? 'currentColor' : 'none'} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Your Story</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                                        value={newReview.content}
                                        onChange={e => setNewReview({ ...newReview, content: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 bg-primary text-brand-navy font-black uppercase text-sm py-4 rounded-xl hover:scale-[1.02] disabled:opacity-50 transition-all"
                                    >
                                        {submitting ? 'Sharing...' : 'Post Review'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-8 py-4 text-gray-400 hover:text-white transition-colors uppercase text-sm font-bold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <p className="mt-8 text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
                        Already dived with us? Share your experience and help our community grow. We read every single review!
                    </p>
                </div>
            </div>

            {/* Wave Separator before Footer */}
            <div className="relative mt-20">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
}
