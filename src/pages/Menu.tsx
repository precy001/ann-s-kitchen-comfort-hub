import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  category: "breakfast" | "lunch" | "dinner" | "specials" | "drinks";
  price: string;
  image: string;
  created_at: string;
}

const Menu = () => {
  const menuAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuCategories, setMenuCategories] = useState<{
    breakfast: Product[];
    lunch: Product[];
    dinner: Product[];
    specials: Product[];
    drinks: Product[];
  }>({
    breakfast: [],
    lunch: [],
    dinner: [],
    specials: [],
    drinks: [],
  });

  const API_BASE_URL = "http://localhost/ann-s-kitchen-comfort-hub/backend/api";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/get_products.php`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);

        // Group products by category
        const grouped = {
          breakfast: data.filter((p: Product) => p.category === "breakfast"),
          lunch: data.filter((p: Product) => p.category === "lunch"),
          dinner: data.filter((p: Product) => p.category === "dinner"),
          specials: data.filter((p: Product) => p.category === "specials"),
          drinks: data.filter((p: Product) => p.category === "drinks"),
        };

        setMenuCategories(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load menu items. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const formatPrice = (price: string) => {
    return `₦${parseFloat(price).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getImageUrl = (imagePath: string) => {
    // If the path already contains the full URL, return it as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // Otherwise, prepend the API base URL
    return `${API_BASE_URL}/${imagePath}`;
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
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
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
                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">No items available in this category yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={getImageUrl(item.image)}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full font-bold text-lg">
                              {formatPrice(item.price)}
                            </div>
                          </div>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                            <p className="text-muted-foreground mb-4 text-sm">{item.description}</p>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => addToCart(
                                  item.id.toString(),
                                  item.name,
                                  parseFloat(item.price),
                                  getImageUrl(item.image)
                                )}
                                variant="outline"
                                size="icon"
                                className="shrink-0 hover:bg-primary hover:text-white transition-colors"
                                aria-label="Add to cart"
                              >
                                <ShoppingCart className="w-4 h-4" />
                              </Button>
                              <Button 
                                className="w-full hero-gradient text-white hover:opacity-90 transition-opacity"
                                onClick={() => {
                                  addToCart(
                                    item.id.toString(),
                                    item.name,
                                    parseFloat(item.price),
                                    getImageUrl(item.image)
                                  );
                                  navigate('/order');
                                }}
                              >
                                Order Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div 
          ref={ctaAnimation.ref}
          className={`container mx-auto px-4 text-center animate-scale-in ${ctaAnimation.isVisible ? 'is-visible' : ''}`}
        >
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
