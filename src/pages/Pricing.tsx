import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function PricingCards() {
    const cardsRef = useRef([]);
    const containerRef = useRef(null);
    const [isAnnual, setIsAnnual] = useState(false);

    const plans = [
        {
            name: "Basic Cleaning",
            price: isAnnual ? "$25/hr" : "$30/hr",
            features: [
                "General Cleaning",
                "Dusting & Vacuuming",
                "Bathroom Cleaning",
                "Kitchen Cleaning",
                "Basic Organization"
            ],
            popular: false,
            color: "from-gray-900 to-black",
        },
        {
            name: "Deep Cleaning",
            price: isAnnual ? "$200/session" : "$250/session",
            features: [
                "Complete Home Cleaning",
                "Carpet Cleaning",
                "Window Washing",
                "Appliance Cleaning",
                "Sanitization Services"
            ],
            popular: true,
            color: "from-gray-800 to-black",
        },
        {
            name: "Construction & Repair",
            price: isAnnual ? "$45/hr" : "$55/hr",
            features: [
                "Minor Repairs",
                "Construction Work",
                "Plumbing Fixes",
                "Electrical Work",
                "Carpentry Services"
            ],
            popular: false,
            color: "from-gray-900 to-black",
        },
        {
            name: "Laundry & Washing",
            price: isAnnual ? "$15/load" : "$20/load",
            features: [
                "Clothes Washing",
                "Dry Cleaning",
                "Ironing Services",
                "Specialty Fabric Care",
                "Bulk Laundry Service"
            ],
            popular: false,
            color: "from-gray-800 to-black",
        },
        {
            name: "Maintenance Package",
            price: isAnnual ? "$400/month" : "$500/month",
            features: [
                "Weekly Cleaning",
                "Monthly Deep Clean",
                "Regular Maintenance",
                "Priority Service",
                "Emergency Support"
            ],
            popular: false,
            color: "from-gray-900 to-black",
        },
        {
            name: "Custom Project",
            price: "Custom Quote",
            features: [
                "Tailored Solutions",
                "Project Management",
                "Quality Assurance",
                "Dedicated Team",
                "Flexible Scheduling"
            ],
            popular: false,
            color: "from-gray-800 to-black",
        },
    ];

    useEffect(() => {
        gsap.fromTo(
            cardsRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
    }, []);

    const togglePricing = () => {
        setIsAnnual(!isAnnual);
        gsap.fromTo(cardsRef.current, { scale: 0.95 }, { scale: 1, duration: 0.5, stagger: 0.1 });
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-black flex flex-col items-center py-16 px-4 sm:px-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-lg mb-8 text-center">
                Our Services & Pricing
            </h1>
            <p className="text-gray-400 text-lg mb-6 text-center max-w-2xl">
                Choose from our comprehensive range of services including cleaning, washing, construction, and repair solutions
            </p>
            
            <div className="flex items-center mb-10">
                <span className={`mr-3 text-lg ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Standard</span>
                <button 
                    onClick={togglePricing}
                    className="relative inline-flex items-center h-8 rounded-full w-14 bg-gray-800 transition-colors"
                >
                    <span 
                        className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform ${
                            isAnnual ? 'translate-x-7' : 'translate-x-1'
                        }`} 
                    />
                </button>
                <span className={`ml-3 text-lg ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
                    Annual <span className="text-gray-400 text-sm">(Save up to 20%)</span>
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 max-w-7xl w-full">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className={`relative bg-gradient-to-br ${plan.color} text-white p-6 rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 border border-gray-800`}
                    >
                        {plan.popular && (
                            <div className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 text-xs font-bold rounded-md shadow-lg border border-gray-700">
                                MOST POPULAR
                            </div>
                        )}
                        <h2 className="text-2xl font-bold mb-4 text-white">{plan.name}</h2>
                        <p className="text-3xl font-extrabold mb-4 text-white">{plan.price}</p>
                        <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-300">
                                    <span className="text-gray-400">✔</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full bg-gray-800 text-white py-2 rounded-lg font-bold hover:bg-gray-700 transition-all border border-gray-700">
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
