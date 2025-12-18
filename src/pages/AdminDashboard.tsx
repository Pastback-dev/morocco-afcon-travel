import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Navigation will now be handled by the AdminLayout's useEffect,
    // which will detect the session becoming null and redirect to /login.
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <Card className="bg-card/50 mb-8">
          <CardHeader>
            <CardTitle>Welcome, Admin {user?.email}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">This is your central hub to manage clients, packages, and view revenues.</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card/50 hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Manage Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Add, edit, or remove client accounts.</p>
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground">Go to Clients</Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>View Revenues</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Monitor sales and financial performance.</p>
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground">View Reports</Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle>Manage Packages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Update travel package details and pricing.</p>
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground">Edit Packages</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;