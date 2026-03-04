"use client";

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/config';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function MiniSafariClient({ initialTrips }: { initialTrips: Trip[] }) {
    return (
        <div className="grid gap-8">
            {initialTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
            ))}
        </div>
    );
}
