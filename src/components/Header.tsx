import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContactInfo } from '@/hooks/useSupabaseData';

const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/about', isRoute: true },
  { label: 'Programs & Services', href: '/services', isRoute: true },
  { label: 'News & Events', href: '/news', isRoute: true },
  { label: 'Gallery', href: '/gallery', isRoute: true },
  { label: 'Contact Us', href: '/contact', isRoute: true },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { data: contact } = useContactInfo();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm shadow-sm">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <p className="hidden md:block">Empowering Mindoreños through faith-guided finance</p>
          <div className="flex items-center gap-4 ml-auto">
            <a href={`mailto:${contact?.email || 'info@remicco.org'}`} className="hover:text-secondary transition-colors">
              {contact?.email || 'info@remicco.org'}
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center group"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span 
              className="text-primary text-3xl md:text-4xl tracking-[0.02em] group-hover:opacity-80 transition-opacity duration-300 select-none"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 200 }}
            >
              REMICCO
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.label} 
                className="relative group"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className={`nav-link flex items-center gap-1 ${
                      location.pathname === item.href ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="nav-link text-foreground hover:text-primary flex items-center gap-1"
                  >
                    {item.label}
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </a>
                )}
                
                {item.submenu && activeSubmenu === item.label && (
                  <div className="absolute top-full left-0 bg-card rounded-md shadow-lg border border-border py-2 min-w-48 animate-fade-in-up">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in-up">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className={`block py-3 px-2 font-medium ${
                      location.pathname === item.href ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="block py-3 px-2 text-foreground hover:text-primary font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
                {item.submenu && (
                  <div className="pl-4 border-l-2 border-muted ml-2">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block py-2 px-2 text-sm text-muted-foreground hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
