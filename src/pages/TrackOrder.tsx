import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both Order ID and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - replace with actual backend call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to order details page with order data
      navigate(`/order-details?id=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 hero-gradient text-white">
        <div className="absolute inset-0 dark-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Package className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Track Your Order
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Enter your order details below to check the status of your delivery
          </p>
        </div>
      </section>

      {/* Track Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="orderId"
                    type="text"
                    placeholder="e.g., ORD-123456"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  You can find your order ID in your confirmation email
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter the email used when placing the order
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full hero-gradient text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>Searching...</>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Track Order
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Need help?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+1234567890">
                <Button variant="outline" size="sm">
                  Call Support
                </Button>
              </a>
              <a href="mailto:hello@annkitchen.com">
                <Button variant="outline" size="sm">
                  Email Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold font-display text-center mb-8">
            Order Status Explained
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold mb-2 text-primary">Order Confirmed</h3>
              <p className="text-sm text-muted-foreground">
                Your order has been received and is being prepared in our kitchen
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold mb-2 text-primary">Preparing</h3>
              <p className="text-sm text-muted-foreground">
                Our chefs are cooking your delicious meal with care
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold mb-2 text-primary">Out for Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Your order is on its way to you
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold mb-2 text-primary">Delivered</h3>
              <p className="text-sm text-muted-foreground">
                Your order has been successfully delivered. Enjoy!
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TrackOrder;
