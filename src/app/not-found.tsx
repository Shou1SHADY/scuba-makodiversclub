"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Home, Anchor } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-brand-navy flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="text-center relative z-10 max-w-2xl">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 inline-block"
                >
                    <div className="relative">
                        <h1 className="text-[12rem] md:text-[18rem] font-display font-black text-white/5 leading-none select-none">404</h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Compass size={120} className="text-primary animate-pulse" strokeWidth={1} />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                        You've drifted <span className="text-primary italic">too far</span>
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-md mx-auto">
                        The underwater cave you're looking for doesn't exist. Let's get you back to the surface.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                        <Link
                            href="/"
                            className="flex items-center gap-2 bg-primary text-brand-navy px-10 py-5 rounded-2xl font-display font-black uppercase text-xs tracking-widest hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-primary/10 w-full sm:w-auto"
                        >
                            <Home size={18} />
                            Back to Surface
                        </Link>
                        <Link
                            href="/schedule-25/26"
                            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-display font-black uppercase text-xs tracking-widest hover:bg-primary hover:text-brand-navy transition-all w-full sm:w-auto"
                        >
                            <Anchor size={18} />
                            View Schedule
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Bubbles Decoration */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [-20, -100],
                        opacity: [0, 0.4, 0],
                        scale: [1, 1.5]
                    }}
                    transition={{
                        duration: 2 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                    className="absolute rounded-full border border-white/20 pointer-events-none"
                    style={{
                        width: `${10 + (i * 5)}px`,
                        height: `${10 + (i * 5)}px`,
                        left: `${15 + (i * 15)}%`,
                        bottom: '10%'
                    }}
                />
            ))}
        </div>
    );
}
