import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Wrench, 
  Headphones, 
  Download, 
  Wifi, 
  RefreshCw,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Zap
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import InteractiveBackground from '@/components/InteractiveBackground';
import servicesBanner from '@/assets/services-banner.jpg';

const Services = () => {
  const services = [
    {
      icon: Monitor,
      title: 'PC Diagnostics',
      description: 'Comprehensive hardware and software diagnostics to identify and resolve issues.',
      features: ['Hardware testing', 'Software analysis', 'Performance optimization', 'Virus scanning'],
      price: 'From N$ 150'
    },
    {
      icon: Wrench,
      title: 'Computer Repairs',
      description: 'Professional repair services for laptops, desktops, and mobile devices.',
      features: ['Hardware replacement', 'Screen repairs', 'Data recovery', 'System restoration'],
      price: 'From N$ 200'
    },
    {
      icon: Headphones,
      title: 'IT Support',
      description: '24/7 technical support and consultation for all your technology needs.',
      features: ['Remote assistance', 'On-site support', 'System maintenance', 'User training'],
      price: 'From N$ 100/hour'
    },
    {
      icon: Download,
      title: 'Software Installation',
      description: 'Professional software setup, configuration, and license management.',
      features: ['OS installation', 'Software setup', 'License management', 'System updates'],
      price: 'From N$ 120'
    },
    {
      icon: Wifi,
      title: 'Networking Solutions',
      description: 'Complete network setup, configuration, and maintenance services.',
      features: ['Network setup', 'Wi-Fi configuration', 'Security implementation', 'Troubleshooting'],
      price: 'From N$ 300'
    },
    {
      icon: RefreshCw,
      title: 'Device Refurbishment',
      description: 'Certified refurbished computers and devices with warranty included.',
      features: ['Quality testing', 'Performance upgrade', 'Warranty included', 'Affordable pricing'],
      price: 'From N$ 800'
    }
  ];

  const features = [
    { icon: Clock, title: 'Quick Turnaround', description: 'Most repairs completed within 24-48 hours' },
    { icon: Shield, title: 'Warranty Included', description: '30-90 day warranty on all repair services' },
    { icon: Zap, title: 'Expert Technicians', description: 'Certified professionals with years of experience' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <InteractiveBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-section-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={servicesBanner} 
            alt="IT Services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary text-primary">
              Professional IT Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Complete IT Solutions
              <span className="block text-primary">For Every Need</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              From diagnostics and repairs to networking and support, we provide comprehensive 
              IT services designed to keep your technology running at peak performance.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card key={service.title} className="shadow-card hover:shadow-hero transition-smooth border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary-gradient p-3 rounded-lg">
                        <service.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary">
                          {service.price}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground transition-smooth">
                    <Link to="/contact" className="flex items-center gap-2">
                      Request Service <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Why Choose ALSTEMO?
            </h2>
            <p className="text-lg text-muted-foreground">
              We deliver exceptional service with a commitment to quality and customer satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center shadow-card border-border">
                <CardContent className="p-6">
                  <div className="bg-primary-gradient p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Our Service Process
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple, transparent, and efficient - here's how we work
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '01', title: 'Contact Us', description: 'Reach out via phone, WhatsApp, or our contact form' },
              { step: '02', title: 'Assessment', description: 'We diagnose the issue and provide a clear quote' },
              { step: '03', title: 'Service', description: 'Our experts perform the necessary work efficiently' },
              { step: '04', title: 'Follow-up', description: 'We ensure everything works perfectly and provide support' }
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="bg-primary-gradient text-primary-foreground rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-gradient text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Your Technology Fixed?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today for a free consultation and quote. We're here to help!
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-background hover:bg-background/90 text-primary shadow-hero"
            >
              <Link to="/contact" className="flex items-center gap-2">
                Get Started Now <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;