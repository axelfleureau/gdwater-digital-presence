
import { useState, useEffect } from "react";

const TrustBar = () => {
  const [counter, setCounter] = useState(0);
  const targetNumber = 350; // Aziende servite
  const animationDuration = 2000; // 2 secondi
  const frameDuration = 16; // ~60fps
  const totalFrames = Math.round(animationDuration / frameDuration);
  const increment = Math.ceil(targetNumber / totalFrames);

  useEffect(() => {
    // Animazione del contatore solo quando l'elemento è visibile
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let frame = 0;
            const timer = setInterval(() => {
              frame++;
              const newCount = Math.min(increment * frame, targetNumber);
              setCounter(newCount);
              if (frame === totalFrames) clearInterval(timer);
            }, frameDuration);
            
            observer.unobserve(entry.target);
            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('trust-counter');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section className="py-8 bg-gdwater-blue text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 text-center">
          <div id="trust-counter" className="flex items-center">
            <span className="text-3xl md:text-4xl font-bold mr-2">{counter}+</span>
            <span className="text-lg">aziende servite<br/>in Italia</span>
          </div>
          
          <div className="hidden md:block h-10 w-px bg-white/30"></div>
          
          <div className="flex items-center">
            <span className="text-3xl md:text-4xl font-bold mr-2">100+</span>
            <span className="text-lg">installatori<br/>qualificati</span>
          </div>
          
          <div className="hidden md:block h-10 w-px bg-white/30"></div>
          
          <div className="flex items-center">
            <span className="text-lg">Assistenza tecnica<br/><span className="text-3xl md:text-4xl font-bold">dedicata</span></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
