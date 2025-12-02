import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Copy, Home, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "N/A";
  const { toast } = useToast();

  const copyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      toast({
        title: "Copied!",
        description: "Order ID copied to clipboard",
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy the order ID manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="max-w-md w-full text-center animate-scale-in">
        <CardContent className="pt-10 pb-8 px-6 space-y-6">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">
              Order Successful!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your order. We're preparing your delicious meal!
            </p>
          </div>

          {/* Order ID Section */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm text-muted-foreground">Your Order ID</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-lg font-mono font-semibold text-primary bg-background px-3 py-1.5 rounded border">
                {orderId}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={copyOrderId}
                className="shrink-0"
                aria-label="Copy order ID"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Save this ID to track your order status
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link to="/track-order" className="flex-1">
              <Button variant="default" className="w-full hero-gradient">
                <FileText className="w-4 h-4 mr-2" />
                Track Order
              </Button>
            </Link>
            <Link to="/" className="flex-1">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-xs text-muted-foreground pt-2">
            You will receive a confirmation call/message shortly with delivery details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
