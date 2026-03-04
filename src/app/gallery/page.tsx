"use client";

import React from 'react';
import InstagramGrid from '@/components/sections/instagram-grid';
import WaveSeparator from '@/components/ui/wave-separator';
import LiveaboardGallery from '@/components/sections/liveaboard-gallery';
import { HHI_IMAGES, HHII_IMAGES } from '@/lib/constants/galleries';

export default function GalleryPage() {
    return (
        <div className="bg-brand-navy min-h-screen pt-32 lg:pt-40">
            <div className="relative z-10">
                <LiveaboardGallery
                    id="hhi"
                    title="Hammerhead I Gallery"
                    subtitle="Explore the spacious decks and comfortable interiors of Hammerhead I, our flagship safari yacht."
                    images={HHI_IMAGES}
                    hideText={true}
                />

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent container-width" />

                <LiveaboardGallery
                    id="hhii"
                    title="Hammerhead II Gallery"
                    subtitle="Experience the modern design and premium amenities of Hammerhead II, built for the ultimate diving expedition."
                    images={HHII_IMAGES}
                    hideText={true}
                />
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
