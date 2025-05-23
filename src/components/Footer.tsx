import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Facebook, Instagram, Mail, ArrowRight } from "lucide-react";
import { SiMercadopago, SiPaypal, SiStripe } from 'react-icons/si';
import Logo from "@/assests/logoR.png";


export const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 text-amber-100 border-t border-amber-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          {/* Logo and About */}
          <div className="flex flex-row items-center gap-1">
            {/* <h2 className="text-2xl font-bold text-amber-400 leading-none">
              DOLT
            </h2> */}
            <img className='h-18 w-24' src={Logo} alt="logo" />
            <p className="text-[16px] mt-9 font-extrabold text-amber-200 leading-none">
             -GET IT DONE
            </p>
          </div>
          

          {/* Links */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-x-16 md:gap-x-20 sm:gap-y-0 items-start justify-center">
            <div>
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-amber-300">Product</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Platform</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Analyze</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Optimize</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-amber-300">Company</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-amber-300">Support</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-amber-900"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Copyright */}
          <div className="text-xs text-amber-400 text-center md:text-left w-full md:w-auto">
            © 2025 DOLT, Inc. All rights reserved
          </div>

          {/* Payment Icons (relocated + smaller) */}
          <div className="flex items-center gap-2">
            <SiMercadopago className="h-4 w-4 text-amber-400 opacity-80" />
            <SiPaypal className="h-4 w-4 text-amber-400 opacity-80" />
            <SiStripe className="h-4 w-4 text-amber-400 opacity-80" />
          </div>

          {/* Newsletter */}
          <form className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-300" />
              <Input
                type="email"
                placeholder="Your email"
                className="pl-10 rounded-lg text-sm py-2.5 bg-zinc-900 border-amber-900 text-amber-100 placeholder:text-amber-300"
              />
            </div>
            <Button className="rounded-lg bg-amber-600 hover:bg-amber-700 text-black px-3 py-2">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Social Media */}
          <div className="flex items-center space-x-2">
            <a href="#" className="p-1.5 rounded-full bg-zinc-900 text-amber-200 hover:bg-amber-900 transition-all">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="p-1.5 rounded-full bg-zinc-900 text-amber-200 hover:bg-amber-900 transition-all">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="p-1.5 rounded-full bg-zinc-900 text-amber-200 hover:bg-amber-900 transition-all">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="p-1.5 rounded-full bg-zinc-900 text-amber-200 hover:bg-amber-900 transition-all">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
