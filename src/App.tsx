import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { TechSpecsSection } from "./components/TechSpecsSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <div id="tech-specs">
        <TechSpecsSection />
      </div>
      <div id="download">
        <CTASection />
      </div>
      <Footer />
    </div>
  );
}