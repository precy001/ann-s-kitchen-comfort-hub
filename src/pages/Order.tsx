import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useCart } from "@/contexts/CartContext";
import { Phone, ShoppingBag, CreditCard, MapPin } from "lucide-react";

const Order = () => {
  const { toast } = useToast();
  const { cart, getCartTotal } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [orderDetails, setOrderDetails] = useState("");
  const optionsAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();
  const infoAnimation = useScrollAnimation();

  // Auto-fill order details from cart
  useEffect(() => {
    if (cart.length > 0) {
      const orderText = cart
        .map((item) => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
        .join('\n');
      const total = `\nTotal: $${getCartTotal().toFixed(2)}`;
      setOrderDetails(orderText + total);
    }
  }, [cart, getCartTotal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Order Received!",
      description: "We'll contact you shortly to confirm your order details.",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 animate-fade-in-up">
            Place Your Order
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Quick and easy ordering for delicious home-cooked meals
          </p>
        </div>
      </section>

      {/* Order Options */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div 
            ref={optionsAnimation.ref}
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto animate-on-scroll ${optionsAnimation.isVisible ? 'is-visible' : ''}`}
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 hero-gradient rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Call to Order</h3>
                <p className="text-sm text-muted-foreground mb-4">Quick phone orders</p>
                <a href="tel:+1234567890">
                  <Button variant="outline" className="w-full">
                    +1 (234) 567-890
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">WhatsApp Order</h3>
                <p className="text-sm text-muted-foreground mb-4">Order via WhatsApp</p>
                <a
                  href="https://wa.me/1234567890?text=Hi! I'd like to place an order"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full">
                    Chat on WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Online Form</h3>
                <p className="text-sm text-muted-foreground mb-4">Fill the form below</p>
                <Button variant="outline" className="w-full" onClick={() => {
                  document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  Order Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Form */}
          <Card 
            ref={formAnimation.ref}
            className={`max-w-2xl mx-auto animate-scale-in ${formAnimation.isVisible ? 'is-visible' : ''}`}
            id="order-form"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-display">Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="+1 234 567 890" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label>Delivery Method *</Label>
                  <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="font-medium">Delivery</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Get it delivered to your door</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          <span className="font-medium">Pickup</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Collect from our location</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {deliveryMethod === "delivery" && (
                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full delivery address"
                      required
                      className="min-h-[100px]"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="order">Order Details *</Label>
                  <Textarea
                    id="order"
                    value={orderDetails}
                    onChange={(e) => setOrderDetails(e.target.value)}
                    placeholder="Please specify what you'd like to order (e.g., 2x Jollof Rice Special, 1x Fresh Mango Smoothie)"
                    required
                    readOnly={cart.length > 0}
                    className={`min-h-[120px] ${cart.length > 0 ? 'bg-muted cursor-not-allowed' : ''}`}
                  />
                  {cart.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Order details auto-filled from your cart
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Special Instructions</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any allergies or special requests?"
                    className="min-h-[80px]"
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Payment Methods Accepted:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Cash on Delivery</li>
                    <li>• Credit/Debit Cards</li>
                    <li>• Mobile Money</li>
                    <li>• Bank Transfer</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full hero-gradient text-white hover:opacity-90 transition-opacity text-lg py-6">
                  Submit Order
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our terms and conditions. We'll contact you 
                  shortly to confirm your order and provide the total amount.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div 
            ref={infoAnimation.ref}
            className={`max-w-3xl mx-auto text-center animate-on-scroll ${infoAnimation.isVisible ? 'is-visible' : ''}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Delivery Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-background p-6 rounded-lg">
                <h3 className="font-bold mb-2">Delivery Areas</h3>
                <p className="text-sm text-muted-foreground">
                  We deliver within a 10km radius of our restaurant. Delivery fee varies based on distance.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <h3 className="font-bold mb-2">Delivery Time</h3>
                <p className="text-sm text-muted-foreground">
                  Average delivery time is 30-45 minutes. We'll provide an estimated time when confirming your order.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <h3 className="font-bold mb-2">Minimum Order</h3>
                <p className="text-sm text-muted-foreground">
                  Minimum order value for delivery is $15. No minimum for pickup orders.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <h3 className="font-bold mb-2">Pickup Location</h3>
                <p className="text-sm text-muted-foreground">
                  123 Flavor Street, Food City. Pickup available during opening hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
