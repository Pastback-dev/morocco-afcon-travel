import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-12-21T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-jetBlack via-background to-jetBlack"></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-moroccanRed rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container relative z-10 px-4 py-20 animate-fade-in">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-full text-sm font-semibold uppercase tracking-wider shadow-glow">
              Africa Cup of Nations 2025
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Experience AFCON
            </span>
            <br />
            <span className="text-foreground">in Morocco</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Premium travel packages for the ultimate football experience. Flights, hotels, tickets, and exclusive Moroccan adventures.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto py-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-card/50 backdrop-blur-lg border border-border rounded-2xl p-6 shadow-elegant">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-muted-foreground uppercase mt-2">{unit}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-glow transition-all hover:scale-105">
              <Ticket className="mr-2 h-5 w-5" />
              View Packages
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary text-foreground px-8 py-6 text-lg rounded-full hover:bg-primary/10 transition-all hover:scale-105">
              <Calendar className="mr-2 h-5 w-5" />
              Match Schedule
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>6 Host Cities</span>
            </div>
            <div className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-primary" />
              <span>52 Matches</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Dec 21, 2025 - Jan 18, 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
