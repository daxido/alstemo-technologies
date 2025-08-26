import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import alstemLogo from '@/assets/alstemo-logo.png';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="navigation-glass">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-lift group">
            <div className="relative">
              <img 
                src={alstemLogo} 
                alt="ALSTEMO Technologies Logo" 
                className="h-10 w-10 object-contain transition-smooth group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity glow" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-lg leading-tight text-gradient">ALSTEMO</span>
              <span className="text-muted-foreground text-xs leading-tight font-medium">TECHNOLOGIES</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm font-medium transition-smooth hover:text-primary group ${
                  isActive(item.href) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  isActive(item.href) ? 'w-full' : ''
                }`} />
              </Link>
            ))}
            <ThemeToggle />
            <Button 
              variant="default" 
              size="sm" 
              className="glow-button relative overflow-hidden font-medium px-6"
            >
              Get Quote
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass hover:glass-border"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-glass-border glass">
            <div className="flex flex-col space-y-4 animate-fade-in">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-base font-medium transition-smooth hover:text-primary group ${
                    isActive(item.href) ? 'text-primary' : 'text-foreground'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                    isActive(item.href) ? 'w-full' : ''
                  }`} />
                </Link>
              ))}
              <Button 
                variant="default" 
                size="sm" 
                className="glow-button w-fit font-medium"
              >
                Get Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;