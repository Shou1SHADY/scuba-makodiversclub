"use client";

import React from 'react';
import { MapPin, Hotel, Car, Waves, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/config';
import WaveSeparator from '@/components/ui/wave-separator';

const PackagesPage = () => {
    const packages = [
        {
            city: "Hurghada",
            details: "Coastal Diving Escape",
            duration: "2 Days | 2 Nights",
            description: "Explore the legendary house reefs and iconic boat sites of Hurghada. A perfect blend of comfort and world-class diving.",
            highlights: ["4 Professional Dives", "4* Hotel Accommodation", "Private Airport Transfers"],
            price: "299",
            featured: false,
            accent: "from-blue-600/20"
        },
        {
            city: "Dahab",
            details: "Adventure & Blue Hole",
            duration: "3 Days | 3 Nights",
            description: "Dive the world-famous Blue Hole and Canyon. Experience the unique, laid-back nomadic vibe of Dahab's shore diving.",
            highlights: ["6 Guided Shore Dives", "Boutique Hotel Stay", "Scenic Desert Transfers"],
            price: "385",
            featured: true,
            accent: "from-primary/20"
        },
        {
            city: "Sharm El-Sheikh",
            details: "Ras Mohammed Expedition",
            duration: "3 Days | 3 Nights",
            description: "The crown jewel of Red Sea diving. Explore Ras Mohammed National Park and the historic Straits of Tiran.",
            highlights: ["6 Boat Dives", "Premium Resort Stay", "Full Equipment Rental"],
            price: "450",
            featured: false,
            accent: "from-emerald-600/20"
        }
    ];

    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Page Header Section */}
            <div className="relative pt-40 pb-24 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-brand-navy/50 to-brand-navy z-0" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="container-width px-6 relative z-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
                        <ShieldCheck size={14} className="text-primary" />
                        <span className="text-primary uppercase tracking-[0.2em] text-[10px] font-bold">Hassle-Free Exploration</span>
                    </div>
                    <h1 className="text-white mb-6 text-5xl md:text-7xl font-display font-medium tracking-tight animate-fade-in-up">
                        Diving <span className="text-primary">Packages</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Hand-crafted all-inclusive experiences designed for a seamless journey through Egypt's most iconic dive sites.
                    </p>
                </div>
            </div>

            <div className="container-width px-6 pb-32 relative z-10">
                <div className="grid gap-16">
                    {packages.map((pkg, i) => (
                        <div
                            key={i}
                            className={`group relative glass-card rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-500 shadow-2xl flex flex-col lg:flex-row items-stretch ${pkg.featured ? 'ring-2 ring-primary/30 ring-offset-4 ring-offset-brand-navy' : ''}`}
                        >
                            {/* Visual Side */}
                            <div className={`lg:w-[35%] relative min-h-[300px] bg-gradient-to-br ${pkg.accent} to-transparent p-12 flex flex-col justify-between overflow-hidden`}>
                                {/* Decorative Background Elements */}
                                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 blur-3xl rounded-full" />
                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-navy to-transparent" />
                                </div>

                                <div className="relative z-10">
                                    {pkg.featured && (
                                        <span className="inline-block bg-primary text-brand-navy text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                                            Most Popular
                                        </span>
                                    )}
                                    <div className="flex items-start gap-4 mb-2">
                                        <MapPin className="text-primary mt-1" size={20} />
                                        <div>
                                            <h2 className="text-white text-4xl font-display font-bold leading-none mb-2">{pkg.city}</h2>
                                            <p className="text-primary/80 font-medium tracking-wide uppercase text-xs">{pkg.details}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 text-white/60 mb-1">
                                        <Zap size={14} className="text-primary" />
                                        <span className="text-sm font-medium">{pkg.duration}</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xs text-gray-400 uppercase tracking-widest">From</span>
                                        <span className="text-4xl font-display font-bold text-white">${pkg.price}</span>
                                    </div>
                                </div>

                                <div className="absolute -right-4 bottom-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 group-hover:rotate-0 duration-700">
                                    <Waves size={200} className="text-white" />
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="lg:w-[65%] p-10 md:p-14 flex flex-col justify-center bg-white/[0.02]">
                                <p className="text-gray-300 text-lg mb-10 leading-relaxed font-light italic border-l-2 border-primary/20 pl-6">
                                    "{pkg.description}"
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                                    {pkg.highlights.map((h, idx) => (
                                        <div key={idx} className="flex flex-col gap-3 group/item">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/5 group-hover/item:bg-primary/10 group-hover/item:border-primary/20 transition-all">
                                                {idx === 0 ? <Waves size={18} /> : idx === 1 ? <Hotel size={18} /> : <Car size={18} />}
                                            </div>
                                            <span className="text-white/80 text-sm font-medium leading-tight">{h}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-8">
                                    <a
                                        href={GOOGLE_FORM_URL}
                                        className="inline-flex items-center justify-center gap-3 bg-primary text-brand-navy font-bold uppercase text-sm tracking-widest py-5 px-10 rounded-xl hover:bg-white hover:scale-105 transition-all w-full sm:w-auto shadow-lg shadow-primary/20"
                                    >
                                        Reserve My Spot
                                        <ArrowRight size={18} />
                                    </a>
                                    <div className="flex flex-col items-center sm:items-start opacity-60">
                                        <span className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Expert Support</span>
                                        <div className="flex items-center gap-1.5 text-white text-xs font-semibold uppercase tracking-widest">
                                            <CheckCircle2 size={12} className="text-primary" />
                                            24/7 Assistance
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Wave Separator before Footer */}
            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
};

export default PackagesPage;
