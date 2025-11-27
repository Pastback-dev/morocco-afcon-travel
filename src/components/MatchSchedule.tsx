import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Filter } from "lucide-react";
import { useState } from "react";

const matches = [
  { date: "Dec 21, 2025", time: "18:00", team1: "Morocco", team2: "TBD", stadium: "Stade Mohammed V, Casablanca", stage: "Group Stage" },
  { date: "Dec 22, 2025", time: "15:00", team1: "Egypt", team2: "TBD", stadium: "Prince Moulay Abdellah, Rabat", stage: "Group Stage" },
  { date: "Dec 22, 2025", time: "18:00", team1: "Senegal", team2: "TBD", stadium: "Grand Stade Marrakech", stage: "Group Stage" },
  { date: "Dec 23, 2025", time: "20:00", team1: "Nigeria", team2: "TBD", stadium: "Stade Ibn Batouta, Tangier", stage: "Group Stage" },
  { date: "Dec 24, 2025", time: "17:00", team1: "Cameroon", team2: "TBD", stadium: "Stade Adrar, Agadir", stage: "Group Stage" },
  { date: "Jan 12, 2026", time: "20:00", team1: "Quarter Final 1", team2: "", stadium: "Stade Mohammed V, Casablanca", stage: "Quarter Final" },
  { date: "Jan 15, 2026", time: "20:00", team1: "Semi Final 1", team2: "", stadium: "Grand Stade Marrakech", stage: "Semi Final" },
  { date: "Jan 18, 2026", time: "20:00", team1: "Final", team2: "", stadium: "Stade Mohammed V, Casablanca", stage: "Final" },
];

const stages = ["All Stages", "Group Stage", "Quarter Final", "Semi Final", "Final"];

const MatchSchedule = () => {
  const [selectedStage, setSelectedStage] = useState("All Stages");

  const filteredMatches = selectedStage === "All Stages" 
    ? matches 
    : matches.filter(match => match.stage === selectedStage);

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Match Schedule</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plan your journey around the most exciting matches of AFCON 2025
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Filter className="h-5 w-5 text-primary self-center" />
          {stages.map((stage) => (
            <Button
              key={stage}
              variant={selectedStage === stage ? "default" : "outline"}
              onClick={() => setSelectedStage(stage)}
              className={`rounded-full ${
                selectedStage === stage 
                  ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                  : "border-border hover:border-primary"
              }`}
            >
              {stage}
            </Button>
          ))}
        </div>

        <div className="space-y-4 max-w-5xl mx-auto">
          {filteredMatches.map((match, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-lg border-2 border-border hover:border-primary rounded-2xl transition-all hover:scale-102 hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                      {match.stage}
                    </span>
                  </div>
                  
                  <div className="text-2xl font-bold mb-3">
                    {match.team1} {match.team2 && `vs ${match.team2}`}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {match.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      {match.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {match.stadium}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchSchedule;