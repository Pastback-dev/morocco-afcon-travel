import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles, Trophy, Crown, LucideIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

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
};

const TravelPackages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: packages, isLoading, isError, error } = useQuery<Package[], Error>({
    queryKey: ["packages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("packages").select("*").order("price", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const handleBookNow = (packageName: string, price: number) => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/payment?package=${encodeURIComponent(packageName)}&price=${price}`);
  };

  if (isLoading) {
    return (
      <section className="py-24 px-4 bg-background flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-24 px-4 bg-background text-center text-destructive">
        <p>Error loading packages: {error?.message}</p>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Travel Packages</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your perfect AFCON 2025 experience. All packages include premium services and unforgettable memories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages?.map((pkg, index) => {
            const Icon = iconMap[pkg.icon] || Trophy;
            return (
              <Card
                key={pkg.id}
                className={`relative p-8 bg-card/50 backdrop-blur-lg border-2 ${
                  pkg.popular ? "border-primary shadow-glow scale-105" : "border-border"
                } rounded-3xl overflow-hidden transition-all hover:scale-105 hover:shadow-elegant animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-primary text-primary-foreground text-xs font-bold rounded-full">
                      POPULAR
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.gradient} flex items-center justify-center mb-6`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    ${pkg.price}
                  </span>
                  <span className="text-muted-foreground"> /person</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleBookNow(pkg.title, pkg.price)}
                  className={`w-full bg-gradient-to-r ${pkg.gradient} hover:opacity-90 text-white rounded-full py-6 font-semibold transition-all hover:scale-105`}
                >
                  Book Now
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TravelPackages;