import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-jetBlack border-t border-border pt-16 pb-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              AFCON 2025 Morocco
            </h3>
            <p className="text-muted-foreground mb-4">
              Your premium travel partner for the Africa Cup of Nations 2025 experience in Morocco.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center transition-colors">
                <Youtube className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#packages" className="hover:text-primary transition-colors">Travel Packages</a></li>
              <li><a href="#schedule" className="hover:text-primary transition-colors">Match Schedule</a></li>
              <li><a href="#destinations" className="hover:text-primary transition-colors">Destinations</a></li>
              <li><a href="#tours" className="hover:text-primary transition-colors">Tours & Activities</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>info@afcon2025morocco.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>123 Boulevard Mohammed V, Casablanca, Morocco</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} AFCON 2025 Morocco Travel. All rights reserved.</p>
            <p>Designed with <span className="text-moroccanRed">♥</span> for football fans worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
