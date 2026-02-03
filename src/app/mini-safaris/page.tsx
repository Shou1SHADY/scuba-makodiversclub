"use client";

import React from 'react';
import { Calendar, Compass, Waves, Star, Anchor, ArrowRight, ShieldCheck } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/config';
import WaveSeparator from '@/components/ui/wave-separator';

const MiniSafarisPage = () => {
    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Page Header Section */}
            <div className="relative pt-40 pb-20 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-brand-navy/50 to-brand-navy z-0" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="container-width px-6 relative z-10 text-center max-w-4xl mx-auto">
                    <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block animate-fade-in">Bite-sized Adventures</span>
                    <h1 className="text-white mb-6 text-5xl md:text-6xl font-display font-medium animate-fade-in-up">
                        Mini <span className="text-primary">Safaris</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed animate-fade-in-up delay-100 max-w-2xl mx-auto">
                        The perfect introduction to liveaboard diving. Experience the magic of the Red Sea in just 3-4 days—designed for those who crave the sea but have limited time.
                    </p>
                </div>
            </div>

            <div className="container-width px-6 pb-24 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Featured Mini Safari Card */}
                    <div className="lg:col-span-12 xl:col-span-8 group relative glass-card rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-700">
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Image Placeholder Visual */}
                            <div className="md:w-1/2 relative min-h-[400px] bg-blue-900/10 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                    <Anchor size={80} strokeWidth={1} className="text-primary/20 mb-6 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="space-y-2">
                                        <h3 className="text-white text-4xl font-display font-bold">North Expedition</h3>
                                        <div className="flex items-center justify-center gap-2 text-primary uppercase text-xs font-bold tracking-widest">
                                            <Calendar size={14} />
                                            3 Days | 2 Nights
                                        </div>
                                    </div>
                                </div>
                                {/* Ornamental Waves */}
                                <Waves size={300} className="absolute -bottom-20 -right-20 text-white/5 rotate-12" />
                            </div>

                            {/* Content side */}
                            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-widest border border-primary/20">Featured Trip</span>
                                    </div>
                                    <p className="text-gray-300 text-lg mb-10 leading-relaxed italic border-l-2 border-primary/30 pl-6">
                                        Explore the iconic wrecks (including the SS Thistlegorm) and pristine reefs of the Northern Red Sea and Ras Mohammed.
                                    </p>
                                    <div className="space-y-6 mb-12">
                                        <div className="flex items-center gap-4 group/item">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover/item:bg-primary/10 transition-colors">
                                                <Waves size={18} />
                                            </div>
                                            <span className="text-white/80 font-medium">Up to 9 Dives Included</span>
                                        </div>
                                        <div className="flex items-center gap-4 group/item">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover/item:bg-primary/10 transition-colors">
                                                <Star size={18} />
                                            </div>
                                            <span className="text-white/80 font-medium">Full Board Accommodation</span>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href={GOOGLE_FORM_URL}
                                    className="inline-flex items-center justify-center gap-3 bg-primary text-brand-navy font-bold uppercase text-xs tracking-[0.2em] py-5 px-10 rounded-2xl hover:bg-white hover:scale-105 transition-all w-full shadow-lg shadow-primary/10"
                                >
                                    Book Next Voyage
                                    <ArrowRight size={18} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Info Area */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-6">
                        <div className="glass-card p-10 rounded-[2rem] border border-white/5 flex flex-col gap-6 hover:border-primary/20 transition-all duration-500">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                                <Compass size={32} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-2xl mb-4 group-hover:text-primary transition-colors">Flexible Itineraries</h4>
                                <p className="text-gray-400 leading-relaxed">We adapt our routes based on current weather patterns and real-time marine life sightings to ensure you get the absolute best diving experience possible.</p>
                            </div>
                        </div>

                        <div className="glass-card p-10 rounded-[2rem] border border-white/5 flex flex-col gap-6 hover:border-primary/20 transition-all duration-500">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-2">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-2xl mb-4 group-hover:text-primary transition-colors">Monthly Sailings</h4>
                                <p className="text-gray-400 leading-relaxed">Join one of our scheduled mini-trips from Hurghada or Sharm El-Sheikh. We offer guaranteed departures every single month.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Separator before Footer */}
            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
};

export default MiniSafarisPage;
