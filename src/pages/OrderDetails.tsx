import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Package, Mail, Phone, MapPin, Clock, CheckCircle2, Truck, ChefHat, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface OrderData {
  id: string;
  email: string;
  customerName: string;
  phone: string;
  status: "confirmed" | "preparing" | "out-for-delivery" | "delivered";
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  deliveryAddress: string;
  orderDate: string;
  estimatedDelivery: string;
}

const OrderDetails = () => {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const statusAnimation = useScrollAnimation();
  const itemsAnimation = useScrollAnimation();
  const sidebarAnimation = useScrollAnimation();

  const orderId = searchParams.get("id");
  const email = searchParams.get("email");

  useEffect(() => {
    // Simulate fetching order data from backend
    // Replace with actual API call
    setTimeout(() => {
      // Mock data - replace with actual backend response
      setOrderData({
        id: orderId || "ORD-123456",
        email: email || "",
        customerName: "John Doe",
        phone: "+1 (234) 567-890",
        status: "preparing",
        items: [
          { name: "Jollof Rice with Chicken", quantity: 2, price: 15.99 },
          { name: "Plantain Sides", quantity: 1, price: 5.99 },
          { name: "Fresh Juice", quantity: 2, price: 3.99 },
        ],
        total: 45.95,
        deliveryAddress: "123 Main Street, Apt 4B, Food City, FC 12345",
        orderDate: "2024-01-15 14:30",
        estimatedDelivery: "2024-01-15 15:45",
      });
      setIsLoading(false);
    }, 800);
  }, [orderId, email]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="w-5 h-5" />;
      case "preparing":
        return <ChefHat className="w-5 h-5" />;
      case "out-for-delivery":
        return <Truck className="w-5 h-5" />;
      case "delivered":
        return <Package className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Order Confirmed";
      case "preparing":
        return "Preparing Your Order";
      case "out-for-delivery":
        return "Out for Delivery";
      case "delivered":
        return "Delivered";
      default:
        return "Processing";
    }
  };

  const statusSteps = [
    { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
    { key: "preparing", label: "Preparing", icon: ChefHat },
    { key: "out-for-delivery", label: "On the Way", icon: Truck },
    { key: "delivered", label: "Delivered", icon: Package },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const steps = ["confirmed", "preparing", "out-for-delivery", "delivered"];
    const currentIndex = steps.indexOf(currentStatus);
    const stepIndex = steps.indexOf(stepKey);
    
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </main>
    );
  }

  if (!orderData) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find an order with the provided details.
          </p>
          <Link to="/track-order">
            <Button>Try Again</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <Link to="/track-order">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Track Order
            </Button>
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display mb-2">Order Details</h1>
              <p className="text-muted-foreground">Order ID: {orderData.id}</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-lg">
              {getStatusIcon(orderData.status)}
              <span className="font-semibold text-primary">
                {getStatusText(orderData.status)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status Timeline */}
            <div 
              ref={statusAnimation.ref}
              className={`bg-card border border-border rounded-lg p-6 animate-slide-left ${statusAnimation.isVisible ? 'is-visible' : ''}`}
            >
              <h2 className="text-xl font-bold font-display mb-6">Order Status</h2>
              <div className="relative">
                {statusSteps.map((step, index) => {
                  const status = getStepStatus(step.key, orderData.status);
                  const Icon = step.icon;
                  
                  return (
                    <div key={step.key} className="flex items-start gap-4 mb-8 last:mb-0">
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            status === "completed"
                              ? "bg-primary text-primary-foreground"
                              : status === "active"
                              ? "bg-primary/20 text-primary border-2 border-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`w-0.5 h-16 mt-2 ${
                              status === "completed" ? "bg-primary" : "bg-border"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className="font-semibold mb-1">{step.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {status === "completed"
                            ? "Completed"
                            : status === "active"
                            ? "In Progress"
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            <div 
              ref={itemsAnimation.ref}
              className={`bg-card border border-border rounded-lg p-6 animate-slide-left ${itemsAnimation.isVisible ? 'is-visible' : ''}`}
            >
              <h2 className="text-xl font-bold font-display mb-6">Order Items</h2>
              <div className="space-y-4">
                {orderData.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-4 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₦{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₦{orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div 
            ref={sidebarAnimation.ref}
            className={`space-y-6 animate-slide-right ${sidebarAnimation.isVisible ? 'is-visible' : ''}`}
          >
            {/* Customer Info */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-4">Customer Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <span className="break-all">{orderData.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <span>{orderData.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                  <span>{orderData.deliveryAddress}</span>
                </div>
              </div>
            </div>

            {/* Time Info */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold mb-4">Timing</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Order Placed</span>
                  </div>
                  <p className="font-medium ml-6">{orderData.orderDate}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Estimated Delivery</span>
                  </div>
                  <p className="font-medium ml-6">{orderData.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact us if you have any questions about your order
              </p>
              <div className="space-y-2">
                <a href="tel:+1234567890" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Call Support
                  </Button>
                </a>
                <Link to="/contact" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Form
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetails;
