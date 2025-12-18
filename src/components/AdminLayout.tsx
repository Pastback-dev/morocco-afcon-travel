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
    console.log("AdminLayout.tsx useEffect: loading:", loading, "user:", !!user, "isAdmin (Supabase):", isAdmin, "isAdmin (localStorage):", localStorage.getItem("admin_connected") === "true");
    
    const isHardcodedAdmin = localStorage.getItem("admin_connected") === "true";

    if (!loading) {
      if (!user && !isHardcodedAdmin) {
        console.log("AdminLayout.tsx useEffect: No user and not hardcoded admin, redirecting to /login");
        toast({
          title: "Unauthorized",
          description: "You need to be logged in to access this page.",
          variant: "destructive",
        });
        navigate("/login");
      } else if (user && !isAdmin && !isHardcodedAdmin) {
        console.log("AdminLayout.tsx useEffect: User exists but not Supabase admin and not hardcoded admin, redirecting to /dashboard");
        toast({
          title: "Access Denied",
          description: "You do not have administrative privileges.",
          variant: "destructive",
        });
        navigate("/dashboard"); // Redirect to regular dashboard or home
      } else {
        console.log("AdminLayout.tsx useEffect: User is admin (Supabase or hardcoded), allowing access.");
      }
    }
  }, [user, loading, isAdmin, navigate, toast]);

  // Show loader if still loading auth state
  // Or if no user and not hardcoded admin (and not loading anymore)
  // Or if user exists but is neither Supabase admin nor hardcoded admin (and not loading anymore)
  if (loading || (!user && !loading && localStorage.getItem("admin_connected") !== "true") || (user && !isAdmin && localStorage.getItem("admin_connected") !== "true" && !loading)) {
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