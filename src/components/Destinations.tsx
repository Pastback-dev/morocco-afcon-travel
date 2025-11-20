import { Card } from "@/components/ui/card";
import { MapPin, Users, Building2, Palmtree } from "lucide-react";

const destinations = [
  {
    name: "Casablanca",
    icon: Building2,
    description: "Morocco's largest city, blending modern architecture with rich history",
    highlights: ["Hassan II Mosque", "Corniche Beachfront", "Art Deco Architecture"],
    image: "bg-gradient-to-br from-secondary to-primary",
  },
  {
    name: "Marrakech",
    icon: Palmtree,
    description: "The Red City - a magical blend of ancient medinas and modern luxury",
    highlights: ["Jemaa el-Fnaa Square", "Majorelle Garden", "Atlas Mountains"],
    image: "bg-gradient-to-br from-moroccanRed to-gold",
  },
  {
    name: "Rabat",
    icon: MapPin,
    description: "Capital city combining imperial grandeur with coastal charm",
    highlights: ["Hassan Tower", "Kasbah of the Udayas", "Royal Palace"],
    image: "bg-gradient-to-br from-primary to-accent",
  },
  {
    name: "Tangier",
    icon: Users,
    description: "Gateway between Africa and Europe with stunning Mediterranean views",
    highlights: ["Cap Spartel", "Hercules Caves", "Medina of Tangier"],
    image: "bg-gradient-to-br from-secondary to-moroccanRed",
  },
  {
    name: "Agadir",
    icon: Palmtree,
    description: "Modern beach resort city with golden sands and perfect weather",
    highlights: ["Agadir Beach", "Souk El Had", "Paradise Valley"],
    image: "bg-gradient-to-br from-gold to-primary",
  },
  {
    name: "Fes",
    icon: Building2,
    description: "Ancient cultural capital with the world's oldest university",
    highlights: ["Fes el-Bali Medina", "Tanneries", "Al-Qarawiyyin"],
    image: "bg-gradient-to-br from-accent to-secondary",
  },
];

const Destinations = () => {
  return (
    <section className="py-24 px-4 bg-jetBlack relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-moroccanRed rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }}></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-accent bg-clip-text text-transparent">Discover Morocco</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the vibrant host cities of AFCON 2025 and experience authentic Moroccan culture, cuisine, and hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => {
            const Icon = dest.icon;
            return (
              <Card
                key={dest.name}
                className="group relative overflow-hidden rounded-3xl bg-card/30 backdrop-blur-lg border-2 border-border hover:border-primary transition-all hover:scale-105 hover:shadow-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-48 ${dest.image} relative flex items-center justify-center`}>
                  <Icon className="h-16 w-16 text-white/80 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {dest.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{dest.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-primary">Top Attractions:</p>
                    <ul className="space-y-1">
                      {dest.highlights.map((highlight) => (
                        <li key={highlight} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
