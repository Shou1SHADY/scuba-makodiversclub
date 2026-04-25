"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Anchor, CheckCircle2, Clock, MapPin, ArrowRight, ChevronDown, ChevronUp, Check, X, Info, DollarSign, Loader2, Camera } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/config';
import WaveSeparator from '@/components/ui/wave-separator';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import LiveaboardGallery from '@/components/sections/liveaboard-gallery';
import { HHI_IMAGES, HHII_IMAGES } from '@/lib/constants/galleries';

interface ItineraryItem {
    day?: string;
    activities: string[];
}

interface Trip {
    id: string;
    title: string;
    route: string;
    yacht: string;
    dates: string;
    port: string;
    itinerary: ItineraryItem[];
    included: string[];
    notIncluded: string[];
    price?: string;
    earlyBird?: string;
    status: string;
    type: string;
    color: string;
    bookingLink?: string;
}

const TripCard = ({ trip }: { trip: Trip }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`group glass-card rounded-3xl border border-white/5 hover:border-primary/40 transition-all duration-500 overflow-hidden ${isExpanded ? 'ring-1 ring-primary/20' : ''}`}>
            {/* Top Bar / Summary */}
            <div className="p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div className={`w-20 h-20 rounded-2xl ${trip.color || 'bg-blue-500/20'} flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 border border-white/5`}>
                        <Calendar size={36} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <span className="bg-primary text-brand-navy text-[10px] uppercase font-bold px-2.5 py-1 rounded-md tracking-widest">
                                {trip.type}
                            </span>
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                                <MapPin size={14} />
                                {trip.port}
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                                <Anchor size={14} />
                                {trip.yacht}
                            </div>
                        </div>
                        <h3 className="text-white text-2xl md:text-3xl font-display font-bold group-hover:text-primary transition-colors">{trip.title}</h3>
                        <p className="text-gray-400 font-medium tracking-wide italic">{trip.dates}</p>
                    </div>
                </div>

                <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
                    <div className="flex items-center justify-center md:justify-end gap-2 text-primary font-bold uppercase text-[10px] tracking-widest">
                        <Clock size={14} />
                        <span>{trip.status}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="inline-flex items-center justify-center gap-2 border border-white/10 text-white font-bold uppercase text-[10px] tracking-widest py-4 px-6 rounded-xl hover:bg-white/5 transition-all"
                        >
                            {isExpanded ? "Hide Details" : "View Details"}
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        <a
                            href={trip.bookingLink || GOOGLE_FORM_URL}
                            target="_blank"
                            className="inline-flex items-center justify-center gap-2 bg-primary text-brand-navy font-bold uppercase text-[10px] tracking-widest py-4 px-8 rounded-xl hover:bg-white hover:scale-105 transition-all w-full sm:w-auto"
                        >
                            Book Now
                            <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Expandable Details Section */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="border-t border-white/5 bg-white/[0.02]"
                    >
                        <div className="p-6 md:p-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {/* Itinerary */}
                            <div className="space-y-6">
                                <h4 className="flex items-center gap-2 text-primary uppercase text-xs font-bold tracking-widest">
                                    <Info size={16} /> Detailed Itinerary
                                </h4>
                                <div className="space-y-4">
                                    {trip.itinerary && trip.itinerary.map((item, idx) => (
                                        <div key={idx} className="relative pl-6 border-l border-white/10">
                                            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary" />
                                            {item.day && <p className="text-white text-sm font-bold mb-1">{item.day}</p>}
                                            <ul className="text-gray-400 text-sm space-y-1">
                                                {item.activities && item.activities.map((act, i) => (
                                                    <li key={i}>• {act}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Inclusions */}
                            <div className="space-y-6">
                                <h4 className="flex items-center gap-2 text-emerald-400 uppercase text-xs font-bold tracking-widest">
                                    <Check size={16} /> What's Included
                                </h4>
                                <ul className="space-y-3">
                                    {trip.included && trip.included.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                                            <div className="mt-1 shrink-0"><CheckCircle2 size={14} className="text-emerald-500" /></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Exclusions & Price */}
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <h4 className="flex items-center gap-2 text-rose-400 uppercase text-xs font-bold tracking-widest">
                                        <X size={16} /> Not Included
                                    </h4>
                                    <ul className="space-y-3">
                                        {trip.notIncluded && trip.notIncluded.map((item, idx) => (
                                            <li key={idx} className="flex gap-3 text-gray-500 text-sm">
                                                <div className="mt-1 shrink-0"><X size={14} className="text-rose-500/50" /></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {(trip.price || trip.earlyBird) && (
                                    <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-3">
                                        <h4 className="flex items-center gap-2 text-primary uppercase text-[10px] font-black tracking-widest">
                                            <DollarSign size={14} /> Price Details
                                        </h4>
                                        {trip.earlyBird && (
                                            <p className="text-white font-bold text-sm">
                                                <span className="text-primary italic">Early Bird:</span> {trip.earlyBird}
                                            </p>
                                        )}
                                        {trip.price && (
                                            <p className="text-white font-bold text-sm">
                                                <span className="text-white/60">Standard:</span> {trip.price}
                                            </p>
                                        )}
                                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                                            *30% deposit required to confirm booking
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SchedulePage = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'All' | 'Mini Safari' | 'Full Liveaboard'>('All');
    const supabase = createClient();

    useEffect(() => {
        const fetchSafaris = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('safaris')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    setTrips(fallbackTrips);
                } else if (data && data.length > 0) {
                    // Map DB snake_case columns to frontend camelCase expectations
                    const mappedData = data.map((item: any) => ({
                        ...item,
                        earlyBird: item.early_bird || item.earlyBird,
                        notIncluded: item.not_included || item.notIncluded || []
                    }));
                    setTrips(mappedData as Trip[]);
                } else {
                    setTrips(fallbackTrips);
                }
            } catch (e) {
                setTrips(fallbackTrips);
            } finally {
                setLoading(false);
            }
        };

        fetchSafaris();
    }, []);

    const filteredTrips = filter === 'All' ? trips : trips.filter(t => t.type === filter);

    if (loading) {
        return (
            <div className="bg-brand-navy min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="bg-brand-navy min-h-screen">
            <div className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/assets/liveaboard-hero.jpg"
                        alt="Scuba Dive Safari Liveaboard"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/40 to-brand-navy z-0" />
                </div>
                <div className="container-width px-6 relative z-10 text-center max-w-3xl mx-auto">
                    <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">2026 Red Sea Expeditions</span>
                    <h1 className="text-white mb-6 text-3xl md:text-5xl lg:text-6xl font-display font-medium">
                        Safari <span className="text-primary italic">Schedule</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed italic">
                        "Your ultimate dive plan awaits in the stunning Red Sea."
                    </p>
                </div>
            </div>

            <div className="container-width px-4 md:px-6 pb-16 md:pb-20 relative z-10">
                {/* Filter Bar */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {(['All', 'Mini Safari', 'Full Liveaboard'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                                filter === f
                                    ? 'bg-primary text-brand-navy border-primary shadow-lg shadow-primary/20'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-primary/30 hover:text-white'
                            }`}
                        >
                            {f}
                            <span className={`ml-2 px-1.5 py-0.5 rounded text-[9px] ${filter === f ? 'bg-brand-navy/20' : 'bg-white/10'}`}>
                                {f === 'All' ? trips.length : trips.filter(t => t.type === f).length}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="grid gap-8">
                    {filteredTrips.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                    ))}
                </div>

                <section className="mt-24">
                    <div className="relative glass-card p-6 md:p-10 lg:p-16 rounded-[2rem] overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl text-center md:text-left">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8 mx-auto md:mx-0">
                                    <Anchor size={32} />
                                </div>
                                <h2 className="text-white text-3xl md:text-4xl font-display font-bold mb-6 italic">Custom Group Safaris</h2>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    Planning a trip for your dive club or a group of friends? We organize private charters and custom itineraries tailored to your specific needs.
                                </p>
                            </div>
                            <div className="w-full md:w-auto">
                                <a href="/contact" className="inline-block bg-white text-brand-navy font-bold uppercase text-sm tracking-widest py-5 px-10 rounded-xl hover:bg-primary transition-all shadow-xl text-center w-full">
                                    Get a Private Quote
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Liveaboard Gallery Sections */}
            <div className="bg-brand-navy pt-20">
                <div className="container-width px-6">
                    <div className="flex flex-col items-center justify-center text-center mb-16">
                        <div className="flex items-center gap-3 mb-4">
                            <Camera className="text-primary" size={20} />
                            <span className="text-primary text-[10px] md:text-xs uppercase font-bold tracking-[0.4em]">The Fleet Portfolio</span>
                        </div>
                        <h2 className="text-white text-4xl md:text-6xl font-display font-medium">
                            Liveaboard <span className="text-primary italic">Gallery</span>
                        </h2>
                    </div>

                    {/* Hammerhead I Section */}
                    <div className="mb-24">
                        <div className="flex items-center gap-4 mb-8 justify-center md:justify-start border-b border-white/5 pb-4">
                            <Anchor className="text-primary" size={24} />
                            <h3 className="text-white text-xl md:text-2xl font-display font-bold uppercase tracking-widest">
                                Hammerhead <span className="text-primary">I</span>
                            </h3>
                        </div>
                        <LiveaboardGallery
                            images={HHI_IMAGES}
                            hideText={true}
                            layout="slider"
                            disableLightbox={true}
                            showHeader={false}
                        />
                    </div>

                    {/* Hammerhead II Section */}
                    <div className="pb-20">
                        <div className="flex items-center gap-4 mb-8 justify-center md:justify-start border-b border-white/5 pb-4">
                            <Anchor className="text-primary" size={24} />
                            <h3 className="text-white text-xl md:text-2xl font-display font-bold uppercase tracking-widest">
                                Hammerhead <span className="text-primary">II</span>
                            </h3>
                        </div>
                        <LiveaboardGallery
                            images={HHII_IMAGES}
                            hideText={true}
                            layout="slider"
                            disableLightbox={true}
                            showHeader={false}
                        />
                    </div>
                </div>
            </div>

            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div >
    );
};

const fallbackTrips: Trip[] = [
    // ─── MINI SAFARIS ──────────────────────────────────────────────
    {
        id: "north-expedition-eid-fitr-2026",
        title: "North Expedition",
        route: "Thistlegorm & Ras Muhammad",
        yacht: "HH II",
        dates: "18 – 21 March 2026 (Eid El-Fitr)",
        port: "Hurghada",
        type: "Mini Safari",
        status: "Limited Spots",
        color: "bg-blue-500/20",
        itinerary: [
            { day: "Day 1 – 18 March", activities: ["Yacht check-in 6 pm", "Dinner & gear setup"] },
            { day: "Day 2 – 19 March", activities: ["Check dive", "Giannis D wreck", "Thistlegorm night dive"] },
            { day: "Day 3 – 20 March", activities: ["Thistlegorm day dive", "Ras Muhammad dives"] },
            { day: "Day 4 – 21 March", activities: ["Morning dive", "Check-out & transfer"] }
        ],
        included: ["Full-board accommodation", "Three meals daily", "Guided dives", "Tanks & weights", "Mako giveaways"],
        notIncluded: ["Equipment rental", "15 L tank or Nitrox", "Crew gratuity"]
    },
    {
        id: "sharks-wrecks-eid-adha-2026",
        title: "Sharks & Wrecks",
        route: "Brothers' Islands & Salem Express",
        yacht: "HH I",
        dates: "26 – 30 May 2026 (Eid El-Adha)",
        port: "Hurghada",
        type: "Mini Safari",
        status: "Early Bird Open",
        color: "bg-primary/20",
        itinerary: [
            { day: "Route", activities: ["Big Brother Island", "Little Brother Island", "Salem Express wreck", "Elphinstone Reef"] }
        ],
        included: ["Full-board accommodation", "Three meals daily", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "daedalus-mini-july-2026",
        title: "Daedalus Mini",
        route: "Daedalus & Elphinstone",
        yacht: "HH II",
        dates: "18 – 22 July 2026 (Long Weekend)",
        port: "Marsa Alam",
        type: "Mini Safari",
        status: "Limited Spots",
        color: "bg-amber-500/20",
        itinerary: [{ activities: ["Daedalus Reef (Sharks & Pelagics)", "Elphinstone Reef", "Min 8 Dives"] }],
        included: ["Full-board accommodation", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "brothers-mini-aug-2026",
        title: "Brothers' Mini",
        route: "Brothers' Islands & Elphinstone",
        yacht: "HH II",
        dates: "26 – 29 Aug 2026 (Long Weekend)",
        port: "Marsa Alam",
        type: "Mini Safari",
        status: "Limited Spots",
        color: "bg-red-500/20",
        itinerary: [{ activities: ["Big Brother Island", "Little Brother Island", "Elphinstone Reef"] }],
        included: ["Full-board accommodation", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "daedalus-mini-nov-2026",
        title: "Daedalus Mini",
        route: "Daedalus & Elphinstone",
        yacht: "HH II",
        dates: "04 – 07 November 2026",
        port: "Marsa Alam",
        type: "Mini Safari",
        status: "Booking Now",
        color: "bg-amber-500/20",
        itinerary: [{ activities: ["Daedalus Reef (Sharks & Pelagics)", "Elphinstone Reef", "Min 8 Dives"] }],
        included: ["Full-board accommodation", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "mini-wrecks-2026",
        title: "Mini Wrecks",
        route: "Thistlegorm, Ras Muhammad & Abu Nahas",
        yacht: "HH II",
        dates: "16 – 19 December 2026",
        port: "Hurghada",
        type: "Mini Safari",
        status: "Booking Now",
        color: "bg-cyan-500/20",
        itinerary: [{ activities: ["SS Thistlegorm", "Ras Muhammad National Park", "Abu Nahas Wrecks"] }],
        included: ["Full-board accommodation", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },

    // ─── FULL LIVEABOARDS ──────────────────────────────────────────
    {
        id: "deep-south-2026",
        title: "Deep South Expedition",
        route: "Deep South (St. John's & Zabargad)",
        yacht: "HH II",
        dates: "30 May – 06 June 2026",
        port: "Port Ghalib",
        type: "Full Liveaboard",
        status: "Early Bird Open",
        color: "bg-emerald-500/20",
        itinerary: [
            { day: "Day 1", activities: ["Check-in & General Briefing"] },
            { day: "Day 2", activities: ["Shaab Marsa Alam", "Shaab Sharm"] },
            { day: "Day 3", activities: ["Zabargad Island (x3)", "Night dive"] },
            { day: "Day 4", activities: ["Saint John's Reef (x3)"] },
            { day: "Day 5", activities: ["Saint John's Reef (x3)", "Night Dive"] },
            { day: "Day 6", activities: ["Sataya (Dolphin Reef x3)", "Night dive"] },
            { day: "Day 7", activities: ["Wadi El Gemal", "Marsa Alam"] },
            { day: "Day 8", activities: ["Breakfast & Check out"] }
        ],
        included: ["Full-board accommodation", "All meals & beverages", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "bde-july-2026",
        title: "BDE Expedition",
        route: "Brothers, Daedalus & Elphinstone",
        yacht: "HH II",
        dates: "11 – 18 July 2026",
        port: "Hurghada",
        type: "Full Liveaboard",
        status: "Booking Now",
        color: "bg-purple-500/20",
        itinerary: [
            { day: "Route", activities: ["Big Brother Island", "Little Brother Island", "Daedalus Reef", "Elphinstone Reef"] }
        ],
        included: ["Full-board accommodation", "All meals", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "bde-sep-2026",
        title: "BDE Expedition",
        route: "Brothers, Daedalus & Elphinstone",
        yacht: "HH II",
        dates: "18 – 26 September 2026",
        port: "Hurghada",
        type: "Full Liveaboard",
        status: "Booking Now",
        color: "bg-purple-500/20",
        itinerary: [
            { day: "Route", activities: ["Big Brother Island", "Little Brother Island", "Daedalus Reef", "Elphinstone Reef"] }
        ],
        included: ["Full-board accommodation", "All meals", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "deep-south-daedalus-2026",
        title: "Deep South & Daedalus",
        route: "Deep South & Daedalus",
        yacht: "HH II",
        dates: "26 Sep – 03 Oct 2026",
        port: "Port Ghalib",
        type: "Full Liveaboard",
        status: "Booking Now",
        color: "bg-pink-500/20",
        itinerary: [{ activities: ["Shaab Sharm", "Daedalus Reef", "Rocky Island", "Sataya (Dolphin Reef)"] }],
        included: ["Full-board accommodation", "All meals", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "bde-oct-2026",
        title: "BDE Expedition",
        route: "Brothers, Daedalus & Elphinstone",
        yacht: "HH II",
        dates: "24 – 31 October 2026",
        port: "Hurghada",
        type: "Full Liveaboard",
        status: "Booking Now",
        color: "bg-purple-500/20",
        itinerary: [
            { day: "Route", activities: ["Big Brother Island", "Little Brother Island", "Daedalus Reef", "Elphinstone Reef"] }
        ],
        included: ["Full-board accommodation", "All meals", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "bde-nov-2026",
        title: "BDE Expedition",
        route: "Brothers, Daedalus & Elphinstone",
        yacht: "HH II",
        dates: "14 – 21 November 2026",
        port: "Hurghada",
        type: "Full Liveaboard",
        status: "Booking Now",
        color: "bg-purple-500/20",
        itinerary: [
            { day: "Route", activities: ["Big Brother Island", "Little Brother Island", "Daedalus Reef", "Elphinstone Reef"] }
        ],
        included: ["Full-board accommodation", "All meals", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "new-years-eve-2026",
        title: "New Year's Eve Expedition",
        route: "North Wrecks & Tiran",
        yacht: "HH II",
        dates: "26 Dec 2026 – 02 Jan 2027",
        port: "Hurghada",
        type: "Full Liveaboard",
        status: "Holiday Special",
        color: "bg-yellow-500/20",
        itinerary: [{ activities: ["New Year's Eve celebration at sea", "SS Thistlegorm", "Ras Muhammad", "Straits of Tiran"] }],
        included: ["New Year's Gala Dinner", "Full-board accommodation", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    }
];

export default SchedulePage;
