import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Package as PackageIcon, Edit, Trash2, PlusCircle, Star, Trophy, Crown, Sparkles, LucideIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

const iconMap: { [key: string]: LucideIcon } = {
  Trophy: Trophy,
  Star: Star,
  Crown: Crown,
  Sparkles: Sparkles,
  PackageIcon: PackageIcon, // Fallback
};

const PackageManagementPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchPackages = async () => {
    const { data, error } = await supabase.from("packages").select("*").order("price", { ascending: true });
    if (error) throw error;
    return data;
  };

  const { data: packages, isLoading, isError, error } = useQuery<Package[], Error>({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });

  const deletePackageMutation = useMutation<void, Error, string>({
    mutationFn: async (packageId: string) => {
      const { error } = await supabase.from("packages").delete().eq("id", packageId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
      toast({
        title: "Package Deleted",
        description: "The package has been successfully removed.",
      });
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: `Failed to delete package: ${err.message}`,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8">
        <Button onClick={() => navigate("/admin")} variant="outline" className="mb-8">
          &larr; Back to Admin Dashboard
        </Button>
        <p className="text-destructive text-center">Error loading packages: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="container mx-auto">
        <Button onClick={() => navigate("/admin")} variant="outline" className="mb-8">
          &larr; Back to Admin Dashboard
        </Button>
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Package Management</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Add, edit, or remove travel packages offered on the site.
          </p>
        </div>

        <Card className="bg-card/50">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>All Packages</CardTitle>
            <Button asChild className="bg-gradient-primary hover:opacity-90 text-primary-foreground">
              <Link to="/admin/packages/new">
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Package
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {packages && packages.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Popular</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packages.map((pkg) => {
                      const Icon = iconMap[pkg.icon] || PackageIcon;
                      return (
                        <TableRow key={pkg.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              {pkg.title}
                            </div>
                          </TableCell>
                          <TableCell>${pkg.price.toLocaleString()}</TableCell>
                          <TableCell>{pkg.popular ? "Yes" : "No"}</TableCell>
                          <TableCell className="text-right flex gap-2 justify-end">
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/admin/packages/edit/${pkg.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the{" "}
                                    <span className="font-bold text-foreground">{pkg.title}</span> package.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deletePackageMutation.mutate(pkg.id)}>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center">No packages found. Click "Add New Package" to create one.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PackageManagementPage;