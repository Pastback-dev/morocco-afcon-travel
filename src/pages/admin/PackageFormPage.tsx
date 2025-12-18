import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save, PlusCircle, Package as PackageIcon, Trophy, Star, Crown, Sparkles, LucideIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const packageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().min(1, "Icon is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  features: z.string().min(1, "Features are required (comma-separated)"),
  gradient: z.string().min(1, "Gradient is required"),
  popular: z.boolean().default(false),
});

const availableIcons = [
  { name: "Trophy", component: Trophy },
  { name: "Star", component: Star },
  { name: "Crown", component: Crown },
  { name: "Sparkles", component: Sparkles },
  { name: "PackageIcon", component: PackageIcon },
];

interface Package {
  id: string;
  title: string;
  icon: string;
  price: number;
  description: string;
  features: string[];
  gradient: string;
  popular: boolean;
}

const PackageFormPage = () => {
  const navigate = useNavigate();
  const { packageId } = useParams<{ packageId?: string }>();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof packageSchema>>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      title: "",
      icon: "PackageIcon",
      price: 0,
      description: "",
      features: "",
      gradient: "from-primary to-secondary",
      popular: false,
    },
  });

  const { data: existingPackage, isLoading: isFetchingPackage } = useQuery<Package, Error>({
    queryKey: ["package", packageId],
    queryFn: async () => {
      const { data, error } = await supabase.from("packages").select("*").eq("id", packageId).single();
      if (error) throw error;
      return data;
    },
    enabled: !!packageId,
  });

  useEffect(() => {
    if (packageId && existingPackage) {
      form.reset({
        title: existingPackage.title,
        icon: existingPackage.icon,
        price: existingPackage.price,
        description: existingPackage.description,
        features: existingPackage.features.join(", "),
        gradient: existingPackage.gradient,
        popular: existingPackage.popular,
      });
    }
  }, [packageId, existingPackage, form]);

  const createPackageMutation = useMutation<void, Error, z.infer<typeof packageSchema>>({
    mutationFn: async (newPackage) => {
      const { error } = await supabase.from("packages").insert({
        ...newPackage,
        features: newPackage.features.split(",").map(f => f.trim()),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast({ title: "Success", description: "Package created successfully." });
      navigate("/admin/packages");
    },
    onError: (err) => {
      toast({ title: "Error", description: `Failed to create package: ${err.message}`, variant: "destructive" });
    },
  });

  const updatePackageMutation = useMutation<void, Error, z.infer<typeof packageSchema>>({
    mutationFn: async (updatedPackage) => {
      const { error } = await supabase.from("packages").update({
        ...updatedPackage,
        features: updatedPackage.features.split(",").map(f => f.trim()),
      }).eq("id", packageId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast({ title: "Success", description: "Package updated successfully." });
      navigate("/admin/packages");
    },
    onError: (err) => {
      toast({ title: "Error", description: `Failed to update package: ${err.message}`, variant: "destructive" });
    },
  });

  const onSubmit = (values: z.infer<typeof packageSchema>) => {
    if (packageId) {
      updatePackageMutation.mutate(values);
    } else {
      createPackageMutation.mutate(values);
    }
  };

  if (isFetchingPackage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const isSubmitting = createPackageMutation.isPending || updatePackageMutation.isPending;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="container mx-auto">
        <Button onClick={() => navigate("/admin/packages")} variant="outline" className="mb-8">
          &larr; Back to Package Management
        </Button>
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {packageId ? "Edit Package" : "Add New Package"}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {packageId ? `Modify details for ${existingPackage?.title}` : "Create a new travel package."}
          </p>
        </div>

        <Card className="bg-card/50 max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>{packageId ? "Edit Package Details" : "New Package Details"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., VIP Premium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an icon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableIcons.map((icon) => {
                            const IconComponent = icon.component;
                            return (
                              <SelectItem key={icon.name} value={icon.name}>
                                <div className="flex items-center gap-2">
                                  <IconComponent className="h-4 w-4" /> {icon.name}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1499" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="A short description of the package..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features (comma-separated)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Feature 1, Feature 2, Feature 3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gradient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gradient Class</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., from-primary to-secondary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="popular"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Mark as Popular</FormLabel>
                        <FormDescription>
                          Highlight this package as a popular choice.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground py-6 text-lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : packageId ? (
                    <Save className="mr-2 h-5 w-5" />
                  ) : (
                    <PlusCircle className="mr-2 h-5 w-5" />
                  )}
                  {isSubmitting ? "Saving..." : packageId ? "Save Changes" : "Create Package"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PackageFormPage;