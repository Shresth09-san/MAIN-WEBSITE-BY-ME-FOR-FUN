export const services = [
  {
    id: 1,
    name: "Cleaning Services",
    description: "Professional cleaning solutions for all spaces",
    image: "/icons/cleaning.png",
    subServices: [
      { id: "cs1", name: "House Cleaning", description: "Complete home cleaning solution", provider: "Cleaner" },
      { id: "cs2", name: "Deep Cleaning", description: "Thorough deep cleaning service", provider: "Deep Cleaner" },
      { id: "cs3", name: "Office Cleaning", description: "Professional office cleaning", provider: "Office Cleaner" },
      { id: "cs4", name: "Carpet Cleaning", description: "Expert carpet cleaning", provider: "Carpet Cleaner" },
      { id: "cs5", name: "Upholstery Cleaning", description: "Furniture and upholstery cleaning", provider: "Upholstery Cleaner" },
      { id: "cs6", name: "Window Cleaning", description: "Professional window cleaning", provider: "Window Cleaner" },
      { id: "cs7", name: "Post-Renovation Cleaning", description: "After construction cleanup", provider: "Post-Renovation Cleaner" }
    ]
  },
  {
    id: 2,
    name: "Plumbing Services",
    description: "Expert plumbing solutions",
    image: "/icons/plumbing.png",
    subServices: [
      { id: "ps1", name: "Leak Repairs", description: "Fix all types of leaks", provider: "Plumber" },
      { id: "ps2", name: "Pipe Installation & Replacement", description: "New pipe installation", provider: "Pipefitter/Plumber" },
      { id: "ps3", name: "Faucet & Tap Repairs", description: "Repair and replace faucets", provider: "Plumber" },
      { id: "ps4", name: "Drain Unclogging", description: "Clear blocked drains", provider: "Drain Specialist/Plumber" },
      { id: "ps5", name: "Water Heater Installation/Repair", description: "Heater services", provider: "Water Heater Technician" },
      { id: "ps6", name: "Bathroom Fitting Services", description: "Complete bathroom solutions", provider: "Bathroom Fitter" }
    ]
  },
  {
    id: 3,
    name: "Electrical Services",
    description: "Professional electrical solutions",
    image: "/icons/electrical.png",
    subServices: [
      { id: "es1", name: "Electrical Repairs", description: "General electrical repairs", provider: "Electrician" },
      { id: "es2", name: "Wiring & Rewiring", description: "Complete wiring solutions", provider: "Electrician" },
      { id: "es3", name: "Light Fixture Installation", description: "Install all types of lights", provider: "Electrician" },
      { id: "es4", name: "Ceiling Fan Installation/Repair", description: "Fan services", provider: "Electrician" },
      { id: "es5", name: "Electrical Safety Inspections", description: "Safety checks", provider: "Electrical Inspector" },
      { id: "es6", name: "Inverter & Battery Installation", description: "Power backup solutions", provider: "Inverter Technician" }
    ]
  },
  {
    id: 4,
    name: "Carpentry Services",
    description: "Professional carpentry and furniture solutions",
    image: "/icons/carpentry.png",
    subServices: [
      { id: "cps1", name: "Furniture Assembly", description: "Expert furniture assembly service", provider: "Carpenter" },
      { id: "cps2", name: "Furniture Repairs", description: "Professional furniture repair and restoration", provider: "Carpenter" },
      { id: "cps3", name: "Custom Furniture Design", description: "Custom-made furniture solutions", provider: "Furniture Designer" },
      { id: "cps4", name: "Door & Window Repairs", description: "Door and window repair services", provider: "Carpenter" },
      { id: "cps5", name: "Shelving & Storage Solutions", description: "Custom storage and shelving installation", provider: "Carpenter" }
    ]
  },
  {
    id: 5,
    name: "Home Appliance Repair",
    description: "Expert appliance repair and maintenance services",
    image: "/icons/appliance.png",
    subServices: [
      { id: "har1", name: "Washing Machine Repair", description: "Professional washing machine repair service", provider: "Appliance Technician" },
      { id: "har2", name: "Refrigerator Repair", description: "Expert refrigerator repair and maintenance", provider: "Appliance Technician" },
      { id: "har3", name: "Microwave Repair", description: "Microwave oven repair service", provider: "Appliance Technician" },
      { id: "har4", name: "Air Conditioner (AC) Servicing", description: "AC repair and maintenance", provider: "AC Technician" },
      { id: "har5", name: "Water Purifier Repair", description: "Water purifier maintenance and repair", provider: "Appliance Technician" },
      { id: "har6", name: "Dishwasher Repair", description: "Professional dishwasher repair service", provider: "Appliance Technician" }
    ]
  },
  {
    id: 6,
    name: "Painting Services",
    description: "Professional painting and wall finishing solutions",
    image: "/icons/painting.png",
    subServices: [
      { id: "pts1", name: "Interior Wall Painting", description: "Professional interior painting service", provider: "Painter" },
      { id: "pts2", name: "Exterior Wall Painting", description: "Expert exterior painting solutions", provider: "Painter" },
      { id: "pts3", name: "Wallpaper Installation", description: "Professional wallpaper installation", provider: "Wallpaper Installer" },
      { id: "pts4", name: "Texture Painting", description: "Custom texture painting solutions", provider: "Texture Painter" },
      { id: "pts5", name: "Ceiling Painting", description: "Professional ceiling painting service", provider: "Painter" }
    ]
  },
  {
    id: 7,
    name: "Pest Control",
    description: "Professional pest control and prevention services",
    image: "/icons/pest-control.png",
    subServices: [
      { id: "pc1", name: "Cockroach Control", description: "Complete cockroach elimination", provider: "Pest Control Specialist" },
      { id: "pc2", name: "Termite Treatment", description: "Professional termite control", provider: "Termite Specialist" },
      { id: "pc3", name: "Mosquito Control", description: "Effective mosquito prevention", provider: "Pest Control Specialist" },
      { id: "pc4", name: "Bed Bug Treatment", description: "Comprehensive bed bug elimination", provider: "Pest Control Specialist" },
      { id: "pc5", name: "Rodent Control", description: "Professional rodent removal service", provider: "Pest Control Specialist" }
    ]
  },
  {
    id: 8,
    name: "Gardening & Landscaping",
    description: "Professional garden maintenance and landscaping solutions",
    image: "/icons/gardening.png",
    subServices: [
      { id: "gl1", name: "Lawn Mowing", description: "Professional lawn maintenance", provider: "Gardener" },
      { id: "gl2", name: "Garden Maintenance", description: "Complete garden care service", provider: "Gardener" },
      { id: "gl3", name: "Tree Trimming", description: "Expert tree care and maintenance", provider: "Arborist" },
      { id: "gl4", name: "Landscaping Design", description: "Custom landscape design solutions", provider: "Landscaper" },
      { id: "gl5", name: "Indoor Plant Services", description: "Indoor plant care and maintenance", provider: "Indoor Plant Specialist" }
    ]
  },
  {
    id: 9,
    name: "Home Renovation Services",
    description: "Professional home renovation and remodeling solutions",
    image: "/icons/renovation.png",
    subServices: [
      { id: "hr1", name: "Bathroom Renovation", description: "Complete bathroom renovation", provider: "Renovation Specialist" },
      { id: "hr2", name: "Kitchen Remodeling", description: "Professional kitchen remodeling", provider: "Kitchen Remodeler" },
      { id: "hr3", name: "Flooring Installation", description: "Expert flooring solutions", provider: "Flooring Specialist" },
      { id: "hr4", name: "Roofing Services", description: "Professional roofing solutions", provider: "Roofer" },
      { id: "hr5", name: "Wall Repairs", description: "Wall repair and restoration", provider: "Mason/Plasterer" }
    ]
  },
  {
    id: 10,
    name: "AC & HVAC Services",
    description: "Professional AC and HVAC solutions",
    image: "/icons/ac-hvac.png",
    subServices: [
      { id: "ac1", name: "AC Installation", description: "Professional AC installation", provider: "HVAC Technician" },
      { id: "ac2", name: "AC Repair & Maintenance", description: "AC repair and servicing", provider: "HVAC Technician" },
      { id: "ac3", name: "Duct Cleaning", description: "Professional duct cleaning service", provider: "Duct Cleaner" },
      { id: "ac4", name: "HVAC Installation & Repairs", description: "Complete HVAC solutions", provider: "HVAC Technician" }
    ]
  },
  {
    id: 11,
    name: "Handyman Services",
    description: "Professional handyman solutions for your home",
    image: "/icons/handyman.png",
    subServices: [
      { id: "hm1", name: "TV Wall Mounting", description: "Professional TV mounting service", provider: "Handyman" },
      { id: "hm2", name: "Curtain Rod Installation", description: "Expert curtain rod fitting", provider: "Handyman" },
      { id: "hm3", name: "Picture Hanging", description: "Professional picture hanging service", provider: "Handyman" },
      { id: "hm4", name: "Small Repairs", description: "General home repairs", provider: "Handyman" },
      { id: "hm5", name: "Door Lock Repairs", description: "Lock repair and replacement", provider: "Locksmith" }
    ]
  },
  {
    id: 12,
    name: "Home Security Services",
    description: "Professional security system installation and maintenance",
    image: "/icons/security.png",
    subServices: [
      { id: "hs1", name: "CCTV Installation", description: "Professional CCTV setup", provider: "Security Technician" },
      { id: "hs2", name: "Doorbell Camera Setup", description: "Smart doorbell installation", provider: "Security Technician" },
      { id: "hs3", name: "Alarm System Installation", description: "Complete alarm system setup", provider: "Security Technician" },
      { id: "hs4", name: "Security System Maintenance", description: "Regular security maintenance", provider: "Security Technician" }
    ]
  },
  {
    id: 13,
    name: "Laundry Services",
    description: "Professional laundry and dry cleaning solutions",
    image: "/icons/laundry.png",
    subServices: [
      { id: "ls1", name: "Dry Cleaning", description: "Professional dry cleaning service", provider: "Dry Cleaner" },
      { id: "ls2", name: "Wash & Iron", description: "Complete wash and iron service", provider: "Laundry Worker" },
      { id: "ls3", name: "Pickup & Delivery Laundry Services", description: "Convenient laundry pickup/delivery", provider: "Laundry Delivery Specialist" }
    ]
  },
  {
    id: 14,
    name: "Moving & Relocation Services",
    description: "Professional moving and relocation solutions",
    image: "/icons/moving.png",
    subServices: [
      { id: "ms1", name: "Local Moving Services", description: "Local relocation assistance", provider: "Mover" },
      { id: "ms2", name: "Long-Distance Moving", description: "Long distance moving solutions", provider: "Mover" },
      { id: "ms3", name: "Furniture Disassembly & Assembly", description: "Furniture handling service", provider: "Mover/Assembler" },
      { id: "ms4", name: "Packing & Unpacking Services", description: "Complete packing solutions", provider: "Packer" }
    ]
  },
  {
    id: 15,
    name: "Wellness & Lifestyle Services",
    description: "Professional wellness and lifestyle solutions",
    image: "/icons/wellness.png",
    subServices: [
      { id: "wl1", name: "Personal Fitness Trainers", description: "Personalized fitness training", provider: "Fitness Trainer" },
      { id: "wl2", name: "Yoga & Meditation Instructors", description: "Professional yoga instruction", provider: "Yoga Instructor" },
      { id: "wl3", name: "Beauty Services at Home", description: "At-home beauty services", provider: "Beautician" },
      { id: "wl4", name: "Massage Therapy", description: "Professional massage services", provider: "Massage Therapist" }
    ]
  },
  {
    id: 16,
    name: "Vehicle Services",
    description: "Professional vehicle maintenance and repair",
    image: "/icons/vehicle.png",
    subServices: [
      { id: "vs1", name: "Car Washing & Detailing", description: "Professional car cleaning", provider: "Car Detailer" },
      { id: "vs2", name: "Bike Servicing", description: "Complete bike maintenance", provider: "Mechanic" },
      { id: "vs3", name: "Car/Bike Repairs", description: "Vehicle repair solutions", provider: "Mechanic" }
    ]
  },
  {
    id: 17,
    name: "Smart Home Services",
    description: "Professional smart home automation solutions",
    image: "/icons/smart-home.png",
    subServices: [
      { id: "sh1", name: "Smart Device Installation", description: "Smart device setup", provider: "Smart Home Technician" },
      { id: "sh2", name: "Smart Lighting Installation", description: "Smart lighting solutions", provider: "Smart Lighting Technician" },
      { id: "sh3", name: "Home Automation Setup", description: "Complete home automation", provider: "Smart Home Technician" }
    ]
  },
  {
    id: 18,
    name: "IT & Technical Support",
    description: "Professional IT and technical solutions",
    image: "/icons/it-support.png",
    subServices: [
      { id: "it1", name: "Wi-Fi Router Setup", description: "Network configuration", provider: "IT Technician" },
      { id: "it2", name: "Computer/Laptop Repair", description: "PC repair services", provider: "Computer Technician" },
      { id: "it3", name: "Data Recovery Services", description: "Data recovery solutions", provider: "Data Recovery Specialist" },
      { id: "it4", name: "Smart TV Installation", description: "TV setup and configuration", provider: "TV Technician" }
    ]
  },
  {
    id: 19,
    name: "Event Support Services",
    description: "Professional event planning and support solutions",
    image: "/icons/event-support.png",
    subServices: [
      { id: "ev1", name: "Catering Services", description: "Professional catering solutions", provider: "Caterer" },
      { id: "ev2", name: "Decoration Services", description: "Event decoration services", provider: "Decorator" },
      { id: "ev3", name: "Event Photography", description: "Professional event photography", provider: "Photographer" },
      { id: "ev4", name: "DJ & Music Setup", description: "Complete music solutions", provider: "DJ/Audio Technician" }
    ]
  },
  {
    id: 20,
    name: "Specialized Services",
    description: "Professional specialized maintenance solutions",
    image: "/icons/specialized.png",
    subServices: [
      { id: "sp1", name: "Solar Panel Installation", description: "Professional solar solutions", provider: "Solar Technician" },
      { id: "sp2", name: "Water Tank Cleaning", description: "Tank cleaning services", provider: "Tank Cleaner" },
      { id: "sp3", name: "Septic Tank Services", description: "Septic system maintenance", provider: "Septic Tank Specialist" },
      { id: "sp4", name: "Chimney Cleaning", description: "Professional chimney cleaning", provider: "Chimney Cleaner" }
    ]
  }
];

const generateCompanyNames = (service) => {
  return [
    `Pro ${service}`,
    `${service} Express`,
    `Elite ${service}`,
    `${service} Masters`,
    `Premium ${service} Co`
  ];
};

const generatePriceTiers = (basePrice) => {
  return {
    basic: basePrice,
    standard: basePrice * 1.5,
    premium: basePrice * 2
  };
};