import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import TravelPackages from "@/components/TravelPackages";
import { Loader2 } from "lucide-react";
import StadiumSelection from "@/components/StadiumSelection"; // Import the new component

const Dashboard = () => {
  const { user, session, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const fetchUserPackages = async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from("user_packages")
      .select("package_name, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const {
    data: packages,
    isLoading: packagesLoading,
    isError,
  } = useQuery({
    queryKey: ["userPackages", user?.id],
    queryFn: fetchUserPackages,
    enabled: !!user,
  });

  useEffect(() => {
    if (!authLoading && !session) {
      navigate("/login");
    }
  }, [session, authLoading, navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Navigation will now be handled by the AuthContext's onAuthStateChange listener
    // which will set session to null, triggering the useEffect above to navigate to /login.
  };

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const hasPackages = packages && packages.length > 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <Card className="bg-card/50 mb-8">
          <CardHeader>
            <CardTitle>Welcome, {user.email}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage your travel packages and account details here.</p>
          </CardContent>
        </Card>

        {packagesLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : isError ? (
          <p className="text-destructive text-center">Failed to load your packages. Please try again later.</p>
        ) : hasPackages ? (
          <div className="space-y-8">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle>Your Purchased Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {packages.map((pkg, index) => (
                    <li
                      key={index}
                      className="p-4 border border-border rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold text-lg">{pkg.package_name}</p>
                        <p className="text-sm text-muted-foreground">
                          Purchased on: {new Date(pkg.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" disabled>View Details</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            {/* Display StadiumSelection if user has packages */}
            <StadiumSelection />
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold">You haven't purchased any packages yet.</h2>
              <p className="text-muted-foreground">
                Explore our exclusive packages below and start your AFCON 2025 adventure!
              </p>
            </div>
            <TravelPackages />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;