"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Calendar, MapPin, CheckCircle2, Zap, CalendarDays, ArrowRight, Check, X, Info, DollarSign, Loader2, Camera, Waves, ChevronLeft, ChevronRight, X as XIcon, Star } from 'lucide-react';
import { GOOGLE_FORM_URL } from '@/lib/config';
import WaveSeparator from '@/components/ui/wave-separator';
import { createClient } from '@/lib/supabase/client';

interface CustomDetailSection {
    header: string;
    items: string[];
}

interface ItineraryDay {
    day: string;
    activities: string[];
}

interface Package {
    id: string;
    city: string;
    details: string;
    duration: string;
    description: string;
    long_description?: string;
    price?: string;
    highlights: string[];
    dates: string[];
    featured: boolean;
    accent: string;
    image: string;
    itinerary: ItineraryDay[];
    included: string[];
    notIncluded: string[];
    images: string[];
    customDetails: CustomDetailSection[];
}

const PackageDetailPage = () => {
    const params = useParams();
    const id = params.id as string;
    const [pkg, setPkg] = useState<Package | null>(null);
    const [loading, setLoading] = useState(true);
    const [galleryIndex, setGalleryIndex] = useState(-1);
    const supabase = createClient();

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const { data } = await supabase
                    .from('packages')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (data) {
                    setPkg({
                        ...data,
                        notIncluded: data.notIncluded || data.not_included || [],
                        itinerary: data.itinerary || [],
                        included: data.included || [],
                        images: data.images || [],
                        customDetails: data.customDetails || [],
                        highlights: data.highlights || [],
                        dates: data.dates || [],
                    } as Package);
                }
            } catch (e) {
                // package not found
            } finally {
                setLoading(false);
            }
        };
        fetchPackage();
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

    if (!pkg) {
        return (
            <div className="bg-brand-navy min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-2">
                    <MapPin className="w-10 h-10 text-gray-700" />
                </div>
                <h1 className="text-white text-2xl font-display font-black uppercase tracking-widest">Package Not Found</h1>
                <p className="text-gray-500 text-sm">The package you're looking for doesn't exist or has been removed.</p>
                <a href="/packages" className="inline-flex items-center gap-2 bg-primary text-brand-navy font-bold uppercase text-xs tracking-widest py-4 px-8 rounded-xl hover:bg-white transition-all">
                    View All Packages <ArrowRight size={16} />
                </a>
            </div>
        );
    }

    const images = (pkg.images && pkg.images.length > 0)
        ? pkg.images
        : (pkg.image ? [pkg.image] : []);
    const hasGallery = images.length > 0;

    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Hero */}
            <div className="relative pt-24 md:pt-40 pb-12 md:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-brand-navy z-0" />
                <div className="container-width px-4 md:px-6 relative z-10 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <a href="/packages" className="text-gray-400 hover:text-primary transition-colors text-xs md:text-sm flex items-center gap-1">
                            <ChevronLeft size={16} /> Back to Packages
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
                        {pkg.featured && (
                            <span className="bg-primary text-brand-navy text-[9px] md:text-[10px] uppercase font-bold px-2 py-1 rounded-md tracking-widest flex items-center gap-1">
                                <Star size={11} /> Most Popular
                            </span>
                        )}
                        {pkg.details && (
                            <span className="text-gray-400 text-xs md:text-sm flex items-center gap-1.5">
                                <MapPin size={14} className="text-primary" /> {pkg.details}
                            </span>
                        )}
                        {pkg.duration && (
                            <span className="text-gray-400 text-xs md:text-sm flex items-center gap-1.5">
                                <Zap size={14} className="text-primary" /> {pkg.duration}
                            </span>
                        )}
                    </div>
                    <h1 className="text-white text-2xl sm:text-3xl md:text-6xl font-display font-medium mb-3 md:mb-4 leading-tight">
                        {pkg.city}
                    </h1>
                    {pkg.description && (
                        <p className="text-gray-400 text-base md:text-lg font-medium italic mb-6">"{pkg.description}"</p>
                    )}
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
                                    alt={`${pkg.city} — photo ${i + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </button>
                        ))}
                    </div>

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
                                    alt={`${pkg.city} — photo ${galleryIndex + 1}`}
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
                        {/* Overview */}
                        {pkg.long_description && (
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-4">
                                <h3 className="flex items-center gap-2 text-primary uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <Info size={16} /> Overview
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line">{pkg.long_description}</p>
                            </div>
                        )}

                        {/* Highlights */}
                        {pkg.highlights && pkg.highlights.length > 0 && (
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-5 md:space-y-6">
                                <h3 className="flex items-center gap-2 text-primary uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <Waves size={16} /> Package Highlights
                                </h3>
                                <ul className="space-y-2 md:space-y-3">
                                    {pkg.highlights.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-300 text-xs md:text-sm leading-relaxed">
                                            <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Itinerary */}
                        {pkg.itinerary && pkg.itinerary.length > 0 && pkg.itinerary.some(d => d.activities.some(a => a.trim() !== "")) && (
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-6">
                                <h3 className="flex items-center gap-2 text-primary uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <Calendar size={16} /> Detailed Itinerary
                                </h3>
                                <div className="space-y-4">
                                    {pkg.itinerary.map((day, idx) => (
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
                        {pkg.included && pkg.included.length > 0 && (
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-5 md:space-y-6">
                                <h3 className="flex items-center gap-2 text-emerald-400 uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <Check size={16} /> What's Included
                                </h3>
                                <ul className="space-y-2 md:space-y-3">
                                    {pkg.included.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-300 text-xs md:text-sm leading-relaxed">
                                            <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Not Included */}
                        {pkg.notIncluded && pkg.notIncluded.length > 0 && (
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-5 md:space-y-6">
                                <h3 className="flex items-center gap-2 text-rose-400 uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <X size={16} /> Not Included
                                </h3>
                                <ul className="space-y-2 md:space-y-3">
                                    {pkg.notIncluded.map((item, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-500 text-xs md:text-sm">
                                            <X size={14} className="text-rose-500/50 mt-0.5 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Custom Detail Sections */}
                        {pkg.customDetails && pkg.customDetails.length > 0 && pkg.customDetails.filter(s => s.header.trim() !== "" && s.items.some(i => i.trim() !== "")).length > 0 && (
                            <div className="space-y-6">
                                {pkg.customDetails.filter(s => s.header.trim() !== "" && s.items.some(i => i.trim() !== "")).map((section, idx) => (
                                    <div key={idx} className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-5 md:space-y-6">
                                        <h3 className="flex items-center gap-2 text-primary uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                            <MapPin size={16} /> {section.header}
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

                        {/* Departure Dates */}
                        {pkg.dates && pkg.dates.length > 0 && (
                            <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-5">
                                <h3 className="flex items-center gap-2 text-primary uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                    <CalendarDays size={16} /> 2026 Departures
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {pkg.dates.map((date, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center gap-1.5 text-white/80 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg"
                                        >
                                            {date}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Pricing / Booking Card */}
                        <div className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 space-y-4 md:sticky md:top-24">
                            {pkg.price && (
                                <>
                                    <h3 className="flex items-center gap-2 text-primary uppercase text-[10px] md:text-xs font-bold tracking-widest">
                                        <DollarSign size={16} /> Pricing
                                    </h3>
                                    <div className="p-3 md:p-4 rounded-xl bg-primary/10 border border-primary/20">
                                        <p className="text-primary/60 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-1">From</p>
                                        <p className="text-white font-bold text-lg md:text-xl">{pkg.price}</p>
                                    </div>
                                </>
                            )}
                            <a
                                href={GOOGLE_FORM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 bg-primary text-brand-navy font-bold uppercase text-xs tracking-widest py-4 md:py-5 px-6 md:px-8 rounded-xl hover:bg-white hover:scale-105 transition-all w-full"
                            >
                                Reserve My Spot <ArrowRight size={16} />
                            </a>
                        </div>

                        {/* Package Info Summary */}
                        <div className="glass-card rounded-2xl p-5 md:p-6 border border-white/5 space-y-4">
                            <h3 className="text-gray-400 uppercase text-[9px] md:text-[10px] font-bold tracking-widest">Package Summary</h3>
                            <div className="space-y-3 text-xs md:text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Destination</span>
                                    <span className="text-white font-bold">{pkg.city}</span>
                                </div>
                                {pkg.duration && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Duration</span>
                                        <span className="text-white font-bold">{pkg.duration}</span>
                                    </div>
                                )}
                                {pkg.dates && pkg.dates.length > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Departures</span>
                                        <span className="text-primary font-bold">{pkg.dates.length} dates</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
};

export default PackageDetailPage;
