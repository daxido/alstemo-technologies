import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import InteractiveBackground from '@/components/InteractiveBackground';
import aboutTeam from '@/assets/about-team.jpg';

const About = () => {
  const values = [
    {
      title: 'Innovation',
      description: 'We embrace cutting-edge technology solutions to solve complex problems.'
    },
    {
      title: 'Affordability',
      description: 'Quality IT services should be accessible to everyone, regardless of budget.'
    },
    {
      title: 'Excellence',
      description: 'We strive for perfection in every service we deliver to our clients.'
    },
    {
      title: 'Community',
      description: 'Supporting local businesses and individuals in their digital transformation journey.'
    }
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
              About ALSTEMO Technologies
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Passionate Youth
              <span className="block text-primary">Driving Innovation</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Founded by ambitious young entrepreneurs in Namibia, we're on a mission to make 
              technology accessible, affordable, and reliable for everyone in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Company Profile Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ALSTEMO Technologies was born from a simple observation: many Namibians struggle 
                with technology issues but face barriers accessing quality IT support due to high 
                costs and limited availability.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                As young tech enthusiasts, we saw an opportunity to bridge this gap by offering 
                professional IT services at affordable rates. Our team combines technical expertise 
                with a deep understanding of local needs, ensuring solutions that truly work for 
                our community.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we're proud to serve individuals, small businesses, and organizations 
                across Namibia, helping them harness technology to achieve their goals.
              </p>
            </div>
            <div>
              <img 
                src={aboutTeam} 
                alt="ALSTEMO Technologies Team"
                className="rounded-lg shadow-card w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="shadow-card border-border">
                <CardContent className="p-8">
                  <div className="bg-primary-gradient p-4 rounded-full w-16 h-16 mb-6 flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Our Vision</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To become Namibia's leading provider of affordable IT solutions, empowering 
                    every individual and business to thrive in the digital age through accessible 
                    technology services.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-border">
                <CardContent className="p-8">
                  <div className="bg-primary-gradient p-4 rounded-full w-16 h-16 mb-6 flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To bridge the technology gap in Namibia by providing professional, reliable, 
                    and affordable IT services while fostering digital literacy and technological 
                    growth in our communities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={value.title} className="shadow-card hover:shadow-hero transition-smooth border-border">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary-gradient p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 bg-section-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
              Making a Difference
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100+</div>
                <p className="text-lg text-muted-foreground">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <p className="text-lg text-muted-foreground">Devices Repaired</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
                <p className="text-lg text-muted-foreground">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;