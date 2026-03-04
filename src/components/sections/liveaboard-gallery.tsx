import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Camera, X, ChevronLeft, ChevronRight, Anchor } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface YachtSpec {
    title: string;
    items: string[];
}

interface GalleryImage {
    src: string;
    alt: string;
    label?: string;
    specs?: YachtSpec[];
}

interface LiveaboardGalleryProps {
    title?: string;
    subtitle?: string;
    images?: GalleryImage[];
    id?: string;
    hideText?: boolean;
    layout?: 'grid' | 'slider';
    disableLightbox?: boolean;
    showHeader?: boolean;
}

const IMAGES_PER_PAGE = 10;
const SLIDE_TRANSITION = { duration: 0.4, ease: "easeOut" };

const defaultImages: GalleryImage[] = [
    { src: '/images/assets/gallery-8.jpg', alt: 'Liveaboard Yacht Exterior' },
    { src: '/images/assets/gallery-7.jpg', alt: 'Diving Preparation Area' },
    { src: '/images/assets/gallery-6.jpg', alt: 'Sunrise from Yacht Deck' },
    { src: '/images/assets/gallery-5.jpg', alt: 'Yacht Dining Area' },
    { src: '/images/assets/gallery-4.jpg', alt: 'Luxury Cabin Interior' },
    { src: '/images/assets/gallery-3.jpg', alt: 'Sun Deck and Lounge' },
    { src: '/images/assets/gallery-2.jpg', alt: 'Dive Briefing Room' },
    { src: '/images/assets/gallery-1.jpg', alt: 'Ocean View from Bow' }
];

