"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[100]"
                >
                    <div className="glass-card p-6 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />

                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:rotate-12 transition-transform duration-500">
                                <Cookie size={24} />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-white font-display font-bold text-lg mb-1 italic">Cookie Policy</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        We use cookies to analyze website traffic and optimize your experience in the Red Sea. Your privacy is our priority.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        onClick={handleAccept}
                                        className="bg-primary text-brand-navy font-bold uppercase text-[10px] tracking-widest px-6 h-10 rounded-xl hover:bg-white transition-all shadow-lg shadow-primary/10"
                                    >
                                        <Check size={14} className="mr-2" />
                                        Accept All
                                    </Button>
                                    <Button
                                        onClick={handleDecline}
                                        variant="ghost"
                                        className="text-gray-500 hover:text-white font-bold uppercase text-[10px] tracking-widest px-4 h-10 rounded-xl hover:bg-white/5 transition-all"
                                    >
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
