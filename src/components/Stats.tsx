import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
  { value: "20K", label: "Happy Customers", endValue: 20 },
  { value: "30K", label: "Services Completed", endValue: 30 },
  { value: "99%", label: "Satisfaction Rate", endValue: 99 },
  { value: "300+", label: "Expert Professionals", endValue: 300 },
];

export const Stats = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const numberRefs = useRef<Array<HTMLDivElement | null>>([]);
  const animationRef = useRef<gsap.core.Tween[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const startAnimationCycle = () => {
    // Reset all numbers to 0
    stats.forEach((stat, index) => {
      if (numberRefs.current[index]) {
        numberRefs.current[index]!.innerHTML = "0";
      }
    });
    
    // Animate all numbers
    animationRef.current = stats.map((stat, index) => {
      if (numberRefs.current[index]) {
        return gsap.to(numberRefs.current[index], {
          duration: 2,
          innerHTML: stat.endValue.toString(),
          snap: { innerHTML: 1 },
          onComplete: () => {
            if (numberRefs.current[index]) {
              numberRefs.current[index]!.innerHTML = stat.value;
            }
          }
        });
      }
      return gsap.to({}, {});
    });
  };
  
  useEffect(() => {
    if (inView) {
      // Start the animation immediately
      startAnimationCycle();
      
      // Set up the interval to repeat the animation
      intervalRef.current = setInterval(() => {
        // Kill any existing animations
        animationRef.current.forEach(anim => anim?.kill());
        // Start the cycle again
        startAnimationCycle();
      }, 4000); // 2s for animation + 2s delay
    }
    
    return () => {
      // Clean up animations and interval on unmount or when not in view
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      animationRef.current.forEach(anim => anim?.kill());
    };
  }, [inView]);

  return (
    <section className="py-12 bg-primary/5 text-amber-300">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`space-y-2 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                ref={el => numberRefs.current[index] = el}
                className="text-3xl md:text-4xl font-bold text-primary"
              >
                0
              </div>
              <div className="text-sm text-orange-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};