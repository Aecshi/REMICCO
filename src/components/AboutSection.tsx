import { CheckCircle2, Award, Quote, Loader2 } from 'lucide-react';
import { useAboutContent, useHighlights, useAwards } from '@/hooks/useSupabaseData';
import { useScrollAnimation } from '@/hooks/useScrollEffects';
import { cn } from '@/lib/utils';

export function AboutSection() {
  const { data: aboutContent, isLoading: contentLoading, error: contentError } = useAboutContent();
  const { data: highlights, isLoading: highlightsLoading, error: highlightsError } = useHighlights();
  const { data: awards, isLoading: awardsLoading, error: awardsError } = useAwards();
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  // Log errors for debugging
  if (contentError) console.error('About content error:', contentError);
  if (highlightsError) console.error('Highlights error:', highlightsError);
  if (awardsError) console.error('Awards error:', awardsError);

  const isLoading = contentLoading || highlightsLoading || awardsLoading;

  if (isLoading) {
    return (
      <section id="about" className="py-20 lg:py-28 bg-background flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </section>
    );
  }

  return (
    <section id="about" className="py-20 lg:py-28 bg-background overflow-hidden" ref={sectionRef}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className={cn(
            "transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              {aboutContent?.section_tag}
            </span>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
              {aboutContent?.section_title}
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {aboutContent?.paragraphs?.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
              
              <blockquote className="border-l-4 border-secondary pl-4 py-2 italic bg-accent/30 rounded-r-lg">
                <Quote className="w-5 h-5 text-secondary mb-2" />
                "{aboutContent?.quote_text}"
                <footer className="text-sm mt-2 text-foreground not-italic">— {aboutContent?.quote_author}</footer>
              </blockquote>
            </div>

            {/* Highlights */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {highlights?.map((highlight) => (
                <div key={highlight.id} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm text-foreground">{highlight.text}</span>
                </div>
              ))}
            </div>

            {/* Citation */}
            {aboutContent?.citation_text && (
              <p className="mt-6 text-xs text-muted-foreground italic">
                {aboutContent.citation_text.includes('Radio Veritas') ? (
                  <>
                    Source: Virola, Madonna T. "REMICCO: A Ministry of Hope." <a href={aboutContent.citation_url || 'https://rvasia.org'} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Radio Veritas Asia</a>, 23 January 2026.
                  </>
                ) : (
                  aboutContent.citation_text
                )}
              </p>
            )}
          </div>

          {/* Mission & Vision Cards */}
          <div className={cn(
            "space-y-6 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-2xl font-bold mb-4" style={{ fontWeight: 600 }}>{aboutContent?.vision_title}</h3>
              <p className="leading-relaxed opacity-90">
                {aboutContent?.vision_text}
              </p>
            </div>
            
            <div className="bg-secondary text-secondary-foreground rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <h3 className="text-2xl font-bold mb-4" style={{ fontWeight: 600 }}>{aboutContent?.mission_title}</h3>
              <p className="leading-relaxed">
                {aboutContent?.mission_text}
              </p>
            </div>

            {/* Awards Recognition */}
            {awards && awards.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8 text-secondary" />
                  <h3 className="text-xl font-bold text-foreground">Excellence Recognized</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {awards.map((award) => (
                    <li key={award.id} className="flex items-start gap-2">
                      <span className="text-secondary font-bold">{award.year}:</span>
                      <span>{award.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
