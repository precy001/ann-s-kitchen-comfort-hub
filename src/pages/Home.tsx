import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Heart, ShoppingBag, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import heroImage from "@/assets/hero-food.jpg";
import breakfastImage from "@/assets/breakfast-special.jpg";
import lunchImage from "@/assets/lunch-special.jpg";
import dinnerImage from "@/assets/dinner-special.jpg";

const Home = () => {
  const featuresAnimation = useScrollAnimation();
  const dishesAnimation = useScrollAnimation();
  const aboutAnimation = useScrollAnimation();
  const testimonialsAnimation = useScrollAnimation();
  
  const features = [
    { icon: Heart, title: "Fresh Ingredients", description: "Only the finest, freshest ingredients" },
    { icon: Clock, title: "Fast Delivery", description: "Hot meals delivered in 30 minutes" },
    { icon: Star, title: "Premium Quality", description: "Chef-crafted authentic flavors" },
    { icon: ShoppingBag, title: "Easy Ordering", description: "Simple online ordering system" },
  ];

  const featuredDishes = [
    { name: "Breakfast Special", image: breakfastImage, price: "₦6,000", description: "Fluffy pancakes with eggs and fresh fruits" },
    { name: "Lunch Delight", image: lunchImage, price: "₦4,300", description: "Traditional African stew with seasoned meat" },
    { name: "Dinner Premium", image: dinnerImage, price: "₦5,800", description: "Grilled fish with aromatic rice and vegetables" },
  ];

  const testimonials = [
    { name: "Sarah Johnson", text: "The best comfort food in town! Every meal feels like home.", rating: 5 },
    { name: "Michael Chen", text: "Amazing flavors and super fast delivery. Highly recommend!", rating: 5 },
    { name: "Aisha Mohammed", text: "Authentic taste, generous portions, and friendly service.", rating: 5 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Delicious food" className="w-full h-full object-cover" />
          <div className="absolute inset-0 dark-overlay"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6">
            Taste the Comfort of Home
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Experience authentic African fusion cuisine made with love, fresh ingredients, and traditional recipes passed down through generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/order">
              <Button size="lg" className="hero-gradient text-white text-lg px-8 hover:opacity-90 transition-opacity shadow-lg">
                Order Now
              </Button>
            </Link>
            <Link to="/menu">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
            Why Choose ANN's Kitchen?
          </h2>
          <div 
            ref={featuresAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll ${featuresAnimation.isVisible ? 'is-visible' : ''}`}
          >
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 hero-gradient rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Featured Dishes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved meals, crafted with passion and authentic flavors
            </p>
          </div>
          <div 
            ref={dishesAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll ${dishesAnimation.isVisible ? 'is-visible' : ''}`}
          >
            {featuredDishes.map((dish, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full font-semibold">
                    {dish.price}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                  <p className="text-muted-foreground mb-4">{dish.description}</p>
                  <Link to="/order">
                    <Button className="w-full hero-gradient text-white hover:opacity-90 transition-opacity">
                      Order This
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div 
            ref={aboutAnimation.ref}
            className={`max-w-3xl mx-auto text-center animate-scale-in ${aboutAnimation.isVisible ? 'is-visible' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              About ANN's Kitchen
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're a family-run restaurant bringing authentic African fusion cuisine to your table. 
              Our recipes blend traditional flavors with modern culinary techniques, creating meals 
              that warm the heart and satisfy the soul.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Fresh Daily Ingredients</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Authentic Recipes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span>Made with Love</span>
              </div>
            </div>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">
            What Our Customers Say
          </h2>
          <div 
            ref={testimonialsAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll ${testimonialsAnimation.isVisible ? 'is-visible' : ''}`}
          >
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold">— {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
            Ready to Experience the Taste of Home?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Order now and enjoy fresh, delicious meals delivered right to your door
          </p>
          <Link to="/order">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Place Your Order
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
