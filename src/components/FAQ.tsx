import React, { useState } from 'react';
import { useTheme } from "@/context/ThemeContext";
// Import the constants/functions from the new file
import { faqConstants, faqHelperFunction } from '../utils/faqUtils';

const FAQ: React.FC = () => {
  // State to track which FAQ items are expanded
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  
  // FAQ data array with unique questions
  const faqData = [
    {
      question: "How do I book a service?",
      answer: "Booking a service is easy! Simply create an account, browse available services, select the one you need, choose a date and time, and confirm your booking."
    },
    {
      question: "How are service providers vetted?",
      answer: "All service providers undergo a thorough background check, credential verification, and must maintain a high customer satisfaction rating to remain on our platform."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "Customer satisfaction is our priority. If you're not happy with a service, please contact us within 48 hours, and we'll work to make it right."
    },
    {
      question: "Can I reschedule or cancel a booking?",
      answer: "Yes, you can reschedule or cancel bookings through your account dashboard. Please note that cancellations within 24 hours of the scheduled service may incur a fee."
    },
    {
      question: "How do I become a service provider?",
      answer: "To join our network of service providers, click on 'Become a Provider' on our homepage, complete the application form, and our team will review your credentials."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, our mobile app is available for both iOS and Android devices. Download it from the App Store or Google Play Store to book services on the go."
    }
  ];

  // Toggle function to expand/collapse FAQ items
  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className={`faq-section py-16 px-4 ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-100'
    }`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-amber-600">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                theme === 'dark'
                  ? 'bg-white/20 backdrop-blur-md hover:bg-white/30'
                  : 'bg-white backdrop-blur-md hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <button
                className={`w-full text-left p-4 md:p-6 flex items-center justify-between font-medium focus:outline-none ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg">{faq.question}</span>
                <span className="text-2xl transition-transform duration-300 text-orange-600" style={{ transform: expandedIndex === index ? 'rotate(45deg)' : 'rotate(0)' }}>
                  +
                </span>
              </button>
              
              <div 
                className={`px-4 md:px-6 transition-all duration-300 overflow-hidden ${expandedIndex === index ? 'max-h-96 pb-4 md:pb-6' : 'max-h-0'}`}
              >
                <p className={theme === 'dark' ? "text-gray-300" : "text-gray-600"}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
