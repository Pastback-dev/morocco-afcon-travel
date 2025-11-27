import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles, Trophy, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const packages = [
  {
    title: "Fan Experience",
    icon: Trophy,
    price: "1,499",
    description: "Perfect for passionate football fans",
    features: [
      "3 Group Stage Match Tickets",
      "4-Star Hotel Accommodation (7 nights)",
      "Round-trip Airport Transfers",
      "Welcome Kit & Fan Merchandise",
      "City Tour in Casablanca",
      "24/7 Customer Support",
    ],
    gradient: "from-primary to-secondary",
    popular: false,
  },
  {
    title: "Standard Package",
    icon: Star,
    price: "2,899",
    description: "Complete tournament experience",
    features: [
      "5 Match Tickets (Group + Knockout)",
      "5-Star Hotel Accommodation (12 nights)",
      "Return Flights Included",
      "All Airport & Stadium Transfers",
      "Guided Tours (Marrakech & Rabat)",
      "Welcome Dinner & Cultural Evening",
      "Dedicated Tour Manager",
      "Travel Insurance",
    ],
    gradient: "from-secondary to-accent",
    popular: true,
  },
  {
    title: "VIP Premium",
    icon: Crown,
    price: "5,999",
    description: "Luxury all-inclusive experience",
    features: [
      "VIP Match Tickets (All Knockout Stages)",
      "Luxury 5-Star Hotel & Riads",
      "Business Class Flights",
      "Private Chauffeur Service",
      "Exclusive Stadium Lounge Access",
      "3-Day Sahara Desert Experience",
      "Atlas Mountains Trek",
      "Private Guided Tours All Cities",
      "Meet & Greet with Legends",
      "Premium Concierge Service",
    ],
    gradient: "from-moroccanRed to-gold",
    popular: false,
  },
  {
    title: "All-Inclusive",
    icon: Sparkles,
    price: "8,499",
    description: "Ultimate premium experience",
    features: [
      "VIP Hospitality Tickets (All Matches)",
      "Presidential Suite Accommodation",
      "First Class Flights & Private Jet Options",
      "Personal Butler & Tour Guide",
      "Behind-the-Scenes Stadium Tours",
      "Week-long Moroccan Cultural Journey",
      "Michelin-Star Dining Experiences",
      "Spa & Wellness Treatments",
      "Helicopter Tours",
      "Exclusive Event Access",
      "Customizable Itinerary",
    ],
    gradient: "from-accent via-primary to-secondary",
    popular: false,
  },
];

const TravelPackages = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleBookNow = async (packageName: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const { error } = await supabase
        .from("user_packages")
        .insert({ user_id: user.id, package_name: packageName });

      if (error) {
        throw error;
      }

      toast({
        title: "Package Booked!",
        description: `You have successfully booked the ${packageName} package.`,
      });

      queryClient.invalidateQueries({ queryKey: ["userPackages", user.id] });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your package. Please try again.",
        variant: "destructive",
      });
      console.error("Booking error:", error);
    }
  };

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
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            return (
              <Card
                key={pkg.title}
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
                  onClick={() => handleBookNow(pkg.title)}
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