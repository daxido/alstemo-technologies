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
    <nav className="glass bg-background/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-glow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-smooth group">
            <div className="relative">
              <img 
                src={alstemLogo} 
                alt="ALSTEMO Technologies Logo" 
                className="h-10 w-10 object-contain group-hover:drop-shadow-lg transition-all duration-300"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-300 -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">ALSTEMO</span>
              <span className="text-muted-foreground text-xs leading-tight">TECHNOLOGIES</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary relative group px-3 py-2 rounded-lg ${
                  isActive(item.href) 
                    ? 'text-primary bg-primary/10 shadow-glow' 
                    : 'text-foreground hover:bg-primary/5'
                }`}
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            ))}
            <ThemeToggle />
            <Button 
              variant="default" 
              size="sm" 
              className="bg-primary-gradient hover:shadow-hero btn-glow font-semibold"
              asChild
            >
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass hover:bg-primary/20"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 glass">
            <div className="flex flex-col space-y-4 animate-fade-in">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium transition-all duration-300 hover:text-primary px-4 py-2 rounded-lg ${
                    isActive(item.href) 
                      ? 'text-primary bg-primary/10 shadow-card' 
                      : 'text-foreground hover:bg-primary/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button 
                variant="default" 
                size="sm" 
                className="bg-primary-gradient w-fit mx-4 btn-glow"
                asChild
              >
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Get Quote</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;