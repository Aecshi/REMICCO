import { useMemo } from 'react';
import { Calendar, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useNewsArticles } from '@/hooks/useSupabaseData';

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

const News = () => {
  const { data: newsItems, isLoading } = useNewsArticles();

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
              News & Updates
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Stay informed about REMICCO's latest activities, achievements, community outreach programs, and upcoming events.
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-12 lg:py-16">
          <div className="container">
            {newsItems && newsItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map((news) => {
                  const imageUrl = news.image_url ? (localImageMap[news.image_url] || news.image_url) : defaultNewsImage;
                  const formattedDate = new Date(news.published_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                  return (
                    <Link to={`/news/${news.id}`} key={news.id}>
                      <Card className="bg-card border-border overflow-hidden group cursor-pointer h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl">
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
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No news articles available yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
