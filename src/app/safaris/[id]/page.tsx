"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, Anchor, CheckCircle2, Clock, MapPin, ArrowRight, Check, X, Info, DollarSign, Loader2, Camera, Ship, ChevronLeft, ChevronRight } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/config';
import WaveSeparator from '@/components/ui/wave-separator';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

interface CustomDetailSection {
    header: string;
    items: string[];
}

interface ItineraryDay {
    day: string;
    activities: string[];
}

interface Trip {
    id: string;
    title: string;
    route: string;
    yacht: string;
    dates: string;
    port: string;
    itinerary: ItineraryDay[];
    included: string[];
    notIncluded: string[];
    images: string[];
    customDetails: CustomDetailSection[];
    price?: string;
    earlyBird?: string;
    status: string;
    type: string;
    bookingLink?: string;
}

const TripDetailPage = () => {
    const params = useParams();
    const id = params.id as string;
    const [trip, setTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState(true);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const supabase = createClient();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const { data, error } = await supabase
                    .from('safaris')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (data) {
                    setTrip({
                        ...data,
                        earlyBird: data.earlyBird || data.early_bird,
                        notIncluded: data.notIncluded || data.not_included || [],
                        images: data.images || [],
                        customDetails: data.customDetails || []
                    } as Trip);
                }
            } catch (e) {
                // trip not found
            } finally {
                setLoading(false);
            }
        };
        fetchTrip();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-brand-navy min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="bg-brand-navy min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-2">
                    <Anchor className="w-10 h-10 text-gray-700" />
                </div>
                <h1 className="text-white text-2xl font-display font-black uppercase tracking-widest">Trip Not Found</h1>
                <p className="text-gray-500 text-sm">The expedition you're looking for doesn't exist or has been removed.</p>
                <a href="/schedule-25/26" className="inline-flex items-center gap-2 bg-primary text-brand-navy font-bold uppercase text-xs tracking-widest py-4 px-8 rounded-xl hover:bg-white transition-all">
                    View All Safaris <ArrowRight size={16} />
                </a>
            </div>
        );
    }

    const images = trip.images || [];
    const hasGallery = images.length > 0;

    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Hero */}
            <div className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-brand-navy z-0" />
                <div className="container-width px-6 relative z-10 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <a href="/schedule-25/26" className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-1">
                            <ChevronLeft size={16} /> Back to Schedule
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-primary text-brand-navy text-[10px] uppercase font-bold px-2.5 py-1 rounded-md tracking-widest">
                            {trip.type}
                        </span>
                        <span className="text-gray-400 text-sm flex items-center gap-1.5">
                            <MapPin size={14} className="text-primary" /> {trip.port}
                        </span>
                        <span className="text-gray-400 text-sm flex items-center gap-1.5">
                            <Anchor size={14} className="text-primary" /> {trip.yacht}
                        </span>
                    </div>
                    <h1 className="text-white text-4xl md:text-6xl font-display font-medium mb-4">
                        {trip.title}
                    </h1>
                    <p className="text-gray-400 text-lg font-medium italic mb-6">{trip.dates}</p>
                    <div className="flex items-center gap-3 text-primary font-bold uppercase text-xs tracking-widest">
                        <Clock size={14} />
                        <span>{trip.status}</span>
                    </div>
                </div>
            </div>

            {/* Image Gallery */}
            {hasGallery && (
                <div className="container-width px-6 pb-16 relative z-10 max-w-5xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden border border-white/5 aspect-video bg-white/[0.02]">
                        <img
                            src={images[galleryIndex]}
                            alt={`${trip.title} - Image ${galleryIndex + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setGalleryIndex(i => i === 0 ? images.length - 1 : i - 1)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={() => setGalleryIndex(i => i === images.length - 1 ? 0 : i + 1)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all"
                                >
                                    <ChevronRight size={24} />
                                </button>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setGalleryIndex(i)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all ${i === galleryIndex ? 'bg-primary w-6' : 'bg-white/40 hover:bg-white/60'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    {images.length > 1 && (
                        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setGalleryIndex(i)}
                                    className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === galleryIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="container-width px-6 pb-24 relative z-10 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-10">
                        {/* Route */}
                        {trip.route && (
                            <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-4">
                                <h3 className="flex items-center gap-2 text-primary uppercase text-xs font-bold tracking-widest">
                                    <Info size={16} /> Route & Summary
                                </h3>
                                <p className="text-gray-300 leading-relaxed">{trip.route}</p>
                            </div>
                        )}

                        {/* Itinerary */}
                        {trip.itinerary && trip.itinerary.length > 0 && trip.itinerary.some(d => d.activities.some(a => a.trim() !== "")) && (
                            <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-6">
                                <h3 className="flex items-center gap-2 text-primary uppercase text-xs font-bold tracking-widest">
                                    <Calendar size={16} /> Detailed Itinerary
                                </h3>
                                <div className="space-y-4">
                                    {trip.itinerary.map((day, idx) => (
                                        day.activities.filter(a => a.trim() !== "").length > 0 && (
                                            <div key={idx} className="relative pl-6 border-l border-white/10">
                                                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary" />
                                                {day.day && <p className="text-white text-sm font-bold mb-1">{day.day}</p>}
                                                <ul className="text-gray-400 text-sm space-y-1">
                                                    {day.activities.filter(a => a.trim() !== "").map((act, i) => (
                                                        <li key={i}>• {act}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Included */}
                        {trip.included && trip.included.length > 0 && (
                            <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-6">
                                <h3 className="flex items-center gap-2 text-emerald-400 uppercase text-xs font-bold tracking-widest">
                                    <Check size={16} /> What's Included
                                </h3>
                                <ul className="space-y-3">
                                    {trip.included.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Not Included */}
                        {trip.notIncluded && trip.notIncluded.length > 0 && (
                            <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-6">
                                <h3 className="flex items-center gap-2 text-rose-400 uppercase text-xs font-bold tracking-widest">
                                    <X size={16} /> Not Included
                                </h3>
                                <ul className="space-y-3">
                                    {trip.notIncluded.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-500 text-sm">
                                            <X size={14} className="text-rose-500/50 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Custom Detail Sections */}
                        {trip.customDetails && trip.customDetails.length > 0 && trip.customDetails.filter(s => s.header.trim() !== "" && s.items.some(i => i.trim() !== "")).length > 0 && (
                            <div className="space-y-6">
                                {trip.customDetails.filter(s => s.header.trim() !== "" && s.items.some(i => i.trim() !== "")).map((section, idx) => (
                                    <div key={idx} className="glass-card rounded-2xl p-8 border border-white/5 space-y-6">
                                        <h3 className="flex items-center gap-2 text-primary uppercase text-xs font-bold tracking-widest">
                                            <Ship size={16} /> {section.header}
                                        </h3>
                                        <ul className="space-y-3">
                                            {section.items.filter(i => i.trim() !== "").map((item, i) => (
                                                <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pricing Card */}
                        {(trip.price || trip.earlyBird) && (
                            <div className="glass-card rounded-2xl p-8 border border-white/5 space-y-4 sticky top-24">
                                <h3 className="flex items-center gap-2 text-primary uppercase text-xs font-bold tracking-widest">
                                    <DollarSign size={16} /> Pricing
                                </h3>
                                {trip.earlyBird && (
                                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                                        <p className="text-primary/60 text-[10px] font-bold uppercase tracking-widest mb-1">Early Bird</p>
                                        <p className="text-white font-bold text-xl">{trip.earlyBird}</p>
                                    </div>
                                )}
                                {trip.price && (
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Standard</p>
                                        <p className="text-white/80 font-bold text-xl">{trip.price}</p>
                                    </div>
                                )}
                                <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                                    *30% deposit required to confirm booking
                                </p>
                                <a
                                    href={trip.bookingLink || GOOGLE_FORM_URL}
                                    target="_blank"
                                    className="inline-flex items-center justify-center gap-3 bg-primary text-brand-navy font-bold uppercase text-xs tracking-widest py-5 px-8 rounded-xl hover:bg-white hover:scale-105 transition-all w-full"
                                >
                                    Book Now <ArrowRight size={16} />
                                </a>
                            </div>
                        )}

                        {/* Trip Info Summary */}
                        <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
                            <h3 className="text-gray-400 uppercase text-[10px] font-bold tracking-widest">Trip Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Type</span>
                                    <span className="text-white font-bold">{trip.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Yacht</span>
                                    <span className="text-white font-bold">{trip.yacht}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Port</span>
                                    <span className="text-white font-bold">{trip.port}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Status</span>
                                    <span className="text-primary font-bold">{trip.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA at bottom */}
                <div className="mt-16 text-center">
                    {/* <a
                        href={trip.bookingLink || GOOGLE_FORM_URL}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-3 bg-primary text-brand-navy font-bold uppercase text-sm tracking-widest py-6 px-12 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-xl shadow-primary/20"
                    >
                        Reserve Your Spot <ArrowRight size={20} />
                    </a> */}
                    {(!trip.price && !trip.earlyBird) && (
                        <a
                            href={trip.bookingLink || GOOGLE_FORM_URL}
                            target="_blank"
                            className="inline-flex items-center justify-center gap-3 bg-primary text-brand-navy font-bold uppercase text-sm tracking-widest py-6 px-12 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-xl shadow-primary/20"
                        >
                            Book Now <ArrowRight size={20} />
                        </a>
                    )}
                </div>
            </div>

            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
};

export default TripDetailPage;
