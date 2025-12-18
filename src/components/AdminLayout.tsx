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
    if (!loading) {
      if (!user) {
        toast({
          title: "Unauthorized",
          description: "You need to be logged in to access this page.",
          variant: "destructive",
        });
        navigate("/login");
      } else if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You do not have administrative privileges.",
          variant: "destructive",
        });
        navigate("/dashboard"); // Redirect to regular dashboard or home
      }
    }
  }, [user, loading, isAdmin, navigate, toast]);

  if (loading || (!user && !loading) || (user && !isAdmin && !loading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <Outlet />;
};

export default AdminLayout;