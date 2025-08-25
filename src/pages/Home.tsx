import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Wrench, 
  Headphones, 
  Download, 
  Wifi, 
  RefreshCw,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import InteractiveBackground from '@/components/InteractiveBackground';
import heroBanner from '@/assets/hero-banner.jpg';

const Home = () => {
  const services = [
    { icon: Monitor, title: 'PC Diagnostics', description: 'Comprehensive hardware and software diagnostics' },
    { icon: Wrench, title: 'Repairs', description: 'Professional repair services for all devices' },
    { icon: Headphones, title: 'IT Support', description: '24/7 technical support and consultation' },
    { icon: Download, title: 'Software Installation', description: 'Software setup and configuration' },
    { icon: Wifi, title: 'Networking', description: 'Network setup and maintenance' },
    { icon: RefreshCw, title: 'Device Refurbishment', description: 'Certified refurbished devices' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <InteractiveBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative animated-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroBanner})` }}
        ></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-background/20 text-primary-foreground border-background/30">
              Youth-Owned IT Startup in Namibia
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Affordable IT Solutions
              <span className="block text-4xl md:text-6xl mt-2">in Namibia</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Professional technology services from passionate young entrepreneurs. 
              We make technology accessible and affordable for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-background hover:bg-background/90 text-primary shadow-hero animate-bounce-subtle">
                <Link to="/services" className="flex items-center gap-2">
                  Our Services <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-background/30 text-primary-foreground hover:bg-background/10 animate-fade-in">
                <Link to="/contact" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Get Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              To bridge the technology gap in Namibia by providing affordable, reliable, and professional 
              IT services. We believe that every individual and business deserves access to quality 
              technology solutions that empower growth and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">What We Do</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive IT services designed to keep your technology running smoothly
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card key={service.title} className="shadow-card hover:shadow-hero transition-smooth border-border">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary-gradient p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="default" size="lg" className="bg-primary-gradient hover:shadow-hero">
              <Link to="/services" className="flex items-center gap-2">
                View All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today for a free consultation and discover how we can help solve your IT challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>+264 81 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@alstemotechnologies.com</span>
              </div>
            </div>
            <Button variant="default" size="lg" className="bg-primary-gradient hover:shadow-hero mt-8">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary-gradient p-2 rounded-lg">
                  <span className="text-primary-foreground font-bold text-xl">AT</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-background text-lg leading-tight">ALSTEMO</span>
                  <span className="text-background/70 text-xs leading-tight">TECHNOLOGIES</span>
                </div>
              </div>
              <p className="text-background/70 max-w-md">
                Youth-owned IT startup providing affordable technology solutions across Namibia.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-background">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-background/70 hover:text-background transition-smooth">About Us</Link>
                <Link to="/services" className="block text-background/70 hover:text-background transition-smooth">Services</Link>
                <Link to="/contact" className="block text-background/70 hover:text-background transition-smooth">Contact</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-background">Contact Info</h4>
              <div className="space-y-2 text-background/70">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+264 81 123 4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@alstemotechnologies.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Windhoek, Namibia</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center">
            <p className="text-background/70">
              © 2024 ALSTEMO Technologies. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;