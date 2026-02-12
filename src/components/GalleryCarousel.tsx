import { useMemo } from 'react';
import { Camera, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useGalleryImages } from '@/hooks/useSupabaseData';
import { useScrollAnimation } from '@/hooks/useScrollEffects';
import { cn } from '@/lib/utils';

// Dynamic import of all gallery images for local fallback
const galleryModules = import.meta.glob('@/assets/gallery/*.{jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, string>;

const localImageMap: Record<string, string> = {};
for (const [modulePath, url] of Object.entries(galleryModules)) {
  const filename = modulePath.split('/').pop();
  if (filename) {
    localImageMap[`/assets/gallery/${filename}`] = url;
  }
}

export function GalleryCarousel() {
  const { data: galleryData, isLoading } = useGalleryImages();
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  const images = useMemo(() => {
    if (!galleryData || galleryData.length === 0) return [];
    return galleryData.map(img => ({
      ...img,
      src: img.image_url ? (localImageMap[img.image_url] || img.image_url) : '',
    }));
  }, [galleryData]);

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-muted/30 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </section>
    );
  }

  if (images.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-muted/30 overflow-hidden" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={cn(
          "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              <Camera className="w-4 h-4 inline mr-2" />
              Gallery
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
              Life at REMICCO
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Moments of faith, community, and cooperation captured through our events and activities.
            </p>
          </div>
          <Link to="/gallery">
            <Button variant="outline" className="shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full">
              View Full Gallery
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Continuously scrolling carousel — full width */}
      <div className={cn(
        "relative transition-all duration-700 delay-200",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}>
        <div className="relative mx-auto flex items-center justify-center">
          <Carousel
            opts={{ loop: true, dragFree: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 0.8, stopOnInteraction: false, stopOnMouseEnter: true })]}
          >
            <CarouselContent className="ml-0">
              {images.map((image) => (
                <CarouselItem
                  key={image.id}
                  className="basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-0"
                >
                  <div className="mx-2">
                    <Link to="/gallery" className="block group">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <span className="inline-block px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full mb-2">
                              {image.category}
                            </span>
                            <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                            <p className="text-white/70 text-xs">{image.date}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-muted/30 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
}
