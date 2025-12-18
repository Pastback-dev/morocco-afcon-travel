import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2, DollarSign, Package as PackageIcon, Calendar, User as UserIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface UserPackage {
  id: string;
  user_id: string;
  package_name: string;
  created_at: string;
  package_price: number;
  user_email: string;
}

const RevenueReportsPage = () => {
  const navigate = useNavigate();

  const fetchRevenueData = async () => {
    const { data: userPackagesData, error: userPackagesError } = await supabase
      .from("user_packages")
      .select("id, user_id, package_name, created_at");

    if (userPackagesError) throw userPackagesError;

    const { data: packagesData, error: packagesError } = await supabase
      .from("packages")
      .select("title, price");

    if (packagesError) throw packagesError;

    const packagePrices = new Map(packagesData.map(pkg => [pkg.title, pkg.price]));

    const userIds = [...new Set(userPackagesData.map(up => up.user_id))];
    const { data: usersData, error: usersError } = await supabase
      .from("profiles")
      .select("id, auth_users(email)")
      .in("id", userIds);

    if (usersError) throw usersError;

    const userEmails = new Map(usersData.map((user: any) => [user.id, user.auth_users?.email || "N/A"]));

    let totalRevenue = 0;
    const formattedData: UserPackage[] = userPackagesData.map(up => {
      const price = packagePrices.get(up.package_name) || 0;
      totalRevenue += price;
      return {
        ...up,
        package_price: price,
        user_email: userEmails.get(up.user_id) || "N/A",
      };
    });

    return { formattedData, totalRevenue };
  };

  const { data, isLoading, isError, error } = useQuery<{ formattedData: UserPackage[], totalRevenue: number }, Error>({
    queryKey: ["adminRevenue"],
    queryFn: fetchRevenueData,
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
        <p className="text-destructive text-center">Error loading revenue data: {error?.message}</p>
      </div>
    );
  }

  const { formattedData: revenueData, totalRevenue } = data || { formattedData: [], totalRevenue: 0 };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="container mx-auto">
        <Button onClick={() => navigate("/admin")} variant="outline" className="mb-8">
          &larr; Back to Admin Dashboard
        </Button>
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Revenue Reports</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Overview of all package purchases and total revenue.
          </p>
        </div>

        <Card className="bg-card/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-primary" /> Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ${totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>All Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            {revenueData && revenueData.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Purchased By</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revenueData.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <PackageIcon className="h-4 w-4 text-muted-foreground" />
                            {purchase.package_name}
                          </div>
                        </TableCell>
                        <TableCell>${purchase.package_price.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                            {purchase.user_email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(purchase.created_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-muted-foreground text-center">No packages purchased yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueReportsPage;