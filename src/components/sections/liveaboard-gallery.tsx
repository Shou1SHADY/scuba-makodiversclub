"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const images = [
    // Using reliable placeholder images that fit the scuba/yacht vibe closely.
    // We can easily substitute these with exact user-uploaded images later.
    { src: '/images/assets/gallery-8.jpg', alt: 'Liveaboard Yacht Exterior' },
    { src: '/images/assets/gallery-7.jpg', alt: 'Diving Preparation Area' },
    { src: '/images/assets/gallery-6.jpg', alt: 'Sunrise from Yacht Deck' },
    { src: '/images/assets/gallery-5.jpg', alt: 'Yacht Dining Area' },
    { src: '/images/assets/gallery-4.jpg', alt: 'Luxury Cabin Interior' },
    { src: '/images/assets/gallery-3.jpg', alt: 'Sun Deck and Lounge' },
    { src: '/images/assets/gallery-2.jpg', alt: 'Dive Briefing Room' },
    { src: '/images/assets/gallery-1.jpg', alt: 'Ocean View from Bow' }
];

const LiveaboardGallery = () => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <section className="bg-brand-navy py-24 md:py-32 relative">
            <div className="container-width px-6">
                <div className="flex flex-col items-center justify-center text-center mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <Camera className="text-primary" size={20} />
                        <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold">The Fleet</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        Liveaboard <span className="text-primary italic">Gallery</span>
                    </h2>
                    <p className="mt-6 text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
                        Take a look inside our premium safari yachts. Designed specifically for divers, offering comfort, safety, and a touch of luxury on the Red Sea.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="group relative aspect-square overflow-hidden rounded-2xl bg-white/5 cursor-pointer border border-white/5 hover:border-primary/40 transition-all duration-500 shadow-xl"
                            onClick={() => setSelectedImage(index)}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-primary">
                                    <span className="font-display font-medium text-lg uppercase tracking-widest">{img.alt}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/95 backdrop-blur-md p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 lg:top-10 lg:right-10 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-primary hover:text-brand-navy transition-all duration-300 border border-white/20"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={images[selectedImage].src}
                                alt={images[selectedImage].alt}
                                fill
                                className="object-cover"
                                quality={100}
                            />
                        </motion.div>
                        <div className="absolute bottom-8 left-0 w-full text-center">
                            <p className="text-white font-display text-xl uppercase tracking-widest font-medium drop-shadow-md">
                                {images[selectedImage].alt}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LiveaboardGallery;
