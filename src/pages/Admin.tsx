import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters").max(100),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  image: z.any().refine((files) => files?.length > 0, "Image is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

const Admin = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProductFormData) => {
    console.log("Product Data:", {
      name: data.name,
      price: data.price,
      image: data.image[0],
    });
    
    toast.success("Product uploaded successfully!");
    
    // Reset form and preview
    reset();
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Add new products to your menu</p>
        </div>

        <Card className="p-8 bg-card border border-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Name */}
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
                <p className="text-sm text-destructive">{String(errors.name.message)}</p>
              )}
            </div>

            {/* Price */}
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
                <p className="text-sm text-destructive">{String(errors.price.message)}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image" className="text-base font-semibold">
                Product Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={handleImageChange}
                className="h-12 text-base cursor-pointer"
              />
              {errors.image && (
                <p className="text-sm text-destructive">{String(errors.image.message)}</p>
              )}
            </div>

            {/* Image Preview */}
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

            {/* Submit Button */}
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
      </div>
    </div>
  );
};

export default Admin;
