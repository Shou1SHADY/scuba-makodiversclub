'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import WaveSeparator from '../ui/wave-separator';
import Image from 'next/image';

interface PreFooterProps {
    title?: string;
    description?: string;
    cta?: string;
}

const PreFooter = ({
    title = "Ready to Begin Your Adventure?",
    description = "Join Mako Divers for an unforgettable journey into the heart of the Red Sea. Your underwater story starts here.",
    cta = "Start Your Journey"
}: PreFooterProps) => {
    // Using a realistic adventure picture from the project assets
    const adventureBg = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/1479db51-429d-4638-bf47-6397121cd7e0-makodivers-club/assets/images/images_2.png";

    return (
        <section className="relative py-24 md:py-40 flex items-center justify-center overflow-hidden bg-brand-navy">
            {/* Background Image with Fixed/Parallax feel */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={adventureBg}
                    alt="Mako Divers Adventure"
                    fill
                    sizes="100vw"
                    quality={85}
                    className="object-cover opacity-30 scale-105 animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/80" />
            </div>

            {/* Top Wave: Transitions from the previous section (brand-navy) */}
            <WaveSeparator position="top" color="text-brand-navy" flip />

            <div className="relative z-10 container-width px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 uppercase tracking-widest drop-shadow-2xl">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed font-body">
                        {description}
                    </p>
                    <Link
                        href="/contact"
                        className="group relative inline-block bg-primary text-brand-navy hover:text-white px-12 py-5 font-bold uppercase tracking-widest transition-all rounded-sm shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-1 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-brand-navy translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10">{cta}</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default PreFooter;
