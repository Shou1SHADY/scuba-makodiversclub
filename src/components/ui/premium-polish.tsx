"use client";

import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "opacity" }}
        >
            {children}
        </motion.div>
    );
};

export const ScrollProgress = () => {
    const pathname = usePathname();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    if (pathname?.startsWith('/admin')) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[70] origin-left shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            style={{ scaleX }}
        />
    );
};

export const CustomCursor = () => {
    const pathname = usePathname();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cursorSize = useMotionValue(20);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    if (pathname?.startsWith('/admin')) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[100] hidden lg:block transition-all duration-150 ease-out"
            style={{
                x: mouseX,
                y: mouseY,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <div className="absolute inset-0 w-1.5 h-1.5 bg-primary rounded-full m-auto" />
        </motion.div>
    );
};

export const BackToTop = () => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let ticking = false;
        const toggleVisibility = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.pageYOffset > 500) {
                        setIsVisible(true);
                    } else {
                        setIsVisible(false);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if (pathname?.startsWith('/admin')) return null;

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.5,
                y: isVisible ? 0 : 20
            }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-2xl bg-primary text-brand-navy shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer ${!isVisible && 'pointer-events-none'}`}
        >
            <ArrowUp size={24} strokeWidth={3} />
        </motion.button>
    );
};
