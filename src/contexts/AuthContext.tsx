import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>; // Add signOut to the context type
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {}, // Default empty function
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          // Fetch user profile to get the role
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (error) {
            console.error("Error fetching user profile:", error);
            setIsAdmin(false);
          } else {
            setIsAdmin(profile?.role === "admin");
          }
        } else {
          setIsAdmin(false);
        }
      }
    );

    // Fetch initial session and profile
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching initial user profile:", error);
          setIsAdmin(false);
        } else {
          setIsAdmin(profile?.role === "admin");
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // Explicitly navigate to login after sign out
  };

  const value = {
    session,
    user,
    loading,
    isAdmin,
    signOut: handleSignOut, // Provide the signOut function
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};