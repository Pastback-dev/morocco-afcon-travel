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
    console.log("AuthContext: Setting up auth state listener.");
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log(`AuthContext: onAuthStateChange event: ${_event}, session:`, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        if (session?.user) {
          console.log("AuthContext: User found in session, fetching profile...");
          // Fetch user profile to get the role
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          if (error) {
            console.error("AuthContext: Error fetching user profile:", error);
            setIsAdmin(false);
          } else {
            const newIsAdmin = profile?.role === "admin";
            console.log(`AuthContext: Profile fetched. User role: ${profile?.role}, isAdmin: ${newIsAdmin}`);
            setIsAdmin(newIsAdmin);
          }
        } else {
          console.log("AuthContext: No user in session, isAdmin set to false.");
          setIsAdmin(false);
        }
      }
    );

    // Fetch initial session and profile
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("AuthContext: Initial getSession call. Session:", session);
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        console.log("AuthContext: Initial session has user, fetching profile...");
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("AuthContext: Error fetching initial user profile:", error);
          setIsAdmin(false);
        } else {
          const newIsAdmin = profile?.role === "admin";
          console.log(`AuthContext: Initial profile fetched. User role: ${profile?.role}, isAdmin: ${newIsAdmin}`);
          setIsAdmin(newIsAdmin);
        }
      } else {
        console.log("AuthContext: Initial session has no user, isAdmin set to false.");
        setIsAdmin(false);
      }
      setLoading(false);
      console.log("AuthContext: Initial loading set to false.");
    });

    return () => {
      console.log("AuthContext: Cleaning up auth state listener.");
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    console.log("AuthContext: Signing out...");
    await supabase.auth.signOut();
    console.log("AuthContext: Signed out, navigating to /login.");
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