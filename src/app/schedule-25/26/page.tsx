"use client";

import React from 'react';
import { Calendar, Anchor, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/config';
import WaveSeparator from '@/components/ui/wave-separator';

const SchedulePage = () => {
    const expeditions = [
        {
            date: "24 Dec - 28 Dec 2025",
            title: "North Expedition Mini Safari",
            status: "Limited Spots",
            type: "Mini Safari",
            location: "Hurghada / Sharm",
            price: "Enquire for price",
            color: "bg-blue-500/20"
        },
        {
            date: "Spring 2026",
            title: "Deep South Shark Expedition",
            status: "Waitlist Open",
            type: "Full Liveaboard",
            location: "Marsa Alam",
            price: "TBA",
            color: "bg-primary/20"
        }
    ];

    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Page Header Section */}
            <div className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-brand-navy/50 to-brand-navy z-0" />

                <div className="container-width px-6 relative z-10 text-center max-w-3xl mx-auto">
                    <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block animate-fade-in">Adventures Await</span>
                    <h1 className="text-white mb-6 text-5xl md:text-6xl font-display font-medium animate-fade-in-up">
                        Safari <span className="text-primary">Schedule</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed animate-fade-in-up delay-100">
                        Our 2025/2026 Diving Safari Schedule is officially here. Join us for unforgettable journeys through the stunning Red Sea.
                    </p>
                </div>
            </div>

            <div className="container-width px-6 pb-20 relative z-10">
                <div className="grid gap-6">
                    {expeditions.map((exp, i) => (
                        <div key={i} className="group glass-card p-6 md:p-10 rounded-3xl border border-white/5 hover:border-primary/40 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                <div className={`w-20 h-20 rounded-2xl ${exp.color} flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
                                    <Calendar size={36} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                        <span className="bg-primary text-brand-navy text-[10px] uppercase font-bold px-2.5 py-1 rounded-md tracking-widest">
                                            {exp.type}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                                            <MapPin size={14} />
                                            {exp.location}
                                        </div>
                                    </div>
                                    <h3 className="text-white text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors">{exp.title}</h3>
                                    <p className="text-gray-400 font-medium tracking-wide italic">{exp.date}</p>
                                </div>
                            </div>

                            <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
                                <div className="flex items-center justify-center md:justify-end gap-2 text-primary font-bold uppercase text-[10px] tracking-widest">
                                    <Clock size={14} />
                                    <span>{exp.status}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={GOOGLE_FORM_URL}
                                        className="inline-flex items-center justify-center gap-2 bg-primary text-brand-navy font-bold uppercase text-xs tracking-widest py-4 px-8 rounded-xl hover:bg-white hover:scale-105 transition-all w-full sm:w-auto"
                                    >
                                        Book Now
                                        <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Private Charters Section */}
                <section className="mt-24">
                    <div className="relative glass-card p-10 md:p-16 rounded-[2.5rem] overflow-hidden border border-white/5">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl text-center md:text-left">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8 mx-auto md:mx-0">
                                    <Anchor size={32} />
                                </div>
                                <h2 className="text-white text-3xl md:text-4xl font-display font-bold mb-6 italic">Custom Group Safaris</h2>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    Planning a trip for your dive club or a group of friends? We organize private charters and custom itineraries tailored to your specific needs, experience levels, and expectations.
                                </p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <span className="flex items-center gap-2 text-sm text-white/60"><CheckCircle2 size={16} className="text-primary" /> Private Boat</span>
                                    <span className="flex items-center gap-2 text-sm text-white/60"><CheckCircle2 size={16} className="text-primary" /> Custom Routes</span>
                                    <span className="flex items-center gap-2 text-sm text-white/60"><CheckCircle2 size={16} className="text-primary" /> Exclusive Guide</span>
                                </div>
                            </div>
                            <div className="w-full md:w-auto">
                                <a
                                    href="/contact"
                                    className="inline-block bg-white text-brand-navy font-bold uppercase text-sm tracking-widest py-5 px-10 rounded-xl hover:bg-primary transition-all shadow-xl text-center w-full"
                                >
                                    Get a Private Quote
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Wave Separator before Footer */}
            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
};

export default SchedulePage;
