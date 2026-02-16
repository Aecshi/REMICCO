import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader2, CheckCircle2, Award, Users, BookOpen, Building2, Target, Heart, Star, Shield } from 'lucide-react';
import { useAboutContent, useHighlights, useAwards, useSiteSettings } from '@/hooks/useSupabaseData';

// Types for site_settings JSONB content
interface GoalAcronymItem {
  letter: string;
  meaning: string;
}

interface GoalData {
  text: string;
  acronym: GoalAcronymItem[];
}

interface CooperativePrinciple {
  number: number;
  title: string;
  description: string;
}

interface OfficerData {
  name: string;
  position: string;
}

interface LeadershipData {
  board_of_directors: string[];
  officers: OfficerData[];
}

interface OrgStructureData {
  description: string;
  bodies: string[];
}

interface MembershipTermination {
  special_circumstances: string;
  voluntary: string;
  involuntary: string;
}

interface MembershipData {
  eligibility: string;
  requirements: string[];
  termination: MembershipTermination;
}

interface SpiritualityAspect {
  name: string;
  description: string;
}

interface SpiritualityData {
  patron_saint: string;
  symbol: string;
  symbol_meaning: string;
  aspects: SpiritualityAspect[];
}

const About = () => {
  const { data: aboutContent, isLoading: contentLoading, error: contentError } = useAboutContent();
  const { data: highlights, isLoading: highlightsLoading, error: highlightsError } = useHighlights();
  const { data: awards, isLoading: awardsLoading, error: awardsError } = useAwards();
  const { data: settings, isLoading: settingsLoading, error: settingsError } = useSiteSettings([
    'about_goal',
    'about_core_values',
    'about_cooperative_principles',
    'about_org_structure',
    'about_leadership',
    'about_membership',
    'about_spirituality',
  ]);

  // Log errors for debugging
  if (contentError) console.error('About content error:', contentError);
  if (highlightsError) console.error('Highlights error:', highlightsError);
  if (awardsError) console.error('Awards error:', awardsError);
  if (settingsError) console.error('Site settings error:', settingsError);

  const isLoading = contentLoading || highlightsLoading || awardsLoading || settingsLoading;

  const goal = settings?.about_goal as GoalData | undefined;
  const coreValues = settings?.about_core_values as string[] | undefined;
  const cooperativePrinciples = settings?.about_cooperative_principles as CooperativePrinciple[] | undefined;
  const orgStructure = settings?.about_org_structure as OrgStructureData | undefined;
  const leadership = settings?.about_leadership as LeadershipData | undefined;
  const membership = settings?.about_membership as MembershipData | undefined;
  const spirituality = settings?.about_spirituality as SpiritualityData | undefined;

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
        <section className="bg-primary text-primary-foreground py-20 lg:py-28">
          <div className="container text-center">
            <span className="inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4">
              {aboutContent?.section_tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
              About REMICCO
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Responsible and Empowered Mindoreños Credit Cooperative
            </p>
          </div>
        </section>

        {/* Historical Background */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontWeight: 600 }}>
                {aboutContent?.section_title}
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              {aboutContent?.paragraphs?.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="mt-10 grid sm:grid-cols-2 gap-3">
                {highlights.map((highlight) => (
                  <div key={highlight.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span className="text-sm text-foreground">{highlight.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Founding Leadership */}
        {leadership && (
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container max-w-4xl">
              <div className="flex items-center gap-3 mb-8">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontWeight: 600 }}>
                  Founding Leadership
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Board of Directors */}
                <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Board of Directors
                  </h3>
                  <ul className="space-y-3">
                    {leadership.board_of_directors.map((name, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                          {String.fromCharCode(97 + index)}
                        </span>
                        <span className="text-foreground font-medium">{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Officers */}
                <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-secondary" />
                    Appointed Officers
                  </h3>
                  <ul className="space-y-3">
                    {leadership.officers.map((officer, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                          {String.fromCharCode(97 + index)}
                        </span>
                        <div>
                          <span className="text-foreground font-medium block">{officer.name}</span>
                          <span className="text-muted-foreground text-sm">{officer.position}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Vision, Mission, Goal */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container max-w-4xl">
            <div className="flex items-center gap-3 mb-10">
              <Target className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontWeight: 600 }}>
                Vision, Mission, Goal & Core Values
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Vision */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-4" style={{ fontWeight: 600 }}>
                  {aboutContent?.vision_title}
                </h3>
                <p className="leading-relaxed opacity-90">{aboutContent?.vision_text}</p>
              </div>

              {/* Mission */}
              <div className="bg-secondary text-secondary-foreground rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <h3 className="text-2xl font-bold mb-4" style={{ fontWeight: 600 }}>
                  {aboutContent?.mission_title}
                </h3>
                <p className="leading-relaxed">{aboutContent?.mission_text}</p>
              </div>
            </div>

            {/* Goal */}
            {goal && (
              <div className="bg-card border border-border rounded-2xl p-8 mb-10 shadow-sm">
                <h3 className="text-2xl font-bold text-foreground mb-4" style={{ fontWeight: 600 }}>
                  Our Goal
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">{goal.text}</p>
                
                {/* REMICCO Acronym */}
                <div className="space-y-3">
                  {goal.acronym.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-lg font-bold shrink-0">
                        {item.letter}
                      </span>
                      <p className="text-foreground pt-2">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Values */}
            {coreValues && coreValues.length > 0 && (
              <div className="bg-muted/50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2" style={{ fontWeight: 600 }}>
                  <Heart className="w-6 h-6 text-secondary" />
                  Core Values
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {coreValues.map((value, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                      <span className="text-foreground font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Spirituality */}
        {spirituality && (
          <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
            <div className="container max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                  SPIRITUALITY
                </h2>
                <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-primary-foreground/20">
                <div className="max-w-3xl mx-auto">
                  <p className="text-lg leading-relaxed mb-6 text-primary-foreground/95">
                    {spirituality.patron_saint}
                  </p>
                  <p className="text-lg leading-relaxed mb-8 text-primary-foreground/95">
                    {spirituality.symbol_meaning}
                  </p>

                  <div className="space-y-6">
                    {spirituality.aspects.map((aspect, index) => (
                      <div key={index} className="bg-primary-foreground/5 rounded-2xl p-6 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all">
                        <h3 className="text-2xl font-bold mb-3 text-secondary">
                          {aspect.name}:
                        </h3>
                        <p className="text-primary-foreground/90 leading-relaxed">
                          {aspect.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cooperative Principles */}
        {cooperativePrinciples && cooperativePrinciples.length > 0 && (
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container max-w-4xl">
              <div className="flex items-center gap-3 mb-10">
                <BookOpen className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontWeight: 600 }}>
                  Cooperative Principles
                </h2>
              </div>

              <div className="space-y-6">
                {cooperativePrinciples.map((principle) => (
                  <div key={principle.number} className="bg-card border border-border rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <span className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-xl font-bold shrink-0">
                        {principle.number}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{principle.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Organizational Structure */}
        {orgStructure && (
          <section className="py-16 lg:py-24 bg-background">
            <div className="container max-w-4xl">
              <div className="flex items-center gap-3 mb-8">
                <Building2 className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontWeight: 600 }}>
                  Organizational Structure
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                {orgStructure.description}
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {orgStructure.bodies.map((body, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-sm">
                    <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-foreground font-medium text-sm">{body}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Membership */}
        {membership && (
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container max-w-4xl">
              <div className="flex items-center gap-3 mb-8">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontWeight: 600 }}>
                  Membership
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                {membership.eligibility}
              </p>

              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm mb-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Requirements for Membership</h3>
                <ol className="space-y-4">
                  {membership.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-muted-foreground leading-relaxed">{req}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-foreground mb-2 text-sm uppercase tracking-wide">Special Circumstances</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{membership.termination.special_circumstances}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-foreground mb-2 text-sm uppercase tracking-wide">Voluntary Termination</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{membership.termination.voluntary}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-foreground mb-2 text-sm uppercase tracking-wide">Involuntary Termination</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{membership.termination.involuntary}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Awards */}
        {awards && awards.length > 0 && (
          <section className="py-16 lg:py-24 bg-background">
            <div className="container max-w-4xl">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-8 h-8 text-secondary" />
                <h2 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontWeight: 600 }}>
                  Awards & Recognition
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {awards.map((award) => (
                  <div key={award.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-bold mb-3">
                      {award.year}
                    </span>
                    <p className="text-foreground font-medium">{award.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default About;
