import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TravelPackages from "@/components/TravelPackages";
import MatchSchedule from "@/components/MatchSchedule";
import Destinations from "@/components/Destinations";
import ToursActivities from "@/components/ToursActivities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="packages">
          <TravelPackages />
        </div>
        <div id="schedule">
          <MatchSchedule />
        </div>
        <div id="destinations">
          <Destinations />
        </div>
        <div id="tours">
          <ToursActivities />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
