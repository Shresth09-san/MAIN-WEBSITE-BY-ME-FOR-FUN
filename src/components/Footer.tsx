import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Facebook, Instagram, Mail, ArrowRight } from "lucide-react";
import { SiMercadopago, SiPaypal, SiStripe } from 'react-icons/si';

export const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 text-amber-100 border-t border-amber-900">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          {/* Logo and About */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2 text-amber-400">
              DOLT<span className="text-amber-500">.</span>
            </h2>
            <p className="max-w-xs text-sm text-amber-200">
              Empowering businesses with innovative solutions. Join thousands of satisfied customers worldwide.
            </p>
          </div>
          {/* Links */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-8 sm:gap-x-16 md:gap-x-20 gap-y-6 sm:gap-y-0 items-start justify-center w-full sm:w-auto">
            <div>
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-amber-300">Product</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors text-amber-100">Platform</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors text-amber-100">Analyze</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors text-amber-100">Optimize</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-amber-300">Company</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors text-amber-100">About</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors text-amber-100">Careers</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors text-amber-100">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-xs uppercase tracking-wider text-amber-300">Support</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors text-amber-100">Help Center</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors text-amber-100">Pricing</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors text-amber-100">Terms</a></li>
              </ul>
            </div>
          </div>
          {/* Payment Methods */}
          <div className="flex items-center gap-3 bg-zinc-900/80 rounded-xl p-2 shadow-sm mt-8 md:mt-0">
            <SiMercadopago className="h-6 w-6 text-amber-400 opacity-80" />
            <SiPaypal className="h-6 w-6 text-amber-400 opacity-80" />
            <SiStripe className="h-6 w-6 text-amber-400 opacity-80" />
          </div>
        </div>
        {/* Divider */}
        <div className="my-8 border-t border-amber-900"></div>
        {/* Bottom: Newsletter, Socials, Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-3">
            <a href="#" className="p-2 rounded-full bg-zinc-900 text-amber-200 hover:bg-amber-900 transition-all">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-zinc-900 text-amber-200 hover:bg-amber-900 transition-all">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-zinc-900 text-amber-200 hover:bg-amber-900 transition-all">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-zinc-900 text-amber-200 hover:bg-amber-900 transition-all">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          {/* Newsletter */}
          <form className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-300" />
              <Input
                type="email"
                placeholder="Your email"
                className="pl-10 rounded-lg text-sm py-3 bg-zinc-900 border-amber-900 text-amber-100 placeholder:text-amber-300"
              />
            </div>
            <Button className="rounded-lg bg-amber-600 hover:bg-amber-700 text-black">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          {/* Copyright */}
          <div className="text-xs text-amber-400 text-center md:text-right w-full md:w-auto">
            © 2023 DOIT, Inc. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
