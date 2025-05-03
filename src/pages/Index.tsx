import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { CompanyTestimonials } from "@/components/CompanyTestimonials";
import { ClientTestimonials } from "@/components/ClientTestimonials"
import { GetApp } from "@/components/GetApp";
import { Footer } from "@/components/Footer";
import Contact from "./Contact";
import FAQ from "@/components/FAQ";
import Pricing from "./Pricing";
import { useTheme } from "@/context/ThemeContext";

export default function Index() {
  const { theme } = useTheme();
  
  return (
    <main className={theme === 'dark' ? 'bg-black' : 'bg-white'}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]">
          
        </div>

      <Hero />
      <CompanyTestimonials />
      <Stats />
      <Services />
      <Features />
      <ClientTestimonials />
      <Contact />
      <FAQ />
      <Pricing />
      <GetApp />
      <Footer/>
    
    </main>
  );
}