import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, Package, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters").max(100),
  category: z.enum(["breakfast", "lunch", "dinner", "specials", "drinks"], {
    required_error: "Please select a category",
  }),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  image: z.any().refine((files) => files?.length > 0, "Image is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Order {
  id: number;
  order_id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  method: string;
  order_details: string;
  amount: number;
  payment_status: string;
  flutterwave_tx_id: string;
  created_at?: string;
}

const Admin = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // Fetch orders
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await fetch("http://localhost/ann-s-kitchen-comfort-hub/backend/api/get_orders.php");
      const result = await response.json();
      if (result.status === "success") {
        setOrders(result.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setValue("image", files, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("image", data.image[0]);

    try {
      const response = await fetch("http://localhost/ann-s-kitchen-comfort-hub/backend/api/upload.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (result.status === "success") {
        toast.success("Product uploaded successfully!");
        reset();
        setImagePreview(null);
        setSelectedCategory("");
      } else {
        toast.error(result?.message || "Upload failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage products and orders</p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Add Product
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="p-6 bg-card border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">All Orders</h2>
                <Button variant="outline" onClick={fetchOrders} disabled={loadingOrders}>
                  {loadingOrders ? "Loading..." : "Refresh"}
                </Button>
              </div>

              {loadingOrders ? (
                <div className="text-center py-12 text-muted-foreground">
                  Loading orders...
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No orders found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-sm">
                            {order.order_id}
                          </TableCell>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>{order.phone}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {order.method}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(order.amount)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={order.payment_status === "paid" ? "default" : "destructive"}
                              className="capitalize"
                            >
                              {order.payment_status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Order Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-muted-foreground">Order ID</p>
                                      <p className="font-mono">{order.order_id}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Amount</p>
                                      <p className="font-semibold">{formatCurrency(order.amount)}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Customer</p>
                                      <p>{order.name}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Phone</p>
                                      <p>{order.phone}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Email</p>
                                      <p>{order.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Delivery Method</p>
                                      <p className="capitalize">{order.method}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-sm">Address</p>
                                    <p className="text-sm">{order.address || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-sm">Notes</p>
                                    <p className="text-sm">{order.notes || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-sm mb-2">Order Items</p>
                                    <pre className="text-xs bg-muted p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
                                      {order.order_details}
                                    </pre>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground text-sm">Transaction ID</p>
                                    <p className="font-mono text-xs">{order.flutterwave_tx_id}</p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="p-8 bg-card border border-border max-w-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-semibold">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Enter product name"
                    className="h-12 text-base"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {String(errors.name.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-semibold">
                    Category
                  </Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value);
                      setValue("category", value as "breakfast" | "lunch" | "dinner" | "specials" | "drinks");
                    }}
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="specials">Specials</SelectItem>
                      <SelectItem value="drinks">Drinks</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">
                      {String(errors.category.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Enter product description"
                    className="min-h-[100px] text-base"
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {String(errors.description.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-base font-semibold">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price")}
                    placeholder="0.00"
                    className="h-12 text-base"
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">
                      {String(errors.price.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-base font-semibold">
                    Product Image
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="h-12 text-base cursor-pointer"
                  />
                  {errors.image && (
                    <p className="text-sm text-destructive">
                      {String(errors.image.message)}
                    </p>
                  )}
                </div>

                {imagePreview && (
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Image Preview</Label>
                    <div className="border border-border rounded-lg p-4 bg-muted/20">
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full h-64 object-cover rounded-md"
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-bold"
                  size="lg"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Product
                </Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
