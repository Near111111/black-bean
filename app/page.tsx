import HeroSection from "@/components/sections/HeroSection";
import Navbar from "@/components/layout/Navbar";
import FeaturedSection from "@/components/sections/FeaturedSection";
import AboutSection from "@/components/sections/AboutSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <AboutSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
