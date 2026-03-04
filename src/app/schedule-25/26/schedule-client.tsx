"use client";

import React, { useState } from 'react';
import { Calendar, Anchor, CheckCircle2, Clock, MapPin, ArrowRight, ChevronDown, ChevronUp, Check, X, Info, DollarSign } from 'lucide-react';
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

export default function ScheduleClient({ initialTrips }: { initialTrips: Trip[] }) {
    return (
        <div className="grid gap-8">
            {initialTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
            ))}
        </div>
    );
}
