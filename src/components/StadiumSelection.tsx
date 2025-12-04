import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Landmark, Globe, Mountain, Sun, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom"; // Import Link

interface Stadium {
  name: string;
  city: string;
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
      { name: "Complexe Sportif Prince Moulay Abdellah", city: "Rabat" },
      { name: "Stade Annexe Olympique Complexe Sportif Prince Moulay Abdellah", city: "Rabat" },
      { name: "Complexe Sportif Prince Héritier Moulay El Hassan", city: "Rabat" },
      { name: "Stade El Barid", city: "Rabat" },
    ],
    gradient: "from-primary to-secondary",
    icon: Landmark,
  },
  {
    name: "Casablanca",
    stadiums: [{ name: "Stade Mohammed V", city: "Casablanca" }],
    gradient: "from-moroccanRed to-gold",
    icon: Building,
  },
  {
    name: "Agadir",
    stadiums: [{ name: "Grand Stade d’Agadir", city: "Agadir" }],
    gradient: "from-gold to-electricGreen",
    icon: Sun,
  },
  {
    name: "Fes",
    stadiums: [{ name: "Complexe Sportif de Fès", city: "Fes" }],
    gradient: "from-royalBlue to-moroccanRed",
    icon: Globe,
  },
  {
    name: "Marrakech",
    stadiums: [{ name: "Grand Stade de Marrakech", city: "Marrakech" }],
    gradient: "from-accent to-primary",
    icon: Mountain,
  },
  {
    name: "Tangier",
    stadiums: [{ name: "Grand Stade de Tanger", city: "Tangier" }],
    gradient: "from-secondary to-gold",
    icon: Ship,
  },
];

const StadiumSelection = () => {
  // We no longer need selectedCity state here as navigation handles it
  // const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // const handleCitySelect = (cityName: string) => {
  //   setSelectedCity(cityName);
  // };

  // const currentCityData = citiesAndStadiums.find(city => city.name === selectedCity);

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle>Explore Host Cities & Stadiums</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Select a city to view its stadiums:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {citiesAndStadiums.map((city) => {
            const CityIcon = city.icon;
            return (
              <Link
                key={city.name}
                to={`/stadiums/${city.name}`} // Navigate to the new page
                className={cn(
                  "rounded-xl p-4 flex flex-col items-center justify-center h-28 w-full text-center transition-all group",
                  `bg-gradient-to-br ${city.gradient} text-primary-foreground shadow-glow border-primary` // Always apply gradient for visual appeal
                )}
              >
                <CityIcon className={cn(
                  "h-8 w-8 mb-2 transition-transform group-hover:scale-110",
                  "text-white" // Always white icon on gradient background
                )} />
                <span className={cn(
                  "font-semibold text-sm",
                  "text-white" // Always white text on gradient background
                )}>
                  {city.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Removed conditional rendering of stadiums as they are now on a separate page */}
      </CardContent>
    </Card>
  );
};

export default StadiumSelection;