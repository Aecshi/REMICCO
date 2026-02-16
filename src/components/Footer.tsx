import { MapPin, Phone, Mail, Clock, Facebook, Send, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useContactInfo } from '@/hooks/useSupabaseData';

const footerLinks = [
  { label: 'About Us', href: '/about', isRoute: true },
  { label: 'Programs & Services', href: '/services', isRoute: true },
  { label: 'News & Events', href: '/news', isRoute: true },
  { label: 'Gallery', href: '/gallery', isRoute: true },
  { label: 'Contact Us', href: '/contact', isRoute: true },
];

export function Footer() {
  const { data: contact, isLoading, error } = useContactInfo();

  if (error) console.error('Contact info error:', error);

  const address = contact?.address ?? '';
  const phone = contact?.phone ?? '';
  const email = contact?.email ?? '';
  const officeHours = contact?.office_hours ?? [];
  const facebookUrl = contact?.facebook_url ?? '#';

  if (isLoading) {
    return (
      <footer id="contact" className="bg-primary text-primary-foreground py-16 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </footer>
    );
  }

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">R</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">REMICCO</h3>
                <p className="text-xs text-primary-foreground/70">Credit Cooperative</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Responsible and Empowered Mindoreños Credit Cooperative — empowering working families 
              through faith-guided finance since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link to={link.href} className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <a href={`mailto:${email}`} className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="text-primary-foreground/80 text-sm">
                  {officeHours.map((hours, i) => (
                    <p key={i}>{hours}</p>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Stay Connected</h4>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Subscribe to our newsletter for updates and announcements.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="mt-6">
              <p className="text-sm text-primary-foreground/80 mb-3">Follow us:</p>
              <div className="flex gap-3">
                <a 
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} REMICCO. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
