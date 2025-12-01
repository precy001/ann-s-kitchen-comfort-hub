import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const Admin = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  // ⭐ Image preview handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Update form value
      setValue("image", files, { shouldValidate: true });
      
      // Set preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ⭐ Submit form and upload to PHP API
  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("image", data.image[0]); // ⬅ FILE MUST BE HERE

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

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
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
                <p className="text-sm text-destructive">
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            {/* Category */}
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

            {/* Description */}
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
                <p className="text-sm text-destructive">
                  {String(errors.price.message)}
                </p>
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
                <p className="text-sm text-destructive">
                  {String(errors.image.message)}
                </p>
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
