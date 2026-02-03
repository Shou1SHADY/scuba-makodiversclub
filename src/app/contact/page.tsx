import ContactSection from "@/components/sections/contact";
import WaveSeparator from "@/components/ui/wave-separator";

export default function ContactPage() {
    return (
        <div className="bg-brand-navy min-h-screen">
            {/* Page Header Section */}
            <div className="relative pt-40 pb-12 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-brand-navy/50 to-brand-navy z-0" />

                <div className="container-width px-6 relative z-10 text-center">
                    <h1 className="text-white font-display font-medium text-5xl md:text-6xl mb-6">Contact Us</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto font-body text-lg leading-relaxed">
                        Whether you're ready to book or just have a few questions, we're here to help you plan your perfect Red Sea diving adventure.
                    </p>
                </div>
            </div>

            <div className="container-width px-6 pb-20 relative z-10">
                <ContactSection />
            </div>

            {/* Wave Separator before Footer */}
            <div className="relative">
                <WaveSeparator position="bottom" color="text-[#020408]" />
            </div>
        </div>
    );
}
