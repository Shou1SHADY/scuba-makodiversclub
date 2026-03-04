"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Anchor, Shield, CheckCircle2 } from 'lucide-react';

interface YachtSpec {
    title: string;
    items: string[];
}

interface YachtSlide {
    id: number;
    src: string;
    alt: string;
    label: string;
    specs: YachtSpec[];
}

const yachtSlides: YachtSlide[] = [
    {
        id: 1,
        src: '/images/assets/HH%20II/16361143099d7e5465f3dd2fbb8a7002954a9aec70.jpg',
        alt: 'Hammerhead II Aerial',
        label: '4 DECKS PLUS ROOF TOP',
        specs: [
            { title: 'LOWER DECK', items: ['10 STANDARD CABINS WITH PRIVATE BATHROOM'] },
            { title: 'MAIN DECK', items: ['DIVING PLATFORM, LOUNGE, DINING, 2 PUBLIC BATHROOM'] },
            { title: 'UPPER DECK', items: ['6 DELUXE PANORAMIC VIEW CABINS WITH PRIVATE BATHROOM', '2 SUITES PANORAMIC VIEW WITH PRIVATE BATHROOM', 'OUTDOOR LOUNGE'] },
            { title: 'SUN DECK', items: ['CAPTAIN\'S STATEROOM', 'OUTDOOR LOUNGE', '1 PUBLIC BATHROOM'] },
            { title: 'FLY DECK', items: ['CHAISE LOUNGE'] }
        ]
    },
    {
        id: 2,
        src: '/images/assets/HH%20II/hhii-exteriorw857h570crwidth857crheight570.jpg',
        alt: 'Hammerhead II Exterior',
        label: 'PREMIUM SAFARI YACHT',
        specs: [
            { title: 'SPECIFICATIONS', items: ['Length: 42m', 'Width: 9.3m', 'Cruising Speed: 12 knots', 'Max Speed: 14 knots'] },
            { title: 'SAFETY', items: ['Life rafts, Jackets, Oxygen systems', 'Full fire detection & extinguishing'] }
        ]
    },
    {
        id: 3,
        src: '/images/assets/HH%20II/hhii-indoorw857h570crwidth857crheight570.jpg',
        alt: 'Hammerhead II Salon',
        label: 'LUXURY LOUNGE & DINING',
        specs: [
            { title: 'AMENITIES', items: ['Air conditioning throughout', 'Entertainment system (TV/Music)', 'Spacious dining area', 'Local and International cuisine'] }
        ]
    },
    {
        id: 4,
        src: '/images/assets/HH%20II/hhii-divedeckw857h570crwidth857crheight570.jpg',
        alt: 'Hammerhead II Dive Deck',
        label: 'BUILT FOR DIVERS',
        specs: [
            { title: 'DIVE FACILITIES', items: ['Spacious dive platform', 'Nitrox available', '36 Tank slots', 'Rinse tanks and layout for photographers'] }
        ]
    },
    {
        id: 5,
        src: '/images/assets/HH%20II/hhii-cabin.jpg',
        alt: 'Hammerhead II Cabin',
        label: 'DELUXE ACCOMMODATION',
        specs: [
            { title: 'ROOM DETAILS', items: ['En-suite bathrooms', 'Climate control', 'Storage space', 'Ocean view windows (Upper Deck)'] }
        ]
    }
];

const YachtSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % yachtSlides.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? yachtSlides.length - 1 : prev - 1));

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const activeSlide = yachtSlides[currentIndex];

    return (
        <section className="bg-brand-navy pb-32 pt-12 relative overflow-hidden">
            <div className="container-width px-6">
                <div className="flex flex-col items-center justify-center text-center mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <Anchor className="text-primary" size={20} />
                        <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold underline underline-offset-8">The Fleet Details</span>
                    </div>
                </div>

                {/* Main Slider Display */}
                <div
                    className="relative group aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/7] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-black"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={activeSlide.src}
                                alt={activeSlide.alt}
                                fill
                                className="object-cover opacity-80"
                                priority
                            />
                            {/* Gradient Overlays */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-navy/90 to-transparent" />
                            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand-navy/60 to-transparent hidden lg:block" />

                            {/* Main Content Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center lg:flex-row lg:justify-between px-8 md:px-16 lg:px-24 py-12">

                                {/* Centered Glass Card */}
                                <div className="relative mb-12 lg:mb-0">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 lg:p-16 rounded-2xl shadow-2xl max-w-sm text-center relative z-10"
                                    >
                                        <div className="h-px w-12 bg-primary/40 mx-auto mb-8" />
                                        <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-display font-medium uppercase leading-tight tracking-wider">
                                            {activeSlide.label}
                                        </h3>
                                        <div className="h-px w-12 bg-primary/40 mx-auto mt-8" />

                                        {/* Decorative Shape at bottom */}
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[25px] border-l-transparent border-t-[25px] border-t-white/10 border-r-[25px] border-r-transparent" />
                                    </motion.div>
                                </div>

                                {/* Specs List Overlay */}
                                <div className="lg:w-1/2 xl:w-2/5 space-y-8 text-left">
                                    <motion.div
                                        initial={{ x: 30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="space-y-6"
                                    >
                                        {activeSlide.specs.map((spec, i) => (
                                            <div key={i} className="space-y-2">
                                                <h4 className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                                    {spec.title}
                                                </h4>
                                                <ul className="space-y-1">
                                                    {spec.items.map((item, j) => (
                                                        <li key={j} className="text-white/80 text-sm md:text-base font-light tracking-wide flex items-start gap-2 uppercase">
                                                            <span className="text-primary opacity-50 select-none">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                            className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:text-brand-navy transition-all pointer-events-auto"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                            className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:text-brand-navy transition-all pointer-events-auto"
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="mt-8 flex justify-center gap-2 md:gap-4 px-4 overflow-x-auto no-scrollbar">
                    {yachtSlides.map((slide, index) => (
                        <button
                            key={slide.id}
                            onClick={() => setCurrentIndex(index)}
                            className={`relative min-w-[70px] md:min-w-[100px] aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${currentIndex === index ? 'border-primary scale-110 z-10' : 'border-white/10 opacity-60 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                fill
                                className="object-cover"
                            />
                            {currentIndex === index && (
                                <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default YachtSlider;
