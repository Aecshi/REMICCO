import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Users, Heart, Shield, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHeroSlides, useHeroContent, useStats } from '@/hooks/useSupabaseData';
import { useParallax } from '@/hooks/useScrollEffects';

// Fallback local images (used when image_url starts with /assets/)
import heroMain from '@/assets/remiccoMainhero.jpg';
import hero2 from '@/assets/remiccohero2.jpg';
import hero1 from '@/assets/hero1.png';

const localImageMap: Record<string, string> = {
  '/assets/remiccoMainhero.jpg': heroMain,
  '/assets/remiccohero2.jpg': hero2,
  '/assets/hero1.png': hero1,
};

// Icon map for stats
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Heart,
  Shield,
};

function getImageSrc(imageUrl: string): string {
  return localImageMap[imageUrl] || imageUrl;
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref: parallaxRef, offset } = useParallax(0.5);
  
  const { data: heroSlides, isLoading: slidesLoading } = useHeroSlides();
  const { data: heroContent, isLoading: contentLoading } = useHeroContent();
  const { data: stats, isLoading: statsLoading } = useStats();

  const slides = heroSlides || [];
  
  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, slides.length]);

  const isLoading = slidesLoading || contentLoading || statsLoading;

  if (isLoading) {
    return (
      <section id="home" className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden bg-primary flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-secondary animate-spin" />
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden bg-primary" ref={parallaxRef}>
      {/* Background Image Slider with Parallax */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={getImageSrc(slide.image_url)}
              alt={slide.alt_text}
              className="w-full h-full object-cover scale-110"
            />
          </div>
        ))}
        {/* Modern gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.1) 70%)' }}
        />
      </div>

      {/* Slider Navigation Arrows */}
      <button
        onClick={() => { prevSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => { nextSlide(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slider Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-secondary w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container py-20 lg:py-32">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-6 animate-fade-in-up">
            {heroContent?.tagline || 'Est. 2018 • Mindoro, Philippines'}
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {heroContent?.heading || 'Empowering Mindoreños Through'}{' '}
            <span className="text-secondary">{heroContent?.heading_highlight || 'Faith-Guided'}</span> Finance
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {heroContent?.description || 'The Responsible and Empowered Mindoreños Credit Cooperative — where trust, solidarity, and shared belief transform limited resources into meaningful opportunities.'}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {stats?.map((stat) => {
              const IconComponent = iconMap[stat.icon] || Users;
              return (
                <div key={stat.id} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/20 rounded-full mx-auto mb-2">
                    <IconComponent className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="text-2xl font-bold text-primary-foreground">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="hsl(0 0% 100%)"
          />
        </svg>
      </div>
    </section>
  );
}
