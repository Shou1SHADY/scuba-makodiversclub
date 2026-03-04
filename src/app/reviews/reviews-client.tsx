"use client";

import React, { useState } from 'react';
import { Star, MessageCircle, Facebook, Quote, X } from 'lucide-react';
import { Review } from '@/lib/api/reviews';

export default function ReviewsClient({ initialReviews, facebookUrl }: { initialReviews: Review[], facebookUrl: string }) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);
    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({ name: '', content: '', rating: 5 });
    const [submitting, setSubmitting] = useState(false);

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
        <>
            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {reviews.map((review, i) => (
                    <div
                        key={review.id}
                        className="group relative glass-card p-6 md:p-10 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all duration-500 flex flex-col shadow-xl hover:-translate-y-2"
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

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between overflow-hidden">
                            <span className="text-gray-500 text-[11px] font-medium tracking-wider uppercase text-right w-full truncate">
                                {new Date(review.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action & Submission Form */}
            <div className="mt-20 text-center">
                {!showForm ? (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <div className="relative inline-block group">
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <a
                                href={facebookUrl}
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
        </>
    );
}
