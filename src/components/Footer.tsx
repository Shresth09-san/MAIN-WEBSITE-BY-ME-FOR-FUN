import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Youtube, Linkedin, Twitter, Facebook, Instagram, Mail, ArrowRight, CreditCard } from "lucide-react"
import { SiMercadopago, SiPaypal, SiStripe } from 'react-icons/si'

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0A0A0A] text-zinc-300 py-16">
      <div className="container mx-auto px-4">
        {/* Logo and company info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-zinc-900">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-3">DOLT<span className="text-amber-500">.</span></h2>
            <p className="max-w-md text-sm text-zinc-500">
              Empowering businesses with innovative solutions. Join thousands of satisfied customers worldwide.
            </p>
          </div>
          
          {/* Newsletter Subscription */}
          <div className="w-full md:w-auto">
            <h3 className="text-white font-medium mb-2">Stay in the loop</h3>
            <p className="text-sm text-zinc-500 mb-3">Subscribe for the latest updates and offers</p>
            <div className="flex items-center">
              <div className="relative flex-1 mr-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="email"
                  placeholder="Your email"
                  className="pl-10 bg-[#111111] border-zinc-900 rounded-lg text-sm py-6 text-white placeholder:text-zinc-500"
                />
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black rounded-lg">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Links Sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-12">
          {/* PRODUCT Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">PRODUCT</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Platform</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Analyze</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Optimize</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Localization</a></li>
            </ul>
          </div>

          {/* SOLUTIONS Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">SOLUTIONS</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Enterprise</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Startups</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Global alliances</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Freelancers</a></li>
            </ul>
          </div>

          {/* RESOURCES Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">RESOURCES</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Customer stories</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Apps</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Developers</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Made with ALFInT</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Livestreams</a></li>
            </ul>
          </div>

          {/* COMPANY Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">COMPANY</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">About</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Careers</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Press</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">DOIT Shop</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Privacy policy</a></li>
            </ul>
          </div>

          {/* COMMUNITY Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">COMMUNITY</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Discover the community</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Partner with DOIT</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Become an affiliate</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Find a meetup near you</a></li>
            </ul>
          </div>

          {/* GET HELP Column */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">GET HELP</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Support</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Status</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Forum</a></li>
              <li><a href="#" className="text-zinc-500 hover:text-amber-500 transition-colors">Wishlist</a></li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-900">
          {/* Copyright */}
          <div className="mb-6 md:mb-0">
            <p className="text-sm text-zinc-500">© 2023 DOIT, Inc. All rights reserved</p>
          </div>
          
          {/* Payment Methods */}
          <div className="flex items-center justify-center mb-6 md:mb-0 md:order-last">
            <div className="bg-[#111111] rounded-xl p-2 flex gap-4">
              <SiMercadopago className="h-6 w-6 opacity-70 hover:opacity-100 transition-opacity text-zinc-400" />
              <SiPaypal className="h-6 w-6 opacity-70 hover:opacity-100 transition-opacity text-zinc-400" />
              <SiStripe className="h-6 w-6 opacity-70 hover:opacity-100 transition-opacity text-zinc-400" />
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="bg-[#111111] p-2 rounded-full text-zinc-500 hover:text-amber-500 hover:bg-zinc-900 transition-all">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="bg-[#111111] p-2 rounded-full text-zinc-500 hover:text-amber-500 hover:bg-zinc-900 transition-all">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="bg-[#111111] p-2 rounded-full text-zinc-500 hover:text-amber-500 hover:bg-zinc-900 transition-all">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="bg-[#111111] p-2 rounded-full text-zinc-500 hover:text-amber-500 hover:bg-zinc-900 transition-all">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
