import { useParams, Link, useNavigate } from 'react-router-dom';
import { useNewsArticle, useNewsArticles } from '@/hooks/useSupabaseData';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, ExternalLink, Loader2, Share2 } from 'lucide-react';

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

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useNewsArticle(id);
  const { data: relatedArticles } = useNewsArticles(4);

  // Get image URL with fallback
  const getImageUrl = (url: string | null | undefined) => {
    if (!url) return defaultNewsImage;
    return localImageMap[url] || url;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Filter out current article from related
  const filteredRelated = relatedArticles?.filter(a => a.id !== id).slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Banner */}
        <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
          <img
            src={getImageUrl(article.image_url)}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
              {article.category}
            </span>
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container max-w-4xl">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.published_date)}
                </span>
                {article.author && (
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {article.author}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container max-w-4xl py-10 md:py-16">
          {/* Back Button & Share */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Excerpt/Lead */}
          <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium border-l-4 border-primary pl-4">
            {article.excerpt}
          </p>

          {/* Source Attribution */}
          {article.source && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 pb-8 border-b">
              <span>Originally published on</span>
              <a 
                href={article.source_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
              >
                {article.source}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Main Content */}
          <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary">
            {article.content ? (
              // Render content with proper formatting
              article.content.split('\n\n').map((paragraph, index) => {
                // Check if it's a quote (starts with ")
                if (paragraph.startsWith('"') && paragraph.includes('"')) {
                  return (
                    <blockquote key={index} className="border-l-4 border-primary pl-6 italic my-8 text-muted-foreground">
                      {paragraph}
                    </blockquote>
                  );
                }
                // Check if it's a heading (short text, no period at end)
                if (paragraph.length < 80 && !paragraph.endsWith('.') && !paragraph.startsWith('"')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-foreground mt-10 mb-4">
                      {paragraph}
                    </h2>
                  );
                }
                // Regular paragraph
                return (
                  <p key={index} className="text-foreground/90 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                );
              })
            ) : (
              <p className="text-muted-foreground italic">
                Full article content is not available. Please check back later.
              </p>
            )}
          </article>

          {/* Tags/Category */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Category:</span>
              <span className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full">
                {article.category}
              </span>
              {article.is_featured && (
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  Featured
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {filteredRelated && filteredRelated.length > 0 && (
          <section className="bg-muted/30 py-16">
            <div className="container">
              <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRelated.map((related) => (
                  <Link to={`/news/${related.id}`} key={related.id}>
                    <Card className="bg-card card-hover border-border overflow-hidden group cursor-pointer h-full">
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={getImageUrl(related.image_url)} 
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full shadow-md">
                            {related.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(related.published_date)}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with REMICCO News</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Be the first to know about our latest programs, community initiatives, and cooperative updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#news">
                <Button variant="secondary" size="lg">
                  View All News
                </Button>
              </Link>
              <Link to="/#contact">
                <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
