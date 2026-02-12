import { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useGalleryImages } from '@/hooks/useSupabaseData';

// Dynamic import of all gallery images for local fallback
const galleryModules = import.meta.glob('@/assets/gallery/*.{jpg,jpeg,png}', { eager: true, import: 'default' }) as Record<string, string>;

const localImageMap: Record<string, string> = {};
for (const [modulePath, url] of Object.entries(galleryModules)) {
  const filename = modulePath.split('/').pop();
  if (filename) {
    localImageMap[`/assets/gallery/${filename}`] = url;
  }
}

const defaultCategories = ['All', 'Meetings', 'Community Outreach', 'Events', 'Seminars', 'Member Services'];

const Gallery = () => {
  const { data: galleryData, isLoading } = useGalleryImages();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Transform database images with local fallback
  const galleryImages = useMemo(() => {
    if (!galleryData) return [];
    return galleryData.map(img => ({
      ...img,
      src: img.image_url ? (localImageMap[img.image_url] || img.image_url) : '',
    }));
  }, [galleryData]);

  // Extract unique categories from data
  const categories = useMemo(() => {
    if (!galleryData || galleryData.length === 0) return defaultCategories;
    const uniqueCategories = [...new Set(galleryData.map(img => img.category))];
    return ['All', ...uniqueCategories];
  }, [galleryData]);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Banner */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Photo Gallery
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Capturing moments of faith, community, and cooperation — browse through 
              our collection of events, meetings, and community activities.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-muted/50 border-b border-border sticky top-[73px] z-40">
          <div className="container">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground hover:bg-primary/10 border border-border'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 lg:py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-xl bg-card shadow-md cursor-pointer card-hover"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                      <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded mb-2">
                        {image.category}
                      </span>
                      <h3 className="font-semibold text-lg">{image.title}</h3>
                      <p className="text-sm opacity-80">{image.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No photos found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-primary-foreground hover:text-secondary transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 p-2 text-primary-foreground hover:text-secondary transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Image container */}
          <div 
            className="max-w-5xl max-h-[85vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[currentImageIndex]?.src}
              alt={filteredImages[currentImageIndex]?.title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4 text-primary-foreground">
              <h3 className="font-semibold text-xl">
                {filteredImages[currentImageIndex]?.title}
              </h3>
              <p className="text-primary-foreground/70">
                {filteredImages[currentImageIndex]?.category} • {filteredImages[currentImageIndex]?.date}
              </p>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 p-2 text-primary-foreground hover:text-secondary transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary-foreground/70 text-sm">
            {currentImageIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
