import { Heart, Target, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import kitchenImage from "@/assets/kitchen-team.jpg";

const About = () => {
  const storyAnimation = useScrollAnimation();
  const missionAnimation = useScrollAnimation();
  const valuesAnimation = useScrollAnimation();
  const teamAnimation = useScrollAnimation();
  const whyAnimation = useScrollAnimation();
  
  const values = [
    {
      icon: Heart,
      title: "Passion for Food",
      description: "Every dish is prepared with love and dedication to authentic flavors",
    },
    {
      icon: Target,
      title: "Quality First",
      description: "We never compromise on ingredient quality or preparation standards",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building connections through shared meals and warm hospitality",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A journey of flavors, tradition, and the warmth of home-cooked meals
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div 
            ref={storyAnimation.ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-on-scroll ${storyAnimation.isVisible ? 'is-visible' : ''}`}
          >
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                Welcome to ANN's Kitchen
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ANN's Kitchen was born from a simple desire: to share the comfort and warmth of 
                  home-cooked African meals with our community. Founded by Ann herself, our restaurant 
                  combines generations of family recipes with a modern culinary approach.
                </p>
                <p>
                  Growing up in a household where food was the heart of every gathering, Ann learned 
                  that the best meals are made with love, patience, and the finest ingredients. This 
                  philosophy continues to guide every dish we prepare.
                </p>
                <p>
                  Today, we're proud to serve authentic African fusion cuisine that honors tradition 
                  while embracing innovation. Each plate tells a story, and every flavor brings you 
                  closer to the feeling of home.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={kitchenImage}
                  alt="Our kitchen team"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div 
            ref={missionAnimation.ref}
            className={`max-w-3xl mx-auto text-center mb-12 animate-scale-in ${missionAnimation.isVisible ? 'is-visible' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground">
              To bring people together through exceptional food that celebrates African culinary 
              heritage while creating new traditions. We believe every meal should be an experience 
              that nourishes both body and soul.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
            Our Core Values
          </h2>
          <div 
            ref={valuesAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll ${valuesAnimation.isVisible ? 'is-visible' : ''}`}
          >
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 mx-auto mb-6 hero-gradient rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div 
            ref={teamAnimation.ref}
            className={`max-w-3xl mx-auto text-center animate-on-scroll ${teamAnimation.isVisible ? 'is-visible' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our passionate team of chefs and staff work together to bring you the best dining 
              experience. From our kitchen to your table, every member is dedicated to quality, 
              freshness, and exceptional service.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full"></div>
                <h3 className="font-bold text-lg mb-1">Ann Thompson</h3>
                <p className="text-sm text-muted-foreground">Founder & Head Chef</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-accent to-secondary rounded-full"></div>
                <h3 className="font-bold text-lg mb-1">Chef Marcus</h3>
                <p className="text-sm text-muted-foreground">Executive Chef</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-secondary to-primary rounded-full"></div>
                <h3 className="font-bold text-lg mb-1">Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">Operations Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div 
            ref={whyAnimation.ref}
            className={`max-w-4xl mx-auto animate-scale-in ${whyAnimation.isVisible ? 'is-visible' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
              Why Choose ANN's Kitchen?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Fresh ingredients sourced daily from trusted suppliers",
                "Traditional recipes perfected over generations",
                "Modern kitchen with highest hygiene standards",
                "Fast and reliable delivery service",
                "Sustainable and eco-friendly packaging",
                "Customizable meals for dietary preferences",
                "Passionate team dedicated to your satisfaction",
                "Affordable pricing without compromising quality",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full hero-gradient flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
