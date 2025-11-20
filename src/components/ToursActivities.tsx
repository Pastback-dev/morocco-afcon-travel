import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mountain, Palmtree, Camera, UtensilsCrossed, Compass, Castle } from "lucide-react";

const activities = [
  {
    title: "Sahara Desert Adventure",
    icon: Palmtree,
    duration: "3 Days / 2 Nights",
    description: "Experience camel treks, luxury desert camps under the stars, and breathtaking dune landscapes",
    highlights: ["Camel Trekking", "Desert Camping", "Sunrise & Sunset", "Berber Culture"],
    gradient: "from-gold to-moroccanRed",
  },
  {
    title: "Atlas Mountains Trek",
    icon: Mountain,
    duration: "Full Day",
    description: "Guided hiking through stunning mountain villages and panoramic valley views",
    highlights: ["Mountain Villages", "Valley Views", "Local Cuisine", "Professional Guide"],
    gradient: "from-primary to-secondary",
  },
  {
    title: "Marrakech Medina Tour",
    icon: Castle,
    duration: "Half Day",
    description: "Explore ancient souks, palaces, and hidden riads in the heart of the Red City",
    highlights: ["Historic Palaces", "Traditional Souks", "Artisan Workshops", "Tea Ceremony"],
    gradient: "from-secondary to-accent",
  },
  {
    title: "Moroccan Cooking Class",
    icon: UtensilsCrossed,
    duration: "4 Hours",
    description: "Learn to prepare authentic tagines and traditional dishes with expert chefs",
    highlights: ["Market Visit", "Hands-on Cooking", "Traditional Recipes", "Dining Experience"],
    gradient: "from-moroccanRed to-primary",
  },
  {
    title: "Photography Tour",
    icon: Camera,
    duration: "Full Day",
    description: "Capture Morocco's most photogenic locations with professional guidance",
    highlights: ["Iconic Locations", "Pro Photography Tips", "Sunset Shots", "Cultural Scenes"],
    gradient: "from-accent to-gold",
  },
  {
    title: "Cultural Heritage Tour",
    icon: Compass,
    duration: "2 Days",
    description: "Immersive journey through UNESCO World Heritage Sites and ancient cities",
    highlights: ["UNESCO Sites", "Ancient Medinas", "Historical Monuments", "Expert Historian"],
    gradient: "from-secondary to-moroccanRed",
  },
];

const ToursActivities = () => {
  return (
    <section className="py-24 px-4 bg-jetBlack relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-gold rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-accent bg-clip-text text-transparent">Tours & Activities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enhance your AFCON experience with unforgettable Moroccan adventures and cultural immersions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <Card
                key={activity.title}
                className="group relative overflow-hidden rounded-3xl bg-card/30 backdrop-blur-lg border-2 border-border hover:border-primary transition-all hover:scale-105 hover:shadow-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-20 bg-gradient-to-r ${activity.gradient} flex items-center justify-center relative`}>
                  <Icon className="h-10 w-10 text-white group-hover:scale-110 transition-transform" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{activity.title}</h3>
                  </div>

                  <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-4">
                    {activity.duration}
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm">{activity.description}</p>

                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-primary">Highlights:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {activity.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className={`w-full bg-gradient-to-r ${activity.gradient} hover:opacity-90 text-white rounded-full transition-all hover:scale-105`}>
                    Book Activity
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToursActivities;
