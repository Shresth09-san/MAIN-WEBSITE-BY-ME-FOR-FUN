export interface Service {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export const services: Service[] = [
  {
    id: "service-1",
    name: "Home Cleaning",
    description: "Professional cleaning services for your home, ensuring a spotless and healthy living environment.",
    image: "/icons/cleaning.svg"
  },
  {
    id: "service-2",
    name: "Plumbing Services",
    description: "Expert plumbing solutions for residential and commercial properties, from repairs to installations.",
    image: "/icons/plumbing.svg"
  },
  {
    id: "service-3",
    name: "Electrical Work",
    description: "Certified electricians providing safe and reliable electrical services for any requirement.",
    image: "/icons/electrical.svg"
  },
  {
    id: "service-4",
    name: "Home Painting",
    description: "Transform your space with our professional painting services, using premium quality materials.",
    image: "/icons/painting.svg"
  },
  {
    id: "service-5",
    name: "Carpentry",
    description: "Custom woodwork and carpentry solutions tailored to your specific needs and preferences.",
    image: "/icons/carpentry.svg"
  },
  {
    id: "service-6",
    name: "HVAC Services",
    description: "Complete heating, ventilation, and air conditioning services to keep your environment comfortable.",
    image: "/icons/hvac.svg"
  }
];
