"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";

const WhatsAppFloat = () => {
    const pathname = usePathname();

    if (pathname?.startsWith('/admin')) return null;

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 left-6 z-[100]"
        >
            <a
                href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block group"
            >
                {/* Pulsing ring */}
                <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />

                {/* Button body */}
                <div className="relative w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20 transition-transform duration-300">
                    <MessageCircle size={28} fill="currentColor" className="opacity-90" />
                </div>

                {/* Tooltip */}
                <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-4 group-hover:translate-x-0">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl whitespace-nowrap">
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">Chat with an Instructor</span>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

export default WhatsAppFloat;
