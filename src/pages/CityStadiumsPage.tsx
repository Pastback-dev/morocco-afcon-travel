import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Landmark, Globe, Mountain, Sun, Ship, Eye, Video, Hotel as HotelIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom"; // Import Link

interface Stadium {
  name: string;
  city: string;
  description: string;
  imagePlaceholder: string; // Placeholder for image or gradient class
  imageUrl?: string; // Optional image URL
}

interface Hotel {
  name: string;
  description: string;
  googleMapsLink: string;
  googleMapsEmbedLink: string;
}

interface CityData {
  name: string;
  stadiums: Stadium[];
  gradient: string;
  icon: React.ElementType;
  hotels?: Hotel[]; // Updated to array of Hotel objects
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
    hotels: [
      {
        name: "Helnan Chellah Hotel",
        description: "Located in the center of Rabat close to attractions and shopping centers, this hotel features spacious rooms with elegant furniture, minibars, air conditioning, and TVs Com-hotel. The Archaeology Museum is directly in front of the hotel, and the nearest train station is Gare Rabat Ville, which is 1 km away Com-hotel. The hotel offers two on-site restaurants serving Moroccan cuisine, a spa with wellness treatments, and a marina. Guests appreciate its location near the train station and museums, with free WiFi and parking available Hotels.com.",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Helnan+Chellah+Hotel+Rabat",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Helnan+Chellah+Hotel+Rabat&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Le Pietri Urban Hotel",
        description: "This 3-star hotel is situated right in the center of Rabat within walking distance of cultural attractions like Bab Rouah Gate and near the Mohammed VI Museum of Modern and Contemporary Art Allhotelsmorocco. Rabat-ville train station is a 5-minute walk away, and the property is a 5-minute drive from Hassan Tower Booking.com. The hotel features 35 air-conditioned rooms, an on-site restaurant called 'Le Bistrot du Pietri' serving Mediterranean cuisine with live music, and a terrace. Guests consistently praise its excellent location, cleanliness, comfortable rooms, and very helpful staff Booking.com.",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Le+Pietri+Urban+Hotel+Rabat",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Le+Pietri+Urban+Hotel+Rabat&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Cantor Hotel Rabat Terminus (ONOMO Hotel Rabat Terminus)",
        description: "This 4-star hotel is located 300 meters from the Moroccan Parliament and offers city views from its sun terrace and rooftop restaurant Booking.comAllhotelsmorocco. Built as a historic Art Deco building from 1902, it was the first hotel in Rabat and has been completely renovated Allhotelsmorocco. The hotel features 118 air-conditioned rooms, free WiFi and parking, a spa with wellness treatments, a fitness center, and a rooftop bar called 'AZOUR' with panoramic city views. Guests particularly appreciate its location directly across from Rabat Ville train station and its rooftop restaurant with beautiful views Booking.com.",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=ONOMO+Hotel+Rabat+Terminus",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=ONOMO+Hotel+Rabat+Terminus&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
    ],
  },
  {
    name: "Casablanca",
    stadiums: [{ name: "Stade Mohammed V", city: "Casablanca", description: "The iconic stadium in Casablanca, a hub for Moroccan football.", imagePlaceholder: "bg-gradient-to-br from-moroccanRed to-gold", imageUrl: "https://fr.hibapress.com/wp-content/uploads/2024/09/Le-groupe-Al-Bayda-fixe-la-date-douverture-du-Stade-Mohammed.jpeg" }],
    gradient: "from-moroccanRed to-gold",
    icon: Building,
    hotels: [
      {
        name: "Le 22 Appart'Hotel",
        description: "Modern apartment hotel offering comfortable stays in Casablanca.",
        googleMapsLink: "https://maps.app.goo.gl/search?q=Le+22+Appart%27Hotel+Casablanca",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Le+22+Appart%27Hotel+Casablanca&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Stayhere Casablanca – Maarif – Elite Residence",
        description: "Stylish residence in the Maarif district, ideal for extended stays.",
        googleMapsLink: "https://maps.app.goo.gl/search?q=Stayhere+Casablanca+%E2%80%93+Maarif+%E2%80%93+Elite+Residence",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Stayhere+Casablanca+%E2%80%93+Maarif+%E2%80%93+Elite+Residence&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Kenzi Tower Hotel",
        description: "A landmark hotel offering luxurious accommodation and panoramic city views.",
        googleMapsLink: "https://maps.app.goo.gl/search?q=Kenzi+Tower+Hotel+Casablanca",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Kenzi+Tower+Hotel+Casablanca&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Four Seasons Hotel Casablanca",
        description: "An exquisite beachfront luxury hotel with world-class amenities.",
        googleMapsLink: "https://maps.app.goo.gl/search?q=Four+Seasons+Hotel+Casablanca",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Four+Seasons+Hotel+Casablanca&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
    ],
  },
  {
    name: "Agadir",
    stadiums: [{ name: "Grand Stade d’Agadir", city: "Agadir", description: "A large, modern stadium in the coastal city of Agadir.", imagePlaceholder: "bg-gradient-to-br from-gold to-electricGreen", imageUrl: "https://leseco.ma/wp-content/uploads/2023/07/Grand-Stade-Adrar-Agadir.jpg" }],
    gradient: "from-gold to-electricGreen",
    icon: Sun,
    hotels: [], // No specific hotels provided
  },
  {
    name: "Fes",
    stadiums: [{ name: "Complexe Sportif de Fès", city: "Fes", description: "A significant stadium in the historic city of Fes.", imagePlaceholder: "bg-gradient-to-br from-royalBlue to-moroccanRed", imageUrl: "https://sport.le360.ma/resizer/v2/2NIUGCJUTBFZJEFRDYZRPNABVE.jpeg?auth=ceb103447291c6b1bca58fdad1c3ade6a3a01ca3c35376603de67cec54eab&smart=true&width=1216&height=684" }],
    gradient: "from-royalBlue to-moroccanRed",
    icon: Globe,
    hotels: [],
  },
  {
    name: "Marrakech",
    stadiums: [{ name: "Grand Stade de Marrakech", city: "Marrakech", description: "A grand stadium in the vibrant city of Marrakech.", imagePlaceholder: "bg-gradient-to-br from-accent to-primary", imageUrl: "https://www.anep.ma/sites/default/files/styles/news/public/2023-09/STADE%20KECH%20.jpg?itok=vxs9GHu3" }],
    gradient: "from-accent to-primary",
    icon: Mountain,
    hotels: [
      {
        name: "Le Relais De Marrakech",
        description: "A charming hotel offering a peaceful retreat with traditional Moroccan hospitality.",
        googleMapsLink: "https://maps.app.goo.gl/search?q=Le+Relais+De+Marrakech",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Le+Relais+De+Marrakech&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Marrakech Ryads Parc All Inclusive",
        description: "An all-inclusive resort providing a comprehensive and relaxing stay.",
        googleMapsLink: "https://maps.app.goo.gl/search?q=Marrakech+Ryads+Parc+All+Inclusive",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Marrakech+Ryads+Parc+All+Inclusive&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
    ],
  },
  {
    name: "Tangier",
    stadiums: [{ name: "Grand Stade de Tanger", city: "Tangier", description: "A major stadium in Tangier, the gateway to Africa.", imagePlaceholder: "bg-gradient-to-br from-secondary to-gold", imageUrl: "https://sport.le360.ma/resizer/v2/Z2WTISO555GRTARZBJ2O3YR7LE.JPG?auth=0f582b6063f8b5ed4537897c89db9e813f1a3cbfed93e2224c109d59587d73d3&smart=true&width=1216&height=684" }],
    gradient: "from-secondary to-gold",
    icon: Ship,
    hotels: [],
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

                <Button className={cn(
                  "w-full bg-gradient-to-r text-white rounded-full py-6 text-lg hover:opacity-90 transition-all hover:scale-105",
                  cityData.gradient // Apply the city's gradient here
                )}>
                  Explore Stadium
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {cityData.hotels && cityData.hotels.length > 0 && (
          <div className="animate-fade-in" style={{ animationDelay: `${cityData.stadiums.length * 0.1 + 0.2}s` }}>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HotelIcon className="h-6 w-6 text-primary" /> Recommended Hotels in {cityData.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cityData.hotels.map((hotel, index) => (
                    <Link
                      key={hotel.name}
                      to={`/hotels/${encodeURIComponent(hotel.name)}`} // Link to hotel details page
                      className={cn(
                        "group relative overflow-hidden rounded-3xl bg-card/30 backdrop-blur-lg border-2 border-border hover:border-primary transition-all hover:scale-105 hover:shadow-glow animate-fade-in",
                        `bg-gradient-to-br ${cityData.gradient} text-primary-foreground shadow-glow border-primary`, // Apply city gradient
                        "flex flex-col items-start justify-center p-6 text-white rounded-3xl bg-transparent hover:bg-white/10" // Button-like styling
                      )}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <HotelIcon className="h-8 w-8 text-white mb-2" />
                      <span className="text-lg font-medium text-left">{hotel.name}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityStadiumsPage;