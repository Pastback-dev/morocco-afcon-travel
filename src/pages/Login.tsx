import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAuth();

  useEffect(() => {
    console.log("Login.tsx useEffect: loading:", loading, "session:", !!session, "isAdmin:", isAdmin);
    if (!loading && session) {
      console.log("Login.tsx useEffect: Session and not loading. Checking isAdmin...");
      if (isAdmin) {
        console.log("Login.tsx useEffect: isAdmin is TRUE. Navigating to /admin");
        navigate("/admin");
      } else {
        console.log("Login.tsx useEffect: isAdmin is FALSE. Navigating to /dashboard");
        navigate("/dashboard");
      }
    }
  }, [session, isAdmin, loading, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Login;