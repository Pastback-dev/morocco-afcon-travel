import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stadium {
  name: string;
  city: string;
  description: string;
  imagePlaceholder: string;
  imageUrl?: string;
  googleMapsLink: string;
  googleMapsEmbedLink: string;
}

interface CityData {
  name: string;
  stadiums: Stadium[];
  gradient: string;
}

const allCitiesAndStadiums: CityData[] = [
  {
    name: "Rabat",
    stadiums: [
      {
        name: "Complexe Sportif Prince Moulay Abdellah",
        city: "Rabat",
        description: "This is a football stadium in Rabat with a seating capacity of 69,500, opened on September 5, 2025, and serves as the home stadium of Morocco's national football team Expedia. The stadium underwent complete demolition in August 2023 to construct a new venue that meets FIFA standards, with the project accelerated following Morocco's selection to host the 2025 Africa Cup of Nations and the 2030 FIFA World Cup Com-hotel. Designed by the prestigious international firm Populous, the stadium features a luminous LED parametric facade covering 100,000 square meters with 19,200 unique aluminum triangles and 70 km of LED strips that create spectacular light shows Vivehotels. The Prince Héritier Moulay El Hassan officially inaugurated the stadium on September 4, 2025, representing King Mohammed VI Com-hotel. The venue is part of a larger sports complex that includes an athletics stadium, the indoor Salle Moulay Abdellah arena, and an Olympic swimming pool Helnan. The stadium features a panoramic roof, VIP and VVIP hospitality areas, 110 luxury boxes, five hospitality lounges with nearly 5,400 seats, a press tribune with 1,803 seats, and Africa's first hybrid natural grass pitch combining natural turf with synthetic fibers Hotels.com. The complex is designated to host the opening match and final of AFCON 2025, as well as a semi-final of the 2030 FIFA World Cup. Located 7km from the center of Rabat, the complex is adjacent to Rabat Zoo and surrounded by the capital's green belt covering 1,000 hectares Helnan.",
        imagePlaceholder: "bg-gradient-to-br from-primary to-secondary",
        imageUrl: "https://cdn.tfcstadiums.com/wp-content/uploads/2024/12/moulay2.jpg",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Complexe+Sportif+Prince+Moulay+Abdellah+Rabat",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Complexe+Sportif+Prince+Moulay+Abdellah+Rabat&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Stade Annexe Olympique - Complexe Sportif Prince Moulay Abdellah",
        city: "Rabat",
        description: "This athletics stadium has a total capacity of 21,000 seats and was constructed in just nine months with a budget of nearly 528 million dirhams Lepietri. It was inaugurated on May 25, 2025, for the return of the Mohammed VI International Athletics Meeting to Rabat, which constitutes the fourth stage of the 2025 Diamond League Lepietri. This stadium was built to replace the athletics track that was removed from the main Prince Moulay Abdellah Stadium Lepietri. The stadium features a track meeting international standards and high-quality facilities designed to enable athletes to achieve top-level performances Tripadvisor. With a capacity of 21,000 seats, the stadium is equipped with an internationally-standard track and facilities meeting the strictest requirements in athletics Trip.com. The Olympic Stadium will be one of the smallest venues of the tournament but is designed to host matches for the 2025 African Cup of Nations HRS, specifically selected for the third-place playoff. The stadium is integrated into the vast renovation project of the Moulay Abdellah Complex and symbolically replaces the old track from the main stadium.",
        imagePlaceholder: "bg-gradient-to-br from-primary to-secondary",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Stade+Olympique+Rabat+Complexe+Moulay+Abdellah",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Stade+Olympique+Rabat+Complexe+Moulay+Abdellah&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Complexe Sportif Prince Héritier Moulay El Hassan",
        city: "Rabat",
        description: "Located in the heart of Rabat, this stadium is the historical home of FUS Rabat soccer team which plays in the 1st division Booking.com. The old stadium was renovated in 2012 and demolished in 2024 as part of Morocco's preparations to host the 2025 Africa Cup of Nations and the 2025 FIFA U-17 Women's World Cup Allhotelsmorocco. The renovation project includes expanding the stadium's capacity to 22,000 and constructing commercial centers within the venue to make it a true urban stadium fully integrated with surrounding public spaces to actively contribute to the life of Morocco's capital Allhotelsmorocco. The stadium features a contemporary and environmentally conscious expression of Moroccan culture, combining glazed terracotta—an ancestral material and craftsmanship—with cutting-edge technology and engineering, creating an iconic design that rises majestically into the Rabat skyline Booking.com. The main concept was to completely rethink the relationship between the stadium and the city, creating wide planted forecourts along the avenues directly overlooked by facades integrating ticket offices, access points, stores and catering areas Booking.com. The facades are composed of five diamond-shaped modules measuring 2x1m inspired by Berber motifs, creating a bioclimatic skin that provides through-ventilation for the entire stadium, perfectly suited to Rabat's climate Booking.com. The stadium will host the opening match of AFCON 2025 between Morocco and the Comoros on December 21 HRS. The venue also includes an indoor sports complex with a multi-sports hall, dojo, and swimming pool.",
        imagePlaceholder: "bg-gradient-to-br from-primary to-secondary",
        imageUrl: "https://sport.le360.ma/resizer/v2/5NRFR2WLRJELXJA3UC6LSIEVUY.jpg?auth=cfbab0d73e68cf8a4f6d4ab9892b410cf4f9aa5585562058dd20c98300f8a22a&smart=true&width=1216&height=684",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Complexe+Sportif+Prince+Heritier+Moulay+El+Hassan+Rabat",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Complexe+Sportif+Prince+Heritier+Moulay+El+Hassan+Rabat&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
      {
        name: "Stade El Barid",
        city: "Rabat",
        description: "Originally built in 1970 with only 2,000 spectators capacity, the stadium served as the long-time home ground of Union Touarga Sports Mapcarta. The stadium has been completely rebuilt to FIFA specifications with a total capacity of 18,000 seats Hotels.com. Over 1.5 billion dirhams were invested in the demolition and reconstruction of the stadium, with the main construction contract awarded to TGCC group and Inter Tridim Travel Weekly. One of the most striking features of the renovated stadium is its innovative roof design inspired by the shape of a protective cloud, which provides shade from the sun, shelter from rain, and even collects rainwater for pitch irrigation Mapcarta. The structure incorporates solar panels, making the stadium environmentally sustainable and energy efficient Mapcarta. The stadium features a natural grass pitch, tribunes with seats in blue, sky blue and white colors, two giant screens dominating the curves, modern glass facades, and an impressive metal frame roof structure Travel Weekly. The stadium was inaugurated on November 13, 2025, with the semi-final of the African World Cup 2026 playoffs between Cameroon and the Democratic Republic of Congo Com-hotel. Located in the heart of Agdal in Rabat, the stadium benefits from a privileged location near strategic neighborhoods and public transport Reserving. The venue will host several matches during AFCON 2025, including Round of 16 fixtures.",
        imagePlaceholder: "bg-gradient-to-br from-primary to-secondary",
        imageUrl: "https://goodmove.ma/wp-content/uploads/2025/11/Stade-Al-Barid-edited.webp",
        googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Stade+Al+Barid+Agdal+Rabat",
        googleMapsEmbedLink: "https://maps.google.com/maps?q=Stade+Al+Barid+Agdal+Rabat&t=&z=13&ie=UTF8&iwloc=&output=embed",
      },
    ],
    gradient: "from-primary to-secondary",
  },
  {
    name: "Casablanca",
    stadiums: [{
      name: "Stade Mohammed V",
      city: "Casablanca",
      description: "The iconic stadium in Casablanca, a hub for Moroccan football.",
      imagePlaceholder: "bg-gradient-to-br from-moroccanRed to-gold",
      imageUrl: "https://fr.hibapress.com/wp-content/uploads/2024/09/Le-groupe-Al-Bayda-fixe-la-date-douverture-du-Stade-Mohammed.jpeg",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Stade+Mohammed+V+Casablanca",
      googleMapsEmbedLink: "https://maps.google.com/maps?q=Stade+Mohammed+V+Casablanca&t=&z=13&ie=UTF8&iwloc=&output=embed",
    }],
    gradient: "from-moroccanRed to-gold",
  },
  {
    name: "Agadir",
    stadiums: [{
      name: "Grand Stade d’Agadir",
      city: "Agadir",
      description: "A large, modern stadium in the coastal city of Agadir.",
      imagePlaceholder: "bg-gradient-to-br from-gold to-electricGreen",
      imageUrl: "https://leseco.ma/wp-content/uploads/2023/07/Grand-Stade-Adrar-Agadir.jpg",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Grand+Stade+d%E2%80%99Agadir",
      googleMapsEmbedLink: "https://maps.google.com/maps?q=Grand+Stade+d%E2%80%99Agadir&t=&z=13&ie=UTF8&iwloc=&output=embed",
    }],
    gradient: "from-gold to-electricGreen",
  },
  {
    name: "Fes",
    stadiums: [{
      name: "Complexe Sportif de Fès",
      city: "Fes",
      description: "A significant stadium in the historic city of Fes.",
      imagePlaceholder: "bg-gradient-to-br from-royalBlue to-moroccanRed",
      imageUrl: "https://sport.le360.ma/resizer/v2/2NIUGCJUTBFZJEFRDYZRPNABVE.jpeg?auth=ceb103447291c6b1bca58fdad1c3ade6a3a01ca3c35376603de67cec54eab&smart=true&width=1216&height=684",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Complexe+Sportif+de+F%C3%A8s",
      googleMapsEmbedLink: "https://maps.google.com/maps?q=Complexe+Sportif+de+F%C3%A8s&t=&z=13&ie=UTF8&iwloc=&output=embed",
    }],
    gradient: "from-royalBlue to-moroccanRed",
  },
  {
    name: "Marrakech",
    stadiums: [{
      name: "Grand Stade de Marrakech",
      city: "Marrakech",
      description: "A grand stadium in the vibrant city of Marrakech.",
      imagePlaceholder: "bg-gradient-to-br from-accent to-primary",
      imageUrl: "https://www.anep.ma/sites/default/files/styles/news/public/2023-09/STADE%20KECH%20.jpg?itok=vxs9GHu3",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Grand+Stade+de+Marrakech",
      googleMapsEmbedLink: "https://maps.google.com/maps?q=Grand+Stade+de+Marrakech&t=&z=13&ie=UTF8&iwloc=&output=embed",
    }],
    gradient: "from-accent to-primary",
  },
  {
    name: "Tangier",
    stadiums: [{
      name: "Grand Stade de Tanger",
      city: "Tangier",
      description: "A major stadium in Tangier, the gateway to Africa.",
      imagePlaceholder: "bg-gradient-to-br from-secondary to-gold",
      imageUrl: "https://sport.le360.ma/resizer/v2/Z2WTISO555GRTARZBJ2O3YR7LE.JPG?auth=0f582b6063f8b5ed4537897c89db9e813f1a3cbfed93e2224c109d59587d73d3&smart=true&width=1216&height=684",
      googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Grand+Stade+de+Tanger",
      googleMapsEmbedLink: "https://maps.google.com/maps?q=Grand+Stade+de+Tanger&t=&z=13&ie=UTF8&iwloc=&output=embed",
    }],
    gradient: "from-secondary to-gold",
  },
];

const StadiumDetailsPage = () => {
  const { stadiumName } = useParams<{ stadiumName: string }>();
  const navigate = useNavigate();

  const decodedStadiumName = decodeURIComponent(stadiumName || "");

  let foundStadium: Stadium | undefined;
  let foundCityGradient: string | undefined;

  for (const city of allCitiesAndStadiums) {
    const stadium = city.stadiums?.find(s => s.name === decodedStadiumName);
    if (stadium) {
      foundStadium = stadium;
      foundCityGradient = city.gradient;
      break;
    }
  }

  if (!foundStadium) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Stadium Not Found</h1>
          <p className="mb-4 text-xl text-muted-foreground">No details found for "{decodedStadiumName}".</p>
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
            <span className="bg-gradient-primary bg-clip-text text-transparent">{foundStadium.name}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Detailed information about this magnificent stadium.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card/50 backdrop-blur-lg border-2 border-border hover:border-primary rounded-3xl transition-all hover:shadow-glow animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-6 w-6 text-primary" /> Stadium Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{foundStadium.description}</p>
              <a
                href={foundStadium.googleMapsLink}
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
                  src={foundStadium.googleMapsEmbedLink}
                  title={`Map of ${foundStadium.name}`}
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StadiumDetailsPage;