"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Anchor, CheckCircle2, Clock, MapPin, ArrowRight, ChevronDown, ChevronUp, Check, X, Shield, Info, DollarSign, Loader2 } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/config';
import WaveSeparator from '@/components/ui/wave-separator';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

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

import Image from 'next/image';
import LiveaboardGallery from '@/components/sections/liveaboard-gallery';

const SchedulePage = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
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
                    setTrips(data as Trip[]);
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
                <div className="grid gap-8">
                    {trips.map((trip) => (
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

            <LiveaboardGallery />

            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
};

const fallbackTrips: Trip[] = [
    {
        id: "eid-fitr-2026",
        title: "North Expedition (Eid El-Fitr)",
        route: "North Wrecks (Thistlegorm & Ras Muhammad)",
        yacht: "HH II",
        dates: "19 to 21 March 2026",
        port: "Hurghada",
        type: "Mini Safari",
        status: "Limited Spots",
        color: "bg-blue-500/20",
        itinerary: [
            { day: "Thursday 19 March", activities: ["Yacht check-in 6 pm", "Dinner & gear setup"] },
            { day: "Friday 20 March", activities: ["Check dive (Dolphin house)", "Giannis D wreck", "Thistlegorm night dive"] },
            { day: "Saturday 21 March", activities: ["Thistlegorm day dive", "Carnatic wreck dive", "Check-out 3 pm"] }
        ],
        included: ["Full-board accommodation", "Three meals daily", "Guided dives", "Tanks/weights", "Mako giveaways"],
        notIncluded: ["Equipment rental", "15 L tank or Nitrox", "Crew gratuity"]
    },
    {
        id: "eid-adha-2026",
        title: "Sharks Obsession (Eid El-Adha)",
        route: "South (Daedalus & Elphinstone)",
        yacht: "HH I",
        dates: "26 to 30 May 2026",
        port: "Hurghada",
        type: "Full Liveaboard",
        status: "Early Bird Open",
        color: "bg-primary/20",
        earlyBird: "25K EGP instead of 28K per diver (Ends 30 March)",
        itinerary: [{ activities: ["Elphinstone Reef", "Daedalus Reef (Two Days)", "Marsa Shona & Abu Dabab", "Min 10 Dives"] }],
        included: ["Full-board accommodation", "Three meals daily", "Guided dives", "Tanks/weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Gratuity"]
    },
    {
        id: "south-parks-2026",
        title: "South Parks Expedition",
        route: "Deep South (St. John's & Zabargad)",
        yacht: "HH II",
        dates: "30 May to 06 June 2026",
        port: "Port Ghalib",
        type: "Full Liveaboard",
        status: "Early Bird Open",
        color: "bg-emerald-500/20",
        earlyBird: "46K EGP (Lower) / 52K EGP (Upper) - Ends 30 March",
        itinerary: [
            { day: "Day 1", activities: ["Check-in and General Briefing"] },
            { day: "Day 2", activities: ["Shaab Marsa Alam", "Shaab Sharm"] },
            { day: "Day 3", activities: ["3 * Zabargad & Rocky", "Night dive"] },
            { day: "Day 4", activities: ["3 * Saint John's"] },
            { day: "Day 5", activities: ["3 * Saint John's", "Night Dive"] },
            { day: "Day 6", activities: ["3 * Sataya", "Night dive"] },
            { day: "Day 7", activities: ["Wadi El Gemal", "Marsa Alam"] },
            { day: "Day 8", activities: ["Breakfast & Check out"] }
        ],
        included: ["Full-board accommodation", "Guided dives"],
        notIncluded: ["Equipment rental"]
    },
    {
        id: "bde-series-2026",
        title: "BDE Classic Expedition",
        route: "Brothers, Daedalus & Elphinstone",
        yacht: "HH II",
        dates: "Multiple Sailings (June - Nov 2026)",
        port: "Varies",
        type: "Full Liveaboard",
        status: "Waitlist Active",
        color: "bg-purple-500/20",
        itinerary: [
            { day: "Dates", activities: ["20-27 June", "11-18 July", "18-25 July", "08-15 Aug", "18-26 Sep", "03-10 Oct", "10-17 Oct", "24-31 Oct", "14-21 Nov"] },
            { day: "Route", activities: ["Big Brother", "Little Brother", "Daedalus", "Elphinstone"] }
        ],
        included: ["Full board", "Guided dives"],
        notIncluded: ["Equipment"]
    },
    {
        id: "daedalus-mini-2026",
        title: "Daedalus Mini Safari",
        route: "Daedalus & Elphinstone",
        yacht: "HH II",
        dates: "26 to 29 August 2026",
        port: "Marsa Alam",
        type: "Mini Safari",
        status: "Limited Spots",
        color: "bg-amber-500/20",
        itinerary: [{ activities: ["Daedalus Reef (Sharks)", "Elphinstone Reef"] }],
        included: ["Full board", "Guided dives"],
        notIncluded: ["Equipment"]
    },
    {
        id: "southern-charm-2026",
        title: "Southern Charm Liveaboard",
        route: "Deep South & Daedalus",
        yacht: "HH II",
        dates: "26 Sep to 03 Oct 2026",
        port: "Port Ghalib",
        type: "Full Liveaboard",
        status: "Early Bird Open",
        color: "bg-pink-500/20",
        itinerary: [{ activities: ["Shaab Sharm", "Daedalus", "Rocky Island", "Sataya"] }],
        included: ["Full board", "Guided dives"],
        notIncluded: ["Equipment"]
    },
    {
        id: "brothers-mini-2026",
        title: "Brothers' Mini Safari",
        route: "Brothers' Islands & Elphinstone",
        yacht: "HH II",
        dates: "04 to 07 November 2026",
        port: "Marsa Alam",
        type: "Mini Safari",
        status: "Booking Now",
        color: "bg-red-500/20",
        itinerary: [{ activities: ["Big Brother", "Little Brother", "Elphinstone"] }],
        included: ["Full board", "Guided dives"],
        notIncluded: ["Equipment"]
    },
    {
        id: "mini-wrecks-2026",
        title: "Mini Wrecks Expedition",
        route: "Thistlegorm, Ras Muhammad & Abu Nahas",
        yacht: "HH II",
        dates: "16 to 19 December 2026",
        port: "Marsa Alam",
        type: "Mini Safari",
        status: "Booking Now",
        color: "bg-cyan-500/20",
        itinerary: [{ activities: ["SS Thistlegorm", "Ras Muhammad", "Abu Nahas"] }],
        included: ["Full board", "Guided dives"],
        notIncluded: ["Equipment"]
    },
    {
        id: "new-years-2026",
        title: "New Year's Eve Expedition",
        route: "Thistlegorm, Ras Muhammad & Tiran",
        yacht: "HH II",
        dates: "26 Dec 2026 - 02 Jan 2027",
        port: "Hurghada",
        type: "Full Liveaboard",
        status: "Holiday Special",
        color: "bg-yellow-500/20",
        itinerary: [{ activities: ["New Year's Eve at sea", "North Wrecks", "Tiran"] }],
        included: ["Holiday Gala", "Full board"],
        notIncluded: ["Equipment"]
    }
];

export default SchedulePage;
