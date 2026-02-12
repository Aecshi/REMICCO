import { useState } from 'react';
import { useServices } from '@/hooks/useSupabaseData';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader2, CheckCircle2, FileText, DollarSign, Calendar, Phone } from 'lucide-react';
import { Wallet, PiggyBank, GraduationCap, Users, HeartHandshake, Building } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Icon map for services
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet,
  PiggyBank,
  GraduationCap,
  Users,
  HeartHandshake,
  Building,
};

export default function Services() {
  const { data: services, isLoading } = useServices();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  const activeServices = services?.filter(s => s.is_active) || [];
  const currentService = selectedService 
    ? activeServices.find(s => s.id === selectedService) 
    : activeServices[0];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Programs & Services</h1>
              <p className="text-lg text-white/90">
                Discover our comprehensive range of financial services designed to support your family's needs and help you achieve your goals.
              </p>
            </div>
          </div>
        </section>

        {/* Services Content */}
        <section className="py-16">
          <div className="container">
            <Tabs defaultValue={activeServices[0]?.id} className="space-y-8" onValueChange={setSelectedService}>
              {/* Service Navigation */}
              <TabsList className="w-full flex flex-wrap justify-start gap-2 bg-transparent h-auto p-0">
                {activeServices.map((service) => {
                  const IconComponent = iconMap[service.icon] || Wallet;
                  return (
                    <TabsTrigger
                      key={service.id}
                      value={service.id}
                      className="flex items-center gap-2 px-6 py-3 bg-card border-2 border-border data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all hover:scale-105"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-semibold">{service.title}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* Service Details */}
              {activeServices.map((service) => {
                const IconComponent = iconMap[service.icon] || Wallet;
                return (
                  <TabsContent key={service.id} value={service.id} className="mt-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Overview Card */}
                        <Card className="border-2">
                          <CardHeader className="pb-4">
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shrink-0">
                                <IconComponent className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                <h2 className="text-3xl font-bold text-foreground mb-2">{service.title}</h2>
                                <p className="text-muted-foreground">{service.description}</p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-foreground leading-relaxed">{service.full_description}</p>
                          </CardContent>
                        </Card>

                        {/* Features */}
                        {service.features && Array.isArray(service.features) && service.features.length > 0 && (
                          <Card>
                            <CardHeader>
                              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-secondary" />
                                Key Features
                              </h3>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                {service.features.map((feature: any, index: number) => (
                                  <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                    <span className="text-foreground">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        )}

                        {/* Requirements */}
                        {service.requirements && Array.isArray(service.requirements) && service.requirements.length > 0 && (
                          <Card>
                            <CardHeader>
                              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <FileText className="w-6 h-6 text-primary" />
                                Requirements
                              </h3>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                {service.requirements.map((req: any, index: number) => (
                                  <li key={index} className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                                    </div>
                                    <span className="text-foreground">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        )}

                        {/* Terms & Conditions */}
                        {service.terms && (
                          <Card className="bg-muted/50">
                            <CardHeader>
                              <h3 className="text-lg font-bold text-foreground">Terms & Conditions</h3>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground leading-relaxed">{service.terms}</p>
                            </CardContent>
                          </Card>
                        )}
                      </div>

                      {/* Sidebar - Quick Info */}
                      <div className="space-y-6">
                        {/* Loan Details Card */}
                        {(service.interest_rate || service.loan_amount_range || service.payment_terms) && (
                          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                            <CardHeader>
                              <h3 className="text-xl font-bold text-foreground">Quick Information</h3>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {service.interest_rate && (
                                <div className="flex items-start gap-3">
                                  <DollarSign className="w-5 h-5 text-primary shrink-0 mt-1" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                                    <p className="font-semibold text-foreground">{service.interest_rate}</p>
                                  </div>
                                </div>
                              )}
                              {service.loan_amount_range && (
                                <div className="flex items-start gap-3">
                                  <Wallet className="w-5 h-5 text-primary shrink-0 mt-1" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Loan Amount</p>
                                    <p className="font-semibold text-foreground">{service.loan_amount_range}</p>
                                  </div>
                                </div>
                              )}
                              {service.payment_terms && (
                                <div className="flex items-start gap-3">
                                  <Calendar className="w-5 h-5 text-primary shrink-0 mt-1" />
                                  <div>
                                    <p className="text-sm text-muted-foreground">Payment Terms</p>
                                    <p className="font-semibold text-foreground">{service.payment_terms}</p>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )}

                        {/* Contact Card */}
                        {service.contact_info && (
                          <Card className="bg-secondary text-secondary-foreground">
                            <CardHeader>
                              <h3 className="text-xl font-bold flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                How to Apply
                              </h3>
                            </CardHeader>
                            <CardContent>
                              <p className="leading-relaxed mb-4">{service.contact_info}</p>
                              <div className="space-y-2 text-sm opacity-90">
                                <p>📞 +63 123 456 789</p>
                                <p>📧 info@remicco.org</p>
                                <p>🕒 Mon-Fri, 8:00 AM - 5:00 PM</p>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* CTA Card */}
                        <Card className="bg-gradient-to-br from-primary to-secondary text-white">
                          <CardContent className="pt-6">
                            <h3 className="text-lg font-bold mb-3">Ready to Get Started?</h3>
                            <p className="text-sm mb-4 text-white/90">
                              Visit our office to learn more about this program and start your application today.
                            </p>
                            <a
                              href="#contact"
                              className="block w-full py-3 px-4 bg-white text-primary rounded-lg font-semibold text-center hover:bg-white/90 transition-colors"
                            >
                              Contact Us
                            </a>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
