import { Seo, SEO_DEFAULT_DESCRIPTION } from "@/components/Seo";
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
      <Seo title="Home" path="/" description={SEO_DEFAULT_DESCRIPTION} />
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
