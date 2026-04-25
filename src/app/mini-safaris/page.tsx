"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Anchor, CheckCircle2, Clock, MapPin, ArrowRight, ChevronDown, ChevronUp, Check, X, Info, DollarSign, Loader2 } from 'lucide-react';
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
                        className="border-t border-white/5 bg-white/[0.02] p-6 md:p-10"
                    >
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">
                            <div className="space-y-4">
                                <h4 className="text-primary font-bold uppercase tracking-widest text-xs">Route Details</h4>
                                <p className="text-white/80">{trip.route}</p>
                                <p className="text-white/80">Yacht: {trip.yacht}</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs">Highlights</h4>
                                <ul className="space-y-2 text-gray-400">
                                    {trip.itinerary[0]?.activities.map((a, i) => <li key={i}>• {a}</li>)}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-primary font-bold uppercase tracking-widest text-xs">Pricing</h4>
                                {trip.earlyBird && <p className="text-primary">Early Bird: {trip.earlyBird}</p>}
                                {trip.price && <p className="text-white/60">Standard: {trip.price}</p>}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MiniSafarisPage = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchMiniSafaris = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('safaris')
                    .select('*')
                    .eq('type', 'Mini Safari')
                    .order('created_at', { ascending: false });

                if (data && data.length > 0) {
                    const mappedData = data.map((item: any) => ({
                        ...item,
                        earlyBird: item.early_bird || item.earlyBird,
                        notIncluded: item.not_included || item.notIncluded || []
                    }));
                    setTrips(mappedData as Trip[]);
                } else {
                    setTrips(fallbackMiniSafaris);
                }
            } catch (e) {
                setTrips(fallbackMiniSafaris);
            } finally {
                setLoading(false);
            }
        };
        fetchMiniSafaris();
    }, []);

    return (
        <div className="bg-brand-navy min-h-screen">
            <div className="relative pt-40 pb-20 overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-brand-navy z-0" />
                <div className="container-width px-6 relative z-10 max-w-4xl mx-auto">
                    <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">Bite-sized Adventures</span>
                    <h1 className="text-white mb-6 text-5xl md:text-6xl font-display font-medium">
                        Mini <span className="text-primary">Safaris</span>
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        Experience the magic of the Red Sea in just 3-4 days. Perfect for those with limited time who still want the full liveaboard experience.
                    </p>
                </div>
            </div>

            <div className="container-width px-6 pb-24 relative z-10">
                {loading ? (
                    <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
                ) : (
                    <div className="grid gap-8">
                        {trips.map((trip) => (
                            <TripCard key={trip.id} trip={trip} />
                        ))}
                    </div>
                )}

                <div className="mt-20 text-center relative z-10">
                    <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-6">Looking for full expeditions?</p>
                    <a href="/schedule-25/26" className="inline-flex items-center gap-3 text-white hover:text-primary transition-colors font-display font-medium text-xl group">
                        View Full 2026 Safari Schedule
                        <ArrowRight size={20} className="text-primary group-hover:translate-x-2 transition-transform" />
                    </a>
                </div>
            </div>

            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
};

const fallbackMiniSafaris: Trip[] = [
    {
        id: "north-expedition-eid-fitr-mini",
        title: "North Expedition",
        route: "Thistlegorm & Ras Muhammad",
        yacht: "HH II",
        dates: "18 – 21 March 2026 (Eid El-Fitr)",
        port: "Hurghada",
        type: "Mini Safari",
        status: "Limited Spots",
        color: "bg-blue-500/20",
        itinerary: [{ activities: ["SS Thistlegorm (day & night)", "Ras Muhammad National Park", "Giannis D wreck"] }],
        included: ["Full-board accommodation", "Guided dives", "Tanks & weights", "Mako giveaways"],
        notIncluded: ["Equipment rental", "15 L tank or Nitrox", "Crew gratuity"]
    },
    {
        id: "sharks-wrecks-eid-adha-mini",
        title: "Sharks & Wrecks",
        route: "Brothers' Islands & Salem Express",
        yacht: "HH I",
        dates: "26 – 30 May 2026 (Eid El-Adha)",
        port: "Hurghada",
        type: "Mini Safari",
        status: "Early Bird Open",
        color: "bg-primary/20",
        itinerary: [{ activities: ["Big Brother Island", "Little Brother Island", "Salem Express wreck", "Elphinstone Reef"] }],
        included: ["Full-board accommodation", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "daedalus-mini-july",
        title: "Daedalus Mini",
        route: "Daedalus & Elphinstone",
        yacht: "HH II",
        dates: "18 – 22 July 2026 (Long Weekend)",
        port: "Marsa Alam",
        type: "Mini Safari",
        status: "Limited Spots",
        color: "bg-amber-500/20",
        itinerary: [{ activities: ["Daedalus Reef (Sharks & Pelagics)", "Elphinstone Reef", "Early morning hammerhead dives"] }],
        included: ["Full-board accommodation", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "brothers-mini-aug",
        title: "Brothers' Mini",
        route: "Brothers' Islands & Elphinstone",
        yacht: "HH II",
        dates: "26 – 29 Aug 2026 (Long Weekend)",
        port: "Marsa Alam",
        type: "Mini Safari",
        status: "Limited Spots",
        color: "bg-red-500/20",
        itinerary: [{ activities: ["Big Brother Island", "Little Brother Island", "Elphinstone Reef", "Oceanic whitetip sightings"] }],
        included: ["Full-board accommodation", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "daedalus-mini-nov",
        title: "Daedalus Mini",
        route: "Daedalus & Elphinstone",
        yacht: "HH II",
        dates: "04 – 07 November 2026",
        port: "Marsa Alam",
        type: "Mini Safari",
        status: "Booking Now",
        color: "bg-amber-500/20",
        itinerary: [{ activities: ["Daedalus Reef (Sharks & Pelagics)", "Elphinstone Reef", "Early morning hammerhead dives"] }],
        included: ["Full-board accommodation", "Guided dives", "Tanks & weights"],
        notIncluded: ["Equipment rental", "Nitrox", "Crew gratuity"]
    },
    {
        id: "mini-wrecks-dec-2026",
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
    }
];

export default MiniSafarisPage;
