import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hotel as HotelIcon, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Re-defining the data structure for hotels and cities for this page's self-containment.
// In a larger application, this data would ideally be centralized or fetched from an API.
interface Hotel {
  name: string;
  description: string;
  googleMapsLink: string;
  googleMapsEmbedLink: string;
}

interface CityData {
  name: string;
  gradient: string; // Include gradient for consistent styling
  hotels?: Hotel[];
}

const allCitiesAndHotels: CityData[] = [
  {
    name: "Rabat",
    gradient: "from-primary to-secondary",
    hotels: [
      {
        name: "Helnan Chellah Hotel",
        description: "Located in the center of Rabat close to attractions and shopping centers, this hotel features spacious rooms with elegant furniture, minibars, air conditioning, and TVs Com-hotel. The Archaeology Museum is directly in front of the hotel, and the nearest train station is Gare Rabat Ville, which is 1 km away Com-hotel. The hotel offers two on-site restaurants serving Moroccan cuisine, a spa with wellness treatments, and a marina. Guests appreciate its location near the train station and museums, with free WiFi and parking available Hotels.com.",
        googleMapsLink: "https://maps.app.goo.gl/search?q=Helnan+Chellah+Hotel+Rabat",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Helnan+Chellah+Hotel+Rabat&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Le Pietri Urban Hotel",
        description: "This 3-star hotel is situated right in the center of Rabat within walking distance of cultural attractions like Bab Rouah Gate and near the Mohammed VI Museum of Modern and Contemporary Art Allhotelsmorocco. Rabat-ville train station is a 5-minute walk away, and the property is a 5-minute drive from Hassan Tower Booking.com. The hotel features 35 air-conditioned rooms, an on-site restaurant called 'Le Bistrot du Pietri' serving Mediterranean cuisine with live music, and a terrace. Guests consistently praise its excellent location, cleanliness, comfortable rooms, and very helpful staff Booking.com.",
        googleMapsLink: "https://maps.app.goo.gl/search?q=Le+Pietri+Urban+Hotel+Rabat",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Le+Pietri+Urban+Hotel+Rabat&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Cantor Hotel Rabat Terminus (ONOMO Hotel Rabat Terminus)",
        description: "This 4-star hotel is located 300 meters from the Moroccan Parliament and offers city views from its sun terrace and rooftop restaurant Booking.comAllhotelsmorocco. Built as a historic Art Deco building from 1902, it was the first hotel in Rabat and has been completely renovated Allhotelsmorocco. The hotel features 118 air-conditioned rooms, free WiFi and parking, a spa with wellness treatments, a fitness center, and a rooftop bar called 'AZOUR' with panoramic city views. Guests particularly appreciate its location directly across from Rabat Ville train station and its rooftop restaurant with beautiful views Booking.com.",
        googleMapsLink: "https://maps.app.goo.gl/search?q=ONOMO+Hotel+Rabat+Terminus",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=ONOMO+Hotel+Rabat+Terminus&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
    ],
  },
  {
    name: "Casablanca",
    gradient: "from-moroccanRed to-gold",
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
    name: "Marrakech",
    gradient: "from-accent to-primary",
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
  // Other cities with no hotels or empty hotel arrays
  { name: "Agadir", gradient: "from-gold to-electricGreen", hotels: [] },
  { name: "Fes", gradient: "from-royalBlue to-moroccanRed", hotels: [] },
  { name: "Tangier", gradient: "from-secondary to-gold", hotels: [] },
];

const HotelDetailsPage = () => {
  const { hotelName } = useParams<{ hotelName: string }>();
  const navigate = useNavigate();

  const decodedHotelName = decodeURIComponent(hotelName || "");

  let foundHotel: Hotel | undefined;
  let foundCityGradient: string | undefined;

  for (const city of allCitiesAndHotels) {
    const hotel = city.hotels?.find(h => h.name === decodedHotelName);
    if (hotel) {
      foundHotel = hotel;
      foundCityGradient = city.gradient; // Get the gradient from the city
      break;
    }
  }

  if (!foundHotel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Hotel Not Found</h1>
          <p className="mb-4 text-xl text-muted-foreground">No details found for "{decodedHotelName}".</p>
          <Button onClick={() => navigate(-1)} variant="outline">
            &larr; Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4">
      <div className="container mx-auto">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-8">
          &larr; Back to City Stadiums
        </Button>
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">{foundHotel.name}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Detailed information about this recommended hotel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card/50 backdrop-blur-lg border-2 border-border hover:border-primary rounded-3xl transition-all hover:shadow-glow animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-6 w-6 text-primary" /> Hotel Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{foundHotel.description}</p>
              <a
                href={foundHotel.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center px-6 py-3 rounded-full text-lg font-semibold transition-all hover:scale-105",
                  "bg-gradient-to-r text-white hover:opacity-90",
                  foundCityGradient || "from-primary to-secondary" // Fallback gradient
                )}
              >
                <MapPin className="mr-2 h-5 w-5" /> View on Google Maps
              </a>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-lg border-2 border-border hover:border-primary rounded-3xl transition-all hover:shadow-glow animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" /> Location Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-border">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={foundHotel.googleMapsEmbedLink}
                  title={`Map of ${foundHotel.name}`}
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;