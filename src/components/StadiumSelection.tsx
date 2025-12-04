import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stadium {
  name: string;
  city: string;
}

interface CityData {
  name: string;
  stadiums: Stadium[];
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
  },
  {
    name: "Casablanca",
    stadiums: [{ name: "Stade Mohammed V", city: "Casablanca" }],
  },
  {
    name: "Agadir",
    stadiums: [{ name: "Grand Stade d’Agadir", city: "Agadir" }],
  },
  {
    name: "Fes",
    stadiums: [{ name: "Complexe Sportif de Fès", city: "Fes" }],
  },
  {
    name: "Marrakech",
    stadiums: [{ name: "Grand Stade de Marrakech", city: "Marrakech" }],
  },
  {
    name: "Tangier",
    stadiums: [{ name: "Grand Stade de Tanger", city: "Tangier" }],
  },
];

const StadiumSelection = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
  };

  const currentCityData = citiesAndStadiums.find(city => city.name === selectedCity);

  return (
    <Card className="bg-card/50">
      <CardHeader>
        <CardTitle>Explore Host Cities & Stadiums</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">Select a city to view its stadiums:</p>
        <div className="flex flex-wrap gap-3 mb-8">
          {citiesAndStadiums.map((city) => (
            <Button
              key={city.name}
              variant={selectedCity === city.name ? "default" : "outline"}
              onClick={() => handleCitySelect(city.name)}
              className={cn(
                "rounded-full",
                selectedCity === city.name
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "border-border hover:border-primary"
              )}
            >
              <MapPin className="mr-2 h-4 w-4" />
              {city.name}
            </Button>
          ))}
        </div>

        {selectedCity && currentCityData && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Stadiums in {selectedCity}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentCityData.stadiums.map((stadium) => (
                <Card key={stadium.name} className="p-4 bg-background/50 border border-border rounded-lg">
                  <p className="font-medium text-lg">{stadium.name}</p>
                  <p className="text-sm text-muted-foreground">{stadium.city}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StadiumSelection;