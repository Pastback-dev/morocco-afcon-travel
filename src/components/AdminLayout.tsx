import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLayout = () => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log("AdminLayout.tsx useEffect: loading:", loading, "user:", !!user, "isAdmin:", isAdmin);
    if (!loading) {
      if (!user) {
        console.log("AdminLayout.tsx useEffect: No user, redirecting to /login");
        toast({
          title: "Unauthorized",
          description: "You need to be logged in to access this page.",
          variant: "destructive",
        });
        navigate("/login");
      } else if (!isAdmin) {
        console.log("AdminLayout.tsx useEffect: User is not admin, redirecting to /dashboard");
        toast({
          title: "Access Denied",
          description: "You do not have administrative privileges.",
          variant: "destructive",
        });
        navigate("/dashboard"); // Redirect to regular dashboard or home
      } else {
        console.log("AdminLayout.tsx useEffect: User is admin, allowing access.");
      }
    }
  }, [user, loading, isAdmin, navigate, toast]);

  if (loading || (!user && !loading) || (user && !isAdmin && !loading)) {
    console.log("AdminLayout.tsx: Rendering Loader or waiting for auth state.");
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  console.log("AdminLayout.tsx: Rendering Outlet.");
  return <Outlet />;
};

export default AdminLayout;