import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Clock,
  Send,
  CheckCircle
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import InteractiveBackground from '@/components/InteractiveBackground';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_category: '',
    service_description: '',
    budget_range: '',
    timeline: '',
    additional_info: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form with data:', formData);
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Function response:', data);

      if (data?.success) {
        toast({
          title: "Message Sent!",
          description: data.message || "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          company: '',
          service_category: '', 
          service_description: '',
          budget_range: '',
          timeline: '',
          additional_info: ''
        });
      } else {
        throw new Error(data?.message || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+264 818024469', '+264 85 987 6543'],
      description: 'Call us during business hours'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: ['+264 818024469'],
      description: 'Available 24/7 for quick support'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@alstemotechnologies.com', 'support@alstemotechnologies.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: ['Windhoek Central', 'Namibia'],
      description: 'On-site services available'
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Emergency calls only' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <InteractiveBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary text-primary">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Contact
              <span className="block text-primary">ALSTEMO Technologies</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to solve your IT challenges? We're here to help with professional 
              support and affordable solutions tailored to your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Send Us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+264 81 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service_category">Service Category *</Label>
                    <select
                      id="service_category"
                      name="service_category"
                      value={formData.service_category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a service</option>
                      <option value="web_development">Web Development</option>
                      <option value="mobile_app_development">Mobile App Development</option>
                      <option value="ui_ux_design">UI/UX Design</option>
                      <option value="digital_marketing">Digital Marketing</option>
                      <option value="seo_optimization">SEO Optimization</option>
                      <option value="e_commerce_solutions">E-Commerce Solutions</option>
                      <option value="maintenance_support">Maintenance & Support</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget_range">Budget Range</Label>
                      <select
                        id="budget_range"
                        name="budget_range"
                        value={formData.budget_range}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select budget range</option>
                        <option value="under_500">Under N$500</option>
                        <option value="500_1000">N$500 - N$1,000</option>
                        <option value="1000_2500">N$1,000 - N$2,500</option>
                        <option value="2500_5000">N$2,500 - N$5,000</option>
                        <option value="over_5000">Over N$5,000</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Preferred Timeline</Label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select timeline</option>
                        <option value="urgent">Urgent (Within 24 hours)</option>
                        <option value="this_week">This week</option>
                        <option value="next_week">Next week</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="service_description">Service Description *</Label>
                    <Textarea
                      id="service_description"
                      name="service_description"
                      value={formData.service_description}
                      onChange={handleInputChange}
                      required
                      placeholder="Describe your IT issue or request in detail..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional_info">Additional Information</Label>
                    <Textarea
                      id="additional_info"
                      name="additional_info"
                      value={formData.additional_info}
                      onChange={handleInputChange}
                      placeholder="Any additional details, special requirements, or questions..."
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary-gradient hover:shadow-hero" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground">Get In Touch</h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex items-start gap-4">
                      <div className="bg-primary-gradient p-3 rounded-lg flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                        {info.details.map((detail, index) => (
                          <p key={index} className="text-muted-foreground">{detail}</p>
                        ))}
                        <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <Card className="shadow-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {businessHours.map((schedule) => (
                      <div key={schedule.day} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{schedule.day}</span>
                        <span className="font-medium text-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Emergency support available 24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="shadow-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Our Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-section-bg rounded-lg p-8 text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold text-foreground mb-2">Windhoek Central</h4>
                    <p className="text-muted-foreground mb-4">Namibia</p>
                    <p className="text-sm text-muted-foreground">
                      Exact address will be provided when scheduling an appointment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Need Immediate Help?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              For urgent IT issues, contact us directly via phone or WhatsApp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary-gradient hover:shadow-hero"
                asChild
              >
                <a href="tel:+264818024469">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: +264 818024469
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <a href="https://wa.me/264818024469" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;