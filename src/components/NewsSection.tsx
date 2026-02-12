import { Calendar, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNewsArticles } from '@/hooks/useSupabaseData';
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
const defaultNewsImage = localImageMap['/assets/gallery/gallery1remicco.jpg'] || '';

export function NewsSection() {
  const { data: newsItems, isLoading } = useNewsArticles();
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  if (isLoading) {
    return (
      <section id="news" className="py-20 lg:py-28 bg-background flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </section>
    );
  }
  return (
    <section id="news" className="py-20 lg:py-28 bg-background overflow-hidden" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={cn(
          "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Stay Updated
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
              News & Updates
            </h2>
          </div>
          <Link to="/news">
            <Button variant="outline" className="shrink-0 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full">
              View All News
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems?.map((news, index) => {
            const imageUrl = news.image_url ? (localImageMap[news.image_url] || news.image_url) : defaultNewsImage;
            const formattedDate = new Date(news.published_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            return (
              <Link to={`/news/${news.id}`} key={news.id} className={cn(
                "transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )} style={{ transitionDelay: `${(index % 3) * 100}ms` }}>
                <Card className="bg-card border-border overflow-hidden group cursor-pointer h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl">
                  {/* News Image */}
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={imageUrl} 
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full shadow-md">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{formattedDate}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {news.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {news.excerpt}
                    </p>

                    {/* Source attribution for articles with external sources */}
                    {news.source && (
                      <p className="text-xs text-muted-foreground mt-3 italic">
                        By {news.author} • <span className="text-primary inline-flex items-center gap-1">
                          {news.source} <ExternalLink className="w-3 h-3" />
                        </span>
                      </p>
                    )}
                    
                    <span className="inline-flex items-center px-0 mt-4 text-primary font-semibold text-sm">
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
