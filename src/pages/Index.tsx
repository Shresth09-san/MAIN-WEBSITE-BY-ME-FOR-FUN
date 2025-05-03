import Navbar from "@/components/Navbar/Navbar";
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
export default function Index() {
  return (
    <main className="bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,223,0,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,223,0,0.15)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]">
          
        </div>

      <Navbar/>
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