
import { useState, useEffect } from "react";

interface DynamicGreetingProps {
  className?: string;
}

const DynamicGreeting = ({ className = "" }: DynamicGreetingProps) => {
  const [greeting, setGreeting] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    // Determina il saluto in base all'ora
    const hour = new Date().getHours();
    let newGreeting = "";
    
    if (hour >= 5 && hour < 12) {
      newGreeting = "Buongiorno!";
    } else if (hour >= 12 && hour < 18) {
      newGreeting = "Buon pomeriggio!";
    } else {
      newGreeting = "Buonasera!";
    }
    
    setGreeting(newGreeting);
    
    // Ottiene la geolocalizzazione basata su IP (simulato)
    // In produzione useremmo un servizio reale per la geolocalizzazione
    setTimeout(() => {
      setLocation("Udine");
    }, 1000);
  }, []);

  if (!greeting) return null;

  return (
    <div className={`text-sm md:text-base text-gdwater-blue font-medium mb-2 ${className}`}>
      {greeting} {location ? `Ti diamo il benvenuto da ${location}.` : ''}
    </div>
  );
};

export default DynamicGreeting;
