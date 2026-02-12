import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { NewsTicker } from '@/components/NewsTicker';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { GalleryCarousel } from '@/components/GalleryCarousel';
import { NewsSection } from '@/components/NewsSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <NewsTicker />
        <AboutSection />
        <ServicesSection />
        <GalleryCarousel />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