const LiveaboardGallery = ({
    title = "Liveaboard Gallery",
    subtitle = "Take a look inside our premium safari yachts. Designed specifically for divers, offering comfort, safety, and a touch of luxury on the Red Sea.",
    images = defaultImages,
    id,
    hideText = false,
    layout = 'grid',
    disableLightbox = false,
    showHeader = true
}: LiveaboardGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const thumbnailRef = useRef<HTMLDivElement>(null);
    const sliderThumbRef = useRef<HTMLDivElement>(null);

    const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
    const currentGridImages = images.slice(currentPage * IMAGES_PER_PAGE, (currentPage + 1) * IMAGES_PER_PAGE);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((prev) => (prev === images.length - 1 ? 0 : (prev ?? 0) + 1));
        }
    }, [selectedImage, images.length]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((prev) => (prev === 0 ? images.length - 1 : (prev ?? 0) - 1));
        }
    }, [selectedImage, images.length]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') setSelectedImage(null);
        };

        if (selectedImage !== null) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            document.body.classList.add('gallery-open');

            if (thumbnailRef.current) {
                const activeThumb = thumbnailRef.current.children[selectedImage] as HTMLElement;
                if (activeThumb) {
                    activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.classList.remove('gallery-open');
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.classList.remove('gallery-open');
        };
    }, [selectedImage, handleNext, handlePrev, images.length]);

    const currentImage = selectedImage !== null ? images[selectedImage] : null;

    return (
        <section id={id} className={`bg-brand-navy relative ${showHeader ? 'py-12 md:py-20' : 'pb-12 md:pb-20'}`}>
            <div className="container-width px-6">
                {showHeader && (
                    <div className="flex flex-col items-center justify-center text-center mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Camera className="text-primary" size={18} />
                            <span className="text-primary text-[10px] uppercase font-bold tracking-[0.3em]">The Fleet</span>
                        </div>
                        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            {title.split(' ').map((word, i) => (
                                word.toLowerCase() === 'gallery' ? (
                                    <span key={i} className="text-primary italic"> {word}</span>
                                ) : (
                                    <span key={i}> {word}</span>
                                )
                            ))}
                        </h2>
                        {subtitle && (
                            <p className="mt-6 text-gray-400 max-w-2xl text-base md:text-lg font-light leading-relaxed">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {/* Gallery Grid or Slider */}
                <div className="space-y-10">
                    {layout === 'grid' ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
                            <AnimatePresence mode="popLayout">
                                {currentGridImages.map((img, index) => {
                                    const realIndex = currentPage * IMAGES_PER_PAGE + index;
                                    return (
                                        <motion.div
                                            key={img.src}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            className="group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl bg-white/5 cursor-pointer border border-white/5 hover:border-primary/40 transition-all duration-500 shadow-xl"
                                            onClick={() => setSelectedImage(realIndex)}
                                        >
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                fill
                                                sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 20vw, 15vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                            />

                                            {/* Accurate Hover Title - Clean Glassmorphism */}
                                            {!hideText && (
                                                <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <div className="bg-brand-navy/60 backdrop-blur-md p-3 md:p-4 border-t border-primary/20">
                                                        <p className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest text-center leading-tight">
                                                            {img.alt}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    ) : (
                        /* Professional In-Page Slider UI matching screenshot precisely */
                        <div className="relative group/slider">
                            <div className="flex flex-col gap-8">
                                {/* Main Carousel Display */}
                                <div className="relative h-[300px] md:h-[500px] lg:h-[650px] w-full flex items-center justify-center gap-4 overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem]">

                                    {/* Neighbor Prev (Peek) */}
                                    <div
                                        className="absolute left-0 w-24 md:w-48 lg:w-64 h-[80%] scale-90 opacity-20 blur-[1px] cursor-pointer z-0 hidden sm:block transform -translate-x-1/2"
                                        onClick={() => setSliderIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                    >
                                        <Image
                                            src={images[sliderIndex === 0 ? images.length - 1 : sliderIndex - 1].src}
                                            alt="Previous"
                                            fill
                                            sizes="(max-width: 1024px) 20vw, 300px"
                                            className="object-cover rounded-2xl md:rounded-3xl"
                                        />
                                    </div>

                                    {/* Main Center Slide */}
                                    <div className="relative h-full w-full sm:w-[90%] lg:w-[80%] z-10 shadow-2xl overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-white/5 bg-black">
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            <motion.div
                                                key={sliderIndex}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={SLIDE_TRANSITION as any}
                                                className="absolute inset-0"
                                                onClick={() => !disableLightbox && setSelectedImage(sliderIndex)}
                                            >
                                                <Image
                                                    src={images[sliderIndex].src}
                                                    alt={images[sliderIndex].alt}
                                                    fill
                                                    sizes="(max-width: 1024px) 100vw, 1440px"
                                                    className="object-cover cursor-pointer opacity-90"
                                                    quality={90}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-brand-navy/20 pointer-events-none" />

                                                {/* Text Overlay matching screenshot */}
                                                {!hideText && (
                                                    <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between p-6 md:p-12 lg:p-20 lg:px-24">
                                                        {/* White/Glass Flag Banner */}
                                                        <motion.div
                                                            initial={{ y: 20, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            transition={{ delay: 0.4 }}
                                                            className="relative bg-white/10 backdrop-blur-md border border-white/20 px-6 py-8 md:px-12 md:py-20 shadow-2xl rounded-2xl max-w-[260px] md:max-w-sm text-center mb-0"
                                                        >
                                                            <div className="h-px w-6 md:w-10 bg-primary/40 mx-auto mb-6 md:mb-8" />
                                                            <h3 className="text-white text-xl md:text-4xl lg:text-5xl font-display font-medium uppercase leading-tight tracking-[0.05em]">
                                                                {images[sliderIndex].label || "4 DECKS PLUS ROOF TOP"}
                                                            </h3>
                                                            <div className="h-px w-6 md:w-10 bg-primary/40 mx-auto mt-6 md:mt-8" />
                                                            <div className="absolute -bottom-4 md:-bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-white/10 border-r-[15px] border-r-transparent" />
                                                        </motion.div>

                                                        {/* Specs List on the right */}
                                                        <motion.div
                                                            initial={{ x: 30, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: 0.5 }}
                                                            className="hidden md:flex flex-col gap-6 lg:gap-8 max-w-md text-left"
                                                        >
                                                            {(images[sliderIndex].specs || [
                                                                { title: "LOWER DECK", items: ["10 STANDARD CABINS WITH PRIVATE BATHROOM"] },
                                                                { title: "MAIN DECK", items: ["DIVING PLATFORM, LOUNGE, DINING, 2 PUBLIC BATHROOM"] },
                                                                { title: "UPPER DECK", items: ["6 DELUXE PANORAMIC VIEW CABINS", "2 SUITES PANORAMIC VIEW", "OUTDOOR LOUNGE"] }
                                                            ]).map((spec, i) => (
                                                                <div key={i} className="space-y-1">
                                                                    <h4 className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                                                                        <div className="w-1 h-1 bg-primary rounded-full transition-all" />
                                                                        {spec.title}
                                                                    </h4>
                                                                    <ul className="space-y-1">
                                                                        {spec.items.map((item, j) => (
                                                                            <li key={j} className="text-white/90 font-light text-sm md:text-base tracking-wide uppercase flex items-start gap-2">
                                                                                <span className="text-primary opacity-40">•</span>
                                                                                {item}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </motion.div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Main Arrows */}
                                        <button
                                            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md text-white flex items-center justify-center hover:bg-primary hover:text-brand-navy transition-all z-20 border border-white/10 flex-shrink-0"
                                            onClick={(e) => { e.stopPropagation(); setSliderIndex(prev => prev === 0 ? images.length - 1 : prev - 1); }}
                                        >
                                            <ChevronLeft size={24} className="md:w-8 md:h-8" />
                                        </button>
                                        <button
                                            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-md text-white flex items-center justify-center hover:bg-primary hover:text-brand-navy transition-all z-20 border border-white/10 flex-shrink-0"
                                            onClick={(e) => { e.stopPropagation(); setSliderIndex(prev => (prev + 1) % images.length); }}
                                        >
                                            <ChevronRight size={24} className="md:w-8 md:h-8" />
                                        </button>
                                    </div>

                                    {/* Neighbor Next (Peek) */}
                                    <div
                                        className="absolute right-0 w-24 md:w-48 lg:w-64 h-[80%] scale-90 opacity-20 blur-[1px] cursor-pointer z-0 hidden sm:block transform translate-x-1/2"
                                        onClick={() => setSliderIndex(prev => (prev + 1) % images.length)}
                                    >
                                        <Image
                                            src={images[(sliderIndex + 1) % images.length].src}
                                            alt="Next"
                                            fill
                                            className="object-cover rounded-3xl"
                                        />
                                    </div>
                                </div>

                                {/* Thumbnail Navigation - Non-scrollable wrapping grid */}
                                <div
                                    ref={sliderThumbRef}
                                    className="mt-4 flex flex-wrap justify-center gap-2 md:gap-3 px-2 pb-4 scroll-smooth"
                                >
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setSliderIndex(idx);
                                                const thumb = sliderThumbRef.current?.children[idx] as HTMLElement;
                                                thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                                            }}
                                            className={`relative min-w-[70px] md:min-w-[110px] aspect-video rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${sliderIndex === idx ? 'border-primary scale-110 z-10 shadow-lg' : 'border-white/10 opacity-50 hover:opacity-100'
                                                }`}
                                        >
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                fill
                                                className="object-cover"
                                                sizes="120px"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Grid Pagination - Only for grid layout */}
                    {layout === 'grid' && totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 md:gap-8 mt-12">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                disabled={currentPage === 0}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center transition-all ${currentPage === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-primary hover:text-brand-navy hover:border-primary text-white'
                                    }`}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <div className="flex items-center gap-2 md:gap-3">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === i ? 'bg-primary w-6 md:w-8' : 'bg-white/20 hover:bg-white/40'
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                disabled={currentPage === totalPages - 1}
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center transition-all ${currentPage === totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-primary hover:text-brand-navy hover:border-primary text-white'
                                    }`}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox / Slider */}
            <AnimatePresence>
                {selectedImage !== null && currentImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex flex-col bg-brand-navy select-none overflow-hidden"
                    >
                        {/* Header - Transparent and clean to prevent overlap */}
                        <div className="relative w-full px-6 md:px-12 py-6 md:py-8 flex items-center justify-end z-[10000]">
                            <button
                                className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-primary hover:text-brand-navy transition-all duration-300 border border-white/10 backdrop-blur-sm"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Main Image View */}
                        <div className="flex-1 relative flex items-center justify-center p-2 md:p-6 lg:p-8 overflow-hidden bg-black/20" onClick={() => setSelectedImage(null)}>
                            <div className="relative w-full h-full max-w-7xl flex items-center justify-center group/main" onClick={(e) => e.stopPropagation()}>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.02 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/5"
                                    >
                                        <Image
                                            src={currentImage.src}
                                            alt={currentImage.alt}
                                            fill
                                            sizes="(max-width: 1280px) 100vw, 1280px"
                                            className="object-contain bg-black/40"
                                            quality={90}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-brand-navy/40" />

                                        {/* Banner Title */}
                                        {!hideText && (
                                            <div className="absolute bottom-12 md:bottom-24 left-6 md:left-12 lg:left-24 z-20">
                                                <motion.div
                                                    initial={{ x: -20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                    className="relative"
                                                >
                                                    <div className="bg-white px-6 md:px-10 lg:px-12 py-8 md:py-12 shadow-2xl relative">
                                                        <div className="h-px w-8 bg-brand-navy/20 mx-auto mb-6" />
                                                        <h3 className="text-brand-navy text-2xl md:text-4xl lg:text-5xl font-display font-medium uppercase leading-tight tracking-[0.05em] text-center whitespace-nowrap">
                                                            {currentImage.label || currentImage.alt || "YACHT VIEW"}
                                                        </h3>
                                                        <div className="h-px w-8 bg-brand-navy/20 mx-auto mt-6" />
                                                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-white border-r-[20px] border-r-transparent" />
                                                    </div>
                                                </motion.div>
                                            </div>
                                        )}

                                        {/* Specs */}
                                        {currentImage.specs && !hideText && (
                                            <div className="absolute inset-y-0 right-0 w-full md:w-1/2 lg:w-2/5 p-6 md:p-12 lg:p-20 flex flex-col justify-center gap-6 md:gap-8 bg-gradient-to-l from-brand-navy/80 to-transparent pointer-events-none hidden md:flex">
                                                <motion.div
                                                    initial={{ x: 20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                    className="space-y-6 md:space-y-8"
                                                >
                                                    {currentImage.specs.map((spec, i) => (
                                                        <div key={i} className="space-y-2 md:space-y-3">
                                                            <h4 className="text-primary text-[10px] md:text-xs font-black tracking-[0.3em] uppercase flex items-center gap-3">
                                                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                                                {spec.title}
                                                            </h4>
                                                            <ul className="space-y-1.5 md:space-y-2">
                                                                {spec.items.map((item, j) => (
                                                                    <li key={j} className="text-white/90 text-xs md:text-sm font-light tracking-[0.1em] flex items-start gap-2 uppercase leading-relaxed">
                                                                        <span className="text-primary opacity-50">•</span>
                                                                        {item}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Controls */}
                                <button
                                    className="absolute left-0 md:left-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-primary hover:text-brand-navy transition-all duration-300 border border-white/10 z-[210] backdrop-blur-sm opacity-0 group-hover/main:opacity-100"
                                    onClick={handlePrev}
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <button
                                    className="absolute right-0 md:right-4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-primary hover:text-brand-navy transition-all duration-300 border border-white/10 z-[210] backdrop-blur-sm opacity-0 group-hover/main:opacity-100"
                                    onClick={handleNext}
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="h-28 md:h-32 bg-brand-navy/90 border-t border-white/5 flex items-center px-4 overflow-hidden z-[220]">
                            <div
                                ref={thumbnailRef}
                                className="flex gap-2 md:gap-3 px-4 md:px-8 mx-auto overflow-x-auto no-scrollbar scroll-smooth w-full max-w-7xl h-full items-center"
                            >
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                                        className={`relative min-w-[70px] md:min-w-[100px] aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${selectedImage === idx ? 'border-primary ring-4 ring-primary/20 scale-105' : 'border-white/5 opacity-50 hover:opacity-100'
                                            }`}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover"
                                            sizes="120px"
                                            loading="lazy"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LiveaboardGallery;
