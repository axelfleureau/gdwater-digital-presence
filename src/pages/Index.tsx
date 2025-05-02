
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Soluzioni from "@/components/Soluzioni";
import Vantaggi from "@/components/Vantaggi";
import Prodotti from "@/components/Prodotti";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Soluzioni />
      <Vantaggi />
      <Prodotti />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
