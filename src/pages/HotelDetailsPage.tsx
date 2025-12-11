import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hotel as HotelIcon, MapPin, Info, Ship } from "lucide-react"; // Added Ship
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
    gradient: "from-moroccanRed to-gold",
    hotels: [
      {
        name: "Le 22 Appart'Hotel",
        description: "This 4-star aparthotel is privileged located in the heart of Casablanca's Maarif district, within walking distance of shops, restaurants and public transport Helnan. The property features 22 fully-equipped apartments with kitchenettes including dishwashers, microwaves, refrigerators, ovens, kettles, and coffee machines Com-hotel. Each unit includes a flat-screen TV, free WiFi, a safe, and a private bathroom. The hotel is 7 km from Hassan II Mosque and Morocco Mall, and 30 km from Mohammed V International Airport Helnan. The property offers daily housekeeping, a buffet breakfast, a coffee shop/café, 24-hour fitness center, rooftop terrace, free parking, and meeting facilities. Guests consistently praise the spacious, clean apartments, excellent staff service, and convenient location near shopping and dining.",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Le+22+Appart+Hotel+Casablanca+57+Rue+des+Acacias",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Le+22+Appart+Hotel+Casablanca+57+Rue+des+Acacias&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Stayhere Casablanca – Maarif – Elite Residence",
        description: "This modern aparthotel is located 1.2 km from Casablanca's center in the vibrant Maarif district Tripadvisor. The property features 46 rooms with city views and is about a 5-minute drive from Mohamed V Stadium Lepietri. Each fully-equipped apartment includes air conditioning, free WiFi, a terrace, flat-screen TV with satellite channels, a complete kitchen with dining area, and a private bathroom with shower, free toiletries, and hairdryer Tripadvisor. The hotel is within a 2-km distance of Hassan II Mosque and close to Casablanca Cathedral Lepietri. The property offers fitness classes, free parking, and is walking distance from shops and restaurants. Guests appreciate the excellent central location, cleanliness, spacious and well-equipped apartments, modern fun and chic décor, and very helpful staff Tripadvisor.",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Stayhere+Casablanca+Maarif+Elite+Residence",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Stayhere+Casablanca+Maarif+Elite+Residence&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Kenzi Tower Hotel",
        description: "This luxurious 5-star hotel occupies the 28-story B Tower of Casablanca's iconic Twin Center and has been impressing guests since 2009 with its size, panoramic views, and quality of service Lets Book Hotel. Located in one of Casablanca's Twin Center towers, the hotel offers panoramic views of the city, port and Hassan II Mosque, with guests having free access to a hot tub and indoor heated swimming pool Booking.com. The property features 237 rooms and suites ranging from 38 to 225 square meters, combining elegant décor with modern interior design and breathtaking views Lets Book Hotel. Designed by internationally renowned architect Ricardo Bofill, the hotel is ideally located in the trendy downtown Maarif district, just 30 minutes from Mohammed V International Airport Lets Book Hotel. The hotel offers 4 dining venues including 2 restaurants and 2 bars (including the famous Sky28 rooftop bar on the 28th floor), O-Spa wellness center, free fitness center, free WiFi, and free private parking. Guests praise the stunning city views, spacious comfortable rooms, professional service, and excellent location.",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Kenzi+Tower+Hotel+Casablanca+Twin+Center",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Kenzi+Tower+Hotel+Casablanca+Twin+Center&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Four Seasons Hotel Casablanca",
        description: "This luxury hotel cascades down a hillside toward the Atlantic Ocean, perched on a private beach just 10 minutes from the heart of Morocco's largest city Travel Weekly. Located beside Anfa Place Living Resort, the hotel features a spa center, fitness center, year-round hammam, and multiple dining options Hotels.com. The hotel offers 157 exquisitely designed rooms and suites with modern décor mixed with traditional Moroccan elements including marble floors, colorful fabric accents, traditional moucharabieh and brass work Helnan. Floor-to-ceiling windows open onto private balconies offering unobstructed Atlantic Ocean views Travel Weekly. The property features 3 restaurants including Bleu (signature oceanfront dining), Latitude 33 (poolside), and Mint (afternoon tea service), plus a beach club, infinity pool, world-class Le Spa, and 24-hour fitness center. The hotel is 0.9 miles from Ain Diab Corniche and 1.9 miles from Hassan II Mosque, with Mohammed V International Airport 16 miles away Hotels.com. Guests consistently praise the exceptional service, beautiful oceanfront location, spacious rooms, excellent restaurants, and luxurious spa facilities.",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Four+Seasons+Hotel+Casablanca",
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
        description: "Located at the entrance of Marrakech in the Palmeraie area, Le Relais de Marrakech is set in a garden with a hot tub and offers free Wi-Fi, just a 10-minute drive from Marrakech's Medina Com-hotel. Spanning a vast 3-hectare park, this unique property offers comfortable accommodations in nomad tents, African huts, or air-conditioned Kasbahs, all with traditional Moroccan and Berber decoration Allhotelsmorocco. The domain features a jacuzzi, infinity swimming pool, deckchairs, hammocks, and small lounges all designed to help you relax while enjoying the calm of nature Helnan. Each spacious room, suite, and tent includes a private bathroom with shower, and some have private terraces and seating areas. The on-site restaurant serves Moroccan cuisine on its terrace with views of the beautifully landscaped garden Com-hotel. Additional facilities include a fitness area, spa with massage treatments, beauty services, and a game of pétanque. This property is particularly suitable for families with children, featuring a playground, trampoline, and free-roaming animals like cats, chickens, and peacocks Booking.com. The property also welcomes campers, RVs, and adventure travelers. Guests consistently praise the peaceful atmosphere, friendly staff, beautiful gardens, and excellent value for money.",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Le+Relais+de+Marrakech+Douar+Oulaad+Bellaguid+Marrakech",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Le+Relais+de+Marrakech+Douar+Oulaad+Bellaguid+Marrakech&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Marrakech Ryads Parc All Inclusive",
        description: "This 4-star all-inclusive hotel features an impressive outdoor pool measuring 1,200 square meters with a poolside snack bar offering panoramic views of the Atlas Mountains, plus a 1,400 square meter spa including free use of exercise equipment and an aerobics room Tripadvisor. The hotel combines modern design with traditional Moroccan elements, featuring 260 spacious rooms distributed across 13 ryads, all offering views of the gardens, pool area, or Atlas Mountains Allhotelsmorocco. Opened in 2008, the property blends traditional architecture with the most modern installations MakeMyTrip. Each air-conditioned room includes modern Moroccan décor, a private bathroom, minibar, flat-screen TV, safe, and a terrace or balcony. The all-inclusive hotel offers 4 on-site restaurants serving international and Moroccan cuisine, along with a poolside bar and lounge bar Lepietri. The WUD spa offers massages, body scrubs, body treatments, and facials, while active guests can enjoy bowling, racquetball/squash, basketball, 2 tennis courts, volleyball, soccer field, and a fitness center with yoga classes Booking.com. There's a free kids club for children with daily activities and entertainment programs Allhotelsmorocco. The hotel also features 6 meeting rooms accommodating 70 to 900 people, making it ideal for conferences and conventions. Located in the Ouahat Sidi Brahim area, the hotel is within a 15-minute drive of Jardin Majorelle and Avenue Mohamed VI Hotels.com. Guests appreciate the spacious rooms, excellent staff service, beautiful views, comprehensive facilities, and great value for an all-inclusive resort.",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Marrakech+Ryads+Parc+All+Inclusive+Douar+Ouled+Benrrahmoun",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Marrakech+Ryads+Parc+All+Inclusive+Douar+Ouled+Benrrahmoun&t=&z=13&ie=UTF8&iwloc=&output=embed",
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
  { name: "Agadir", gradient: "from-gold to-electricGreen", hotels: [] },
  { name: "Fes", gradient: "from-royalBlue to-moroccanRed", hotels: [] },
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