import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Landmark, Globe, Mountain, Sun, Ship, Eye, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stadium {
  name: string;
  city: string;
  description: string;
  imagePlaceholder: string; // Placeholder for image or gradient class
  imageUrl?: string; // Optional image URL
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
      { name: "Complexe Sportif Prince Moulay Abdellah", city: "Rabat", description: "A multi-purpose stadium in Rabat, home to major football events.", imagePlaceholder: "bg-gradient-to-br from-primary to-secondary", imageUrl: "https://cdn.tfcstadiums.com/wp-content/uploads/2024/12/moulay2.jpg" },
      { name: "Stade Annexe Olympique Complexe Sportif Prince Moulay Abdellah", city: "Rabat", description: "An annex stadium used for training and smaller matches.", imagePlaceholder: "bg-gradient-to-br from-primary to-secondary" },
      { name: "Complexe Sportif Prince Héritier Moulay El Hassan", city: "Rabat", description: "A modern sports complex with various facilities.", imagePlaceholder: "bg-gradient-to-br from-primary to-secondary", imageUrl: "https://sport.le360.ma/resizer/v2/5NRFR2WLRJELXJA3UC6LSIEVUY.jpg?auth=cfbab0d73e68cf8a4f6d4ab9892b410cf4f9aa5585562058dd20c98300f8a22a&smart=true&width=1216&height=684" },
      { name: "Stade El Barid", city: "Rabat", description: "A local stadium contributing to the city's football infrastructure.", imagePlaceholder: "bg-gradient-to-br from-primary to-secondary", imageUrl: "https://goodmove.ma/wp-content/uploads/2025/11/Stade-Al-Barid-edited.webp" },
    ],
    gradient: "from-primary to-secondary",
    icon: Landmark,
  },
  {
    name: "Casablanca",
    stadiums: [{ name: "Stade Mohammed V", city: "Casablanca", description: "The iconic stadium in Casablanca, a hub for Moroccan football.", imagePlaceholder: "bg-gradient-to-br from-moroccanRed to-gold" }],
    gradient: "from-moroccanRed to-gold",
    icon: Building,
  },
  {
    name: "Agadir",
    stadiums: [{ name: "Grand Stade d’Agadir", city: "Agadir", description: "A large, modern stadium in the coastal city of Agadir.", imagePlaceholder: "bg-gradient-to-br from-gold to-electricGreen" }],
    gradient: "from-gold to-electricGreen",
    icon: Sun,
  },
  {
    name: "Fes",
    stadiums: [{ name: "Complexe Sportif de Fès", city: "Fes", description: "A significant stadium in the historic city of Fes.", imagePlaceholder: "bg-gradient-to-br from-royalBlue to-moroccanRed" }],
    gradient: "from-royalBlue to-moroccanRed",
    icon: Globe,
  },
  {
    name: "Marrakech",
    stadiums: [{ name: "Grand Stade de Marrakech", city: "Marrakech", description: "A grand stadium in the vibrant city of Marrakech.", imagePlaceholder: "bg-gradient-to-br from-accent to-primary" }],
    gradient: "from-accent to-primary",
    icon: Mountain,
  },
  {
    name: "Tangier",
    stadiums: [{ name: "Grand Stade de Tanger", city: "Tangier", description: "A major stadium in Tangier, the gateway to Africa.", imagePlaceholder: "bg-gradient-to-br from-secondary to-gold" }],
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

  const CityIcon = cityData.icon;

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
            <Card
              key={stadium.name}
              className="group relative overflow-hidden rounded-3xl bg-card/30 backdrop-blur-lg border-2 border-border hover:border-primary transition-all hover:scale-105 hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={cn("h-48 relative flex items-center justify-center overflow-hidden", stadium.imageUrl ? "" : stadium.imagePlaceholder)}>
                {stadium.imageUrl ? (
                  <img src={stadium.imageUrl} alt={stadium.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <CityIcon className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
              </div>

              <div className="p-6">
                <CardTitle className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Building className="h-6 w-6 text-primary" />
                  {stadium.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground mb-4">
                  {stadium.description}
                </CardDescription>

                <div className="flex gap-4 mb-6">
                  <Button variant="outline" className="flex-1 rounded-full">
                    <Eye className="mr-2 h-4 w-4" /> Galerie
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-full">
                    <Video className="mr-2 h-4 w-4" /> Vidéo
                  </Button>
                </div>

                <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground rounded-full py-6 text-lg">
                  Explore Stadium
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityStadiumsPage;