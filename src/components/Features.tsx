import { Truck, Clock, CheckCircle, Wallet, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Fast & professional delivery services. Reliable and efficient solutions for your needs.",
  },
  {
    icon: Clock,
    title: "24hrs Services",
    description:
      "Round-the-clock availability. We're here whenever you need assistance.",
  },
  {
    icon: Globe,
    title: "Wide Service Coverage",
    description: "Extensive service area coverage. Available wherever you are.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assured",
    description:
      "Guaranteed satisfaction with every service. High standards maintained.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description:
      "Competitive rates without hidden charges. Best value for your money.",
  },
  {
    icon: Globe,
    title: "Wide Service Coverage",
    description: "Extensive service area coverage. Available wherever you are.",
  },
];

const RotatingCube = () => {
  const cubeRef = useRef();
  // ...existing code...
};

export const Features = () => {
  const featureRefs = useRef([]);
  const statsRefs = useRef([]);

  useEffect(() => {
    // Animate feature cards when they come into view
    featureRefs.current.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 50,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      });
    });

    // Define the target values and their suffixes for each stat
    const statValues = [
      { value: 20, suffix: 'K' },
      { value: 30, suffix: 'K' },
      { value: 99, suffix: '%' },
      { value: 300, suffix: '+' }
    ];

    // Create animations for each stat counter
    const animations = statsRefs.current.map((stat, index) => {
      const targetValue = statValues[index].value;
      const suffix = statValues[index].suffix;
      
      // Create a timeline for each stat that repeats
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
        paused: true
      });
      
      // Add animation from 0 to target value
      tl.fromTo(stat, 
        { textContent: 0 }, 
        {
          textContent: targetValue,
          duration: 3,
          ease: "power1.inOut",
          snap: { textContent: 1 },
          onUpdate: function() {
            stat.textContent = Math.floor(this.targets()[0].textContent) + suffix;
          }
        }
      );
      
      // Start the timeline when the element enters the viewport
      ScrollTrigger.create({
        trigger: stat,
        start: "top bottom-=150",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart()
      });
      
      return tl;
    });

    // Clean up animations on component unmount
    return () => {
      animations.forEach(anim => anim.kill());
    };
  }, []);

  return (
    <>        
      <section className="relative bg-black py-24" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="inline-block text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-transparent bg-clip-text pb-2">
              Why Choose Us
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto mt-2"></div>
            <p className="text-zinc-400 max-w-2xl mx-auto mt-6 text-lg">
              We deliver excellence through attention to detail and commitment to quality. 
              Our services are designed to exceed expectations every time.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6 bg-zinc-900 rounded-2xl p-8 shadow-xl border border-amber-500/20">
                <div className="inline-block p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-md">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Premium Service Guarantee</h3>
                <p className="text-zinc-400">
                  Your home deserves a service that understands its importance,
                  providing care and attention that ensures it remains a source
                  of comfort and warmth. We focus on creating a seamless
                  experience that brings peace of mind and supports the everyday
                  harmony of your living space.
                </p>
                <div className="pt-4">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all px-8 py-6 rounded-xl text-lg">
                    View Special Offers
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} ref={el => featureRefs.current[index] = el} className="p-6 rounded-xl bg-zinc-900 shadow-lg hover:shadow-2xl border-t-4 border-amber-500 transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                  <div className="mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 flex-grow">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
              <div ref={el => statsRefs.current[0] = el} className="text-5xl font-bold text-white mb-2">20K</div>
              <div className="text-white text-lg uppercase tracking-wider">Satisfied Clients</div>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
              <div ref={el => statsRefs.current[1] = el} className="text-5xl font-bold text-white mb-2">30K</div>
              <div className="text-white text-lg uppercase tracking-wider">Services Given</div>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
              <div ref={el => statsRefs.current[2] = el} className="text-5xl font-bold text-white mb-2">99%</div>
              <div className="text-white text-lg uppercase tracking-wider">Client Satisfaction</div>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
              <div ref={el => statsRefs.current[3] = el} className="text-5xl font-bold text-white mb-2">300+</div>
              <div className="text-white text-lg uppercase tracking-wider">Expert Professionals</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
