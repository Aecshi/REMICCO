import { Wallet, PiggyBank, GraduationCap, Users, HeartHandshake, Building, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { useServices } from '@/hooks/useSupabaseData';
import { useScrollAnimation } from '@/hooks/useScrollEffects';
import { cn } from '@/lib/utils';

// Icon map for services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet,
  PiggyBank,
  GraduationCap,
  Users,
  HeartHandshake,
  Building,
};

// Import local images
const galleryImages = import.meta.glob('@/assets/gallery/*.{jpg,jpeg,png}', { eager: true, import: 'default' });

// Helper function to get local image source
function getImageSrc(imageUrl: string): string {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  if (imageUrl.startsWith('/assets/')) {
    const relativePath = imageUrl.replace('/assets/', '../assets/');
    const fullPath = `/src/assets/${imageUrl.split('/assets/')[1]}`;
    const image = galleryImages[fullPath] as string | undefined;
    return image || imageUrl;
  }
  return imageUrl;
}

// Background gradients for each card
const backgrounds = [
  <div key="bg1" className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />,
  <div key="bg2" className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/5" />,
  <div key="bg3" className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-amber-50 dark:from-blue-950/20 dark:to-amber-950/20" />,
  <div key="bg4" className="absolute inset-0 bg-gradient-to-br from-amber-50 via-transparent to-blue-50 dark:from-amber-950/20 dark:to-blue-950/20" />,
  <div key="bg5" className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />,
  <div key="bg6" className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent" />,
];

// Grid position classes for bento layout
const gridPositions = [
  "md:col-span-2 lg:col-span-2 lg:row-span-2",
  "md:col-span-1 lg:col-span-1",
  "md:col-span-1 lg:col-span-1",
  "md:col-span-1 lg:col-span-1",
  "md:col-span-2 lg:col-span-1",
  "md:col-span-1 lg:col-span-1",
];

export function ServicesSection() {
  const { data: services, isLoading } = useServices();
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  if (isLoading) {
    return (
      <section id="services" className="py-20 lg:py-28 bg-muted/30 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </section>
    );
  }

  return (
    <section id="services" className="py-20 lg:py-28 bg-muted/30 overflow-hidden" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={cn(
          "text-center max-w-2xl mx-auto mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
            Programs & Services
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive financial solutions designed to support every stage of your journey 
            towards financial stability and growth.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[18rem] gap-4">
          {services?.slice(0, 6).map((service, index) => {
            const IconComponent = iconMap[service.icon] || Wallet;
            return (
              <BentoCard
                key={service.id}
                name={service.title}
                description={service.description}
                Icon={IconComponent}
                imageUrl={service.image_url ? getImageSrc(service.image_url) : undefined}
                background={backgrounds[index % backgrounds.length]}
                className={cn(
                  gridPositions[index % gridPositions.length],
                  "animate-fade-in-up",
                )}
                href="/services"
                cta="Learn More"
              />
            );
          })}
        </BentoGrid>

        {/* CTA */}
        <div className="text-center mt-12 animate-fade-in">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors group"
          >
            View All Programs & Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
