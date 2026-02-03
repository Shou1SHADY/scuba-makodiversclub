import Header from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import ServicesGrid from "@/components/sections/services-grid";
import MissionSection from "@/components/sections/mission";
import Testimonials from "@/components/sections/testimonials";
import InstagramGrid from "@/components/sections/instagram-grid";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Header />
      <HeroSection />
      <ServicesGrid />
      <MissionSection />
      <Testimonials />
      <InstagramGrid />
      <ContactSection />
      <Footer />
    </main>
  );
}
