"use client";

import React from 'react';
import InstagramGrid from '@/components/sections/instagram-grid';
import WaveSeparator from '@/components/ui/wave-separator';

export default function GalleryPage() {
    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Page Header Section */}
            <div className="relative pt-40 pb-12 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-brand-navy/50 to-brand-navy z-0" />

                <div className="container-width px-6 relative z-10 text-center">
                    <h1 className="text-white text-5xl md:text-6xl font-display font-medium mb-6">Diving <span className="text-primary">Gallery</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Explore the beauty of the Red Sea through the eyes of our divers. Capturing moments of underwater magic across Egypt.
                    </p>
                </div>
            </div>

            <div className="pb-24 relative z-10">
                <InstagramGrid />
            </div>

            {/* Wave Separator before Footer */}
            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
}
