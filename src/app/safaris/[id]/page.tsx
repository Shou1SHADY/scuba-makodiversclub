"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, Anchor, CheckCircle2, Clock, MapPin, ArrowRight, Check, X, Info, DollarSign, Loader2, Camera, Ship, ChevronLeft, ChevronRight, X as XIcon } from 'lucide-react';
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
    const [galleryIndex, setGalleryIndex] = useState(-1);
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

    useEffect(() => {
        if (galleryIndex >= 0) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [galleryIndex]);

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
            <div className="relative pt-24 md:pt-40 pb-12 md:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-brand-navy z-0" />
                <div className="container-width px-4 md:px-6 relative z-10 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <a href="/schedule-25/26" className="text-gray-400 hover:text-primary transition-colors text-xs md:text-sm flex items-center gap-1">
                            <ChevronLeft size={16} /> Back to Schedule
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
                        <span className="bg-primary text-brand-navy text-[9px] md:text-[10px] uppercase font-bold px-2 py-1 rounded-md tracking-widest">
                            {trip.type}
                        </span>
                        <span className="text-gray-400 text-xs md:text-sm flex items-center gap-1.5">
                            <MapPin size={14} className="text-primary" /> {trip.port}
                        </span>
                        <span className="text-gray-400 text-xs md:text-sm flex items-center gap-1.5">
                            <Anchor size={14} className="text-primary" /> {trip.yacht}
                        </span>
                    </div>
                    <h1 className="text-white text-2xl sm:text-3xl md:text-6xl font-display font-medium mb-3 md:mb-4 leading-tight">
                        {trip.title}
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg font-medium italic mb-6">{trip.dates}</p>
                    <div className="flex items-center gap-3 text-primary font-bold uppercase text-[10px] md:text-xs tracking-widest">
                        <Clock size={14} />
                        <span>{trip.status}</span>
                    </div>
                </div>
            </div>

            {/* Image Gallery */}
            {hasGallery && (
                <div className="container-width px-4 md:px-6 pb-12 md:pb-16 relative z-10 max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="flex items-center gap-2 text-primary uppercase text-xs font-bold tracking-widest">
                            <Camera size={16} /> Gallery
                        </h3>
                        <span className="text-gray-500 text-xs">{images.length} photos</span>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 md:gap-3">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setGalleryIndex(i)}
                                className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden border border-white/5 group hover:border-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                aria-label={`View image ${i + 1}`}
                            >
                                <img
                                    src={img}
                                    alt={`${trip.title} — photo ${i + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </button>
                        ))}
                    </div>

                    {/* Lightbox Overlay */}
                    {galleryIndex >= 0 && (
                        <div
                            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm overflow-hidden touch-none"
                            onClick={() => setGalleryIndex(-1)}
                        >
                            <button
                                onClick={() => setGalleryIndex(-1)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                                aria-label="Close gallery"
                            >
                                <XIcon size={20} />
                            </button>

                            <button
                                onClick={e => { e.stopPropagation(); setGalleryIndex(i => (i === 0 ? images.length - 1 : i - 1)); }}
                                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <button
                                onClick={e => { e.stopPropagation(); setGalleryIndex(i => (i === images.length - 1 ? 0 : i + 1)); }}
                                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10"
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>

                            <div
                                className="absolute inset-0 flex items-center justify-center px-12 md:px-24"
                                onClick={e => e.stopPropagation()}
                            >
                                <img
                                    src={images[galleryIndex]}
                                    alt={`${trip.title} — photo ${galleryIndex + 1}`}
                                    className="max-w-full max-h-full object-contain rounded-xl select-none pointer-events-none"
                                />
                            </div>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={e => { e.stopPropagation(); setGalleryIndex(i); }}
                                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${i === galleryIndex ? 'bg-primary scale-125' : 'bg-white/40 hover:bg-white/60'}`}
                                        aria-label={`Go to image ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <div className="absolute top-4 md:top-6 left-4 md:left-6 text-white/60 text-sm font-medium">
                                {galleryIndex + 1} / {images.length}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="container-width px-4 md:px-6 pb-24 relative z-10 max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6 md:space-y-10">
                        {/* Route */}
                        {trip.route && (
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-4">
                                <h3 className="flex items-center gap-2 text-primary uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <Info size={16} /> Route & Summary
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed">{trip.route}</p>
                            </div>
                        )}

                        {/* Itinerary */}
                        {trip.itinerary && trip.itinerary.length > 0 && trip.itinerary.some(d => d.activities.some(a => a.trim() !== "")) && (
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-6">
                                <h3 className="flex items-center gap-2 text-primary uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <Calendar size={16} /> Detailed Itinerary
                                </h3>
                                <div className="space-y-4">
                                    {trip.itinerary.map((day, idx) => (
                                        day.activities.filter(a => a.trim() !== "").length > 0 && (
                                            <div key={idx} className="relative pl-6 border-l border-white/10">
                                                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-primary" />
                                                {day.day && <p className="text-white text-sm font-bold mb-1">{day.day}</p>}
                                                <ul className="text-gray-400 text-xs md:text-sm space-y-1">
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
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-5 md:space-y-6">
                                <h3 className="flex items-center gap-2 text-emerald-400 uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <Check size={16} /> What's Included
                                </h3>
                                <ul className="space-y-2 md:space-y-3">
                                    {trip.included.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-300 text-xs md:text-sm leading-relaxed">
                                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Not Included */}
                        {trip.notIncluded && trip.notIncluded.length > 0 && (
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-5 md:space-y-6">
                                <h3 className="flex items-center gap-2 text-rose-400 uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <X size={16} /> Not Included
                                </h3>
                                <ul className="space-y-2 md:space-y-3">
                                    {trip.notIncluded.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-500 text-xs md:text-sm">
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
                                    <div key={idx} className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-5 md:space-y-6">
                                        <h3 className="flex items-center gap-2 text-primary uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                            <Ship size={16} /> {section.header}
                                        </h3>
                                        <ul className="space-y-2 md:space-y-3">
                                            {section.items.filter(i => i.trim() !== "").map((item, i) => (
                                                <li key={i} className="flex gap-3 text-gray-300 text-xs md:text-sm leading-relaxed">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
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
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-4 md:sticky md:top-24">
                                <h3 className="flex items-center gap-2 text-primary uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <DollarSign size={16} /> Pricing
                                </h3>
                                {trip.earlyBird && (
                                    <div className="p-3 md:p-4 rounded-xl bg-primary/10 border border-primary/20">
                                        <p className="text-primary/60 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1">Early Bird</p>
                                        <p className="text-white font-bold text-lg md:text-xl">{trip.earlyBird}</p>
                                    </div>
                                )}
                                {trip.price && (
                                    <div className="p-3 md:p-4 rounded-xl bg-white/5 border border-white/5">
                                        <p className="text-gray-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1">Standard</p>
                                        <p className="text-white/80 font-bold text-lg md:text-xl">{trip.price}</p>
                                    </div>
                                )}
                                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-tighter">
                                    *30% deposit required to confirm booking
                                </p>
                                <a
                                    href={trip.bookingLink || GOOGLE_FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 bg-primary text-brand-navy font-bold uppercase text-xs tracking-widest py-4 md:py-5 px-6 md:px-8 rounded-xl hover:bg-white hover:scale-105 transition-all w-full"
                                >
                                    Book Now <ArrowRight size={16} />
                                </a>
                            </div>
                        )}

                        {/* Trip Info Summary */}
                        <div className="glass-card rounded-2xl p-5 md:p-6 border border-white/5 space-y-4">
                            <h3 className="text-gray-400 uppercase text-[9px] md:text-[10px] font-bold tracking-widest">Trip Summary</h3>
                            <div className="space-y-3 text-xs md:text-sm">
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
                <div className="mt-12 md:mt-16 text-center px-4">
                    {(!trip.price && !trip.earlyBird) && (
                        <a
                            href={trip.bookingLink || GOOGLE_FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-primary text-brand-navy font-bold uppercase text-xs md:text-sm tracking-widest py-5 md:py-6 px-10 md:px-12 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-xl shadow-primary/20"
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
