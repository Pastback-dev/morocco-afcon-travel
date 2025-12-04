import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Landmark, Globe, Mountain, Sun, Ship } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stadium {
  name: string;
  city: string;
  description: string;
}

interface CityData {
  name: string;
  stadiums: Stadium[];
  gradient: string;
  icon: React.ElementType;
}

const citiesAndStadiums: CityData[] = [
  {
    name: "Rabat",
    stadiums: [
      { name: "Complexe Sportif Prince Moulay Abdellah", city: "Rabat", description: "A multi-purpose stadium in Rabat, home to major football events." },
      { name: "Stade Annexe Olympique Complexe Sportif Prince Moulay Abdellah", city: "Rabat", description: "An annex stadium used for training and smaller matches." },
      { name: "Complexe Sportif Prince Héritier Moulay El Hassan", city: "Rabat", description: "A modern sports complex with various facilities." },
      { name: "Stade El Barid", city: "Rabat", description: "A local stadium contributing to the city's football infrastructure." },
    ],
    gradient: "from-primary to-secondary",
    icon: Landmark,
  },
  {
    name: "Casablanca",
    stadiums: [{ name: "Stade Mohammed V", city: "Casablanca", description: "The iconic stadium in Casablanca, a hub for Moroccan football." }],
    gradient: "from-moroccanRed to-gold",
    icon: Building,
  },
  {
    name: "Agadir",
    stadiums: [{ name: "Grand Stade d’Agadir", city: "Agadir", description: "A large, modern stadium in the coastal city of Agadir." }],
    gradient: "from-gold to-electricGreen",
    icon: Sun,
  },
  {
    name: "Fes",
    stadiums: [{ name: "Complexe Sportif de Fès", city: "Fes", description: "A significant stadium in the historic city of Fes." }],
    gradient: "from-royalBlue to-moroccanRed",
    icon: Globe,
  },
  {
    name: "Marrakech",
    stadiums: [{ name: "Grand Stade de Marrakech", city: "Marrakech", description: "A grand stadium in the vibrant city of Marrakech." }],
    gradient: "from-accent to-primary",
    icon: Mountain,
  },
  {
    name: "Tangier",
    stadiums: [{ name: "Grand Stade de Tanger", city: "Tangier", description: "A major stadium in Tangier, the gateway to Africa." }],
    gradient: "from-secondary to-gold",
    icon: Ship,
  },
];

const CityStadiumsPage = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();

  const cityData = citiesAndStadiums.find(city => city.name === cityName);

  if (!cityData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">City Not Found</h1>
          <p className="mb-4 text-xl text-muted-foreground">No stadiums found for "{cityName}".</p>
          <Button onClick={() => navigate("/dashboard")} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4">
      <div className="container mx-auto">
        <Button onClick={() => navigate("/dashboard")} variant="outline" className="mb-8">
          &larr; Back to Dashboard
        </Button>
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">{cityData.name} Stadiums</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the magnificent stadiums in {cityData.name} where the AFCON 2025 action will unfold.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cityData.stadiums.map((stadium, index) => (
            <Link
              key={stadium.name}
              // You can define a specific route for stadium details if needed, e.g., `/stadium-details/${stadium.name.replace(/\s+/g, '-')}`
              to="#" // Placeholder link for now
              className={cn(
                "group relative overflow-hidden rounded-3xl border-2 border-border transition-all hover:scale-105 hover:shadow-glow animate-fade-in",
                `bg-gradient-to-br ${cityData.gradient} text-white` // Apply city's gradient to stadium card
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <Building className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform mb-4" />
                <CardTitle className="text-2xl font-bold mb-2">
                  {stadium.name}
                </CardTitle>
                <CardDescription className="text-white/80">
                  {stadium.description}
                </CardDescription>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityStadiumsPage;