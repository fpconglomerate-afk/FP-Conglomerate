import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BusinessEcosystem from "@/components/BusinessEcosystem";
import About from "@/components/About";
import ImpactStats from "@/components/ImpactStats";
import Gallery from "@/components/Gallery";
import HiringSection from "@/components/HiringSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <BusinessEcosystem />
      <About />
      <ImpactStats />
      <Gallery />
      <HiringSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default Index;
