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
  googleMapsLink: string;
  googleMapsEmbedLink: string;
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
    stadiums: [{ name: "Stade Mohammed V", city: "Casablanca", description: "The iconic stadium in Casablanca, a hub for Moroccan football.", imagePlaceholder: "bg-gradient-to-br from-moroccanRed to-gold", imageUrl: "https://fr.hibapress.com/wp-content/uploads/2024/09/Le-groupe-Al-Bayda-fixe-la-date-douverture-du-Stade-Mohammed.jpeg", googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Stade+Mohammed+V+Casablanca", googleMapsEmbedLink: "https://maps.google.com/maps?q=Stade+Mohammed+V+Casablanca&t=&z=13&ie=UTF8&iwloc=&output=embed" }],
    gradient: "from-moroccanRed to-gold",
    icon: Building,
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
    name: "Agadir",
    stadiums: [{ name: "Grand Stade d’Agadir", city: "Agadir", description: "A large, modern stadium in the coastal city of Agadir.", imagePlaceholder: "bg-gradient-to-br from-gold to-electricGreen", imageUrl: "https://leseco.ma/wp-content/uploads/2023/07/Grand-Stade-Adrar-Agadir.jpg", googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Grand+Stade+d%E2%80%99Agadir", googleMapsEmbedLink: "https://maps.google.com/maps?q=Grand+Stade+d%E2%80%99Agadir&t=&z=13&ie=UTF8&iwloc=&output=embed" }],
    gradient: "from-gold to-electricGreen",
    icon: Sun,
    hotels: [], // No specific hotels provided
  },
  {
    name: "Fes",
    stadiums: [{ name: "Complexe Sportif de Fès", city: "Fes", description: "A significant stadium in the historic city of Fes.", imagePlaceholder: "bg-gradient-to-br from-royalBlue to-moroccanRed", imageUrl: "https://sport.le360.ma/resizer/v2/2NIUGCJUTBFZJEFRDYZRPNABVE.jpeg?auth=ceb103447291c6b1bca58fdad1c3ade6a3a01ca3c35376603de67cec54eab&smart=true&width=1216&height=684", googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Complexe+Sportif+de+F%C3%A8s", googleMapsEmbedLink: "https://maps.google.com/maps?q=Complexe+Sportif+de+F%C3%A8s&t=&z=13&ie=UTF8&iwloc=&output=embed" }],
    gradient: "from-royalBlue to-moroccanRed",
    icon: Globe,
    hotels: [],
  },
  {
    name: "Marrakech",
    stadiums: [{ name: "Grand Stade de Marrakech", city: "Marrakech", description: "A grand stadium in the vibrant city of Marrakech.", imagePlaceholder: "bg-gradient-to-br from-accent to-primary", imageUrl: "https://www.anep.ma/sites/default/files/styles/news/public/2023-09/STADE%20KECH%20.jpg?itok=vxs9GHu3", googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Grand+Stade+de+Marrakech", googleMapsEmbedLink: "https://maps.google.com/maps?q=Grand+Stade+de+Marrakech&t=&z=13&ie=UTF8&iwloc=&output=embed" }],
    gradient: "from-accent to-primary",
    icon: Mountain,
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
    stadiums: [{ name: "Grand Stade de Tanger", city: "Tangier", description: "A major stadium in Tangier, the gateway to Africa.", imagePlaceholder: "bg-gradient-to-br from-secondary to-gold", imageUrl: "https://sport.le360.ma/resizer/v2/Z2WTISO555GRTARZBJ2O3YR7LE.JPG?auth=0f582b6063f8b5ed4537897c89db9e813f1a3cbfed93e2224c109d59587d73d3&smart=true&width=1216&height=684", googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Grand+Stade+de+Tanger", googleMapsEmbedLink: "https://maps.google.com/maps?q=Grand+Stade+de+Tanger&t=&z=13&ie=UTF8&iwloc=&output=embed" }],
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
                  <a
                    href={stadium.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105",
                      "bg-gradient-to-r text-white hover:opacity-90",
                      cityData.gradient // Apply the city's gradient here
                    )}
                  >
                    <MapPin className="mr-2 h-4 w-4" /> View on Map
                  </a>
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