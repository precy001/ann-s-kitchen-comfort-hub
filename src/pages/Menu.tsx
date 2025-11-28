import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import breakfastImage from "@/assets/breakfast-special.jpg";
import lunchImage from "@/assets/lunch-special.jpg";
import dinnerImage from "@/assets/dinner-special.jpg";
import drinksImage from "@/assets/drinks-special.jpg";

const Menu = () => {
  const menuCategories = {
    breakfast: [
      { name: "Fluffy Pancakes", description: "Stack of 3 pancakes with syrup and butter", price: "$8.99", image: breakfastImage },
      { name: "Breakfast Combo", description: "Eggs, sausage, toast, and hash browns", price: "$12.99", image: breakfastImage },
      { name: "French Toast", description: "Three slices with fresh berries", price: "$9.99", image: breakfastImage },
      { name: "Omelette Special", description: "Three-egg omelette with your choice of fillings", price: "$11.99", image: breakfastImage },
      { name: "Avocado Toast", description: "Whole grain bread with fresh avocado", price: "$10.99", image: breakfastImage },
      { name: "Breakfast Burrito", description: "Eggs, cheese, and veggies wrapped in tortilla", price: "$11.49", image: breakfastImage },
    ],
    lunch: [
      { name: "Jollof Rice Special", description: "Traditional jollof with grilled chicken", price: "$15.99", image: lunchImage },
      { name: "African Stew", description: "Hearty meat stew with vegetables", price: "$14.99", image: lunchImage },
      { name: "Grilled Chicken Bowl", description: "Marinated chicken with rice and salad", price: "$13.99", image: lunchImage },
      { name: "Plantain & Beans", description: "Fried plantains with seasoned black-eyed beans", price: "$12.99", image: lunchImage },
      { name: "Suya Wrap", description: "Spicy grilled meat in soft wrap", price: "$11.99", image: lunchImage },
      { name: "Veggie Plate", description: "Seasonal vegetables with rice", price: "$10.99", image: lunchImage },
    ],
    dinner: [
      { name: "Grilled Fish Deluxe", description: "Fresh fish with aromatic rice and vegetables", price: "$18.99", image: dinnerImage },
      { name: "Pepper Soup", description: "Spicy traditional soup with meat", price: "$16.99", image: dinnerImage },
      { name: "Egusi Special", description: "Melon seed stew with assorted meat", price: "$17.99", image: dinnerImage },
      { name: "Fried Rice Combo", description: "Nigerian fried rice with chicken", price: "$15.99", image: dinnerImage },
      { name: "Surf & Turf", description: "Grilled shrimp and steak with sides", price: "$22.99", image: dinnerImage },
      { name: "Vegetarian Feast", description: "Mixed vegetables with traditional sides", price: "$14.99", image: dinnerImage },
    ],
    specials: [
      { name: "Weekend Special", description: "Chef's choice three-course meal", price: "$24.99", image: dinnerImage },
      { name: "Family Platter", description: "Serves 4 - Mixed grill with sides", price: "$49.99", image: lunchImage },
      { name: "Date Night Set", description: "Romantic dinner for two", price: "$39.99", image: dinnerImage },
      { name: "Seafood Feast", description: "Mixed seafood with special sauce", price: "$27.99", image: dinnerImage },
    ],
    drinks: [
      { name: "Fresh Mango Smoothie", description: "100% fresh mango blended", price: "$5.99", image: drinksImage },
      { name: "Chapman", description: "Traditional Nigerian mocktail", price: "$4.99", image: drinksImage },
      { name: "Zobo Drink", description: "Hibiscus tea with natural flavors", price: "$3.99", image: drinksImage },
      { name: "Fresh Orange Juice", description: "Freshly squeezed oranges", price: "$4.99", image: drinksImage },
      { name: "Tropical Mix", description: "Blend of tropical fruits", price: "$6.99", image: drinksImage },
      { name: "Soft Drinks", description: "Various sodas and beverages", price: "$2.99", image: drinksImage },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 animate-fade-in-up">
            Our Menu
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our delicious selection of authentic African fusion dishes
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="breakfast" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-2 md:grid-cols-5 mb-12 h-auto">
              <TabsTrigger value="breakfast" className="py-3">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch" className="py-3">Lunch</TabsTrigger>
              <TabsTrigger value="dinner" className="py-3">Dinner</TabsTrigger>
              <TabsTrigger value="specials" className="py-3">Specials</TabsTrigger>
              <TabsTrigger value="drinks" className="py-3">Drinks</TabsTrigger>
            </TabsList>

            {Object.entries(menuCategories).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((item, index) => (
                    <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full font-bold text-lg">
                          {item.price}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                        <p className="text-muted-foreground mb-4 text-sm">{item.description}</p>
                        <Link to="/order">
                          <Button className="w-full hero-gradient text-white hover:opacity-90 transition-opacity">
                            Order This
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
            Can't Decide? Let Us Help!
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Not sure what to order? Give us a call and our friendly staff will help you choose 
            the perfect meal based on your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+1234567890">
              <Button size="lg" className="hero-gradient text-white hover:opacity-90 transition-opacity">
                Call to Order
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
