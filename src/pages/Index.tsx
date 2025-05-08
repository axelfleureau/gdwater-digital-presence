
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Soluzioni from "@/components/Soluzioni";
import TrustBar from "@/components/TrustBar";
import Certificazioni from "@/components/Certificazioni";
import Vantaggi from "@/components/Vantaggi";
import Prodotti from "@/components/Prodotti";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { useEffect } from "react";

const Index = () => {
  // Implementazione base per analytics
  useEffect(() => {
    // Questa funzione simulerebbe l'inizializzazione di GA4 o altri strumenti di analytics
    const initAnalytics = () => {
      console.log("Analytics initialized");
      
      // Tracciamento della visualizzazione della pagina
      const trackPageView = () => {
        console.log("Page view tracked");
      };
      
      // Tracciamento degli eventi di click
      const setupEventTracking = () => {
        const trackableElements = document.querySelectorAll("[data-track]");
        trackableElements.forEach(el => {
          el.addEventListener("click", (e) => {
            const element = e.currentTarget as HTMLElement;
            const eventName = element.getAttribute("data-track");
            console.log(`Tracked event: ${eventName}`);
          });
        });
      };
      
      // Tracciamento della profondità di scroll
      const setupScrollTracking = () => {
        let maxScroll = 0;
        const trackScroll = () => {
          const scrollPercentage = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
          if (scrollPercentage > maxScroll) {
            maxScroll = scrollPercentage;
            if (maxScroll % 25 === 0) { // Traccia al 25%, 50%, 75%, 100%
              console.log(`Scroll depth: ${maxScroll}%`);
            }
          }
        };
        
        window.addEventListener("scroll", trackScroll);
      };
      
      trackPageView();
      setupEventTracking();
      setupScrollTracking();
    };
    
    // Inizializza analytics solo dopo l'accettazione dei cookie
    if (localStorage.getItem("gdwater-cookies-accepted")) {
      initAnalytics();
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <Soluzioni />
      <Vantaggi />
      <Prodotti />
      <Certificazioni />
      <ContactForm />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
