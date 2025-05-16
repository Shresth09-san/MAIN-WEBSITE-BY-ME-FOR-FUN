import React, { useState, useEffect, useRef } from 'react';
import { Mail, MessageCircle, Phone, PlusCircle, MinusCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Support = () => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Refs for animations
  const heroRef = useRef<HTMLDivElement | null>(null);
  const supportOptionsRef = useRef<HTMLDivElement | null>(null);
  const faqsRef = useRef<HTMLDivElement | null>(null);
  const contactFormRef = useRef<HTMLDivElement | null>(null);
  const supportCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const faqItemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const faqAnswerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      if (heroRef.current) {
        gsap.from(heroRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      }

      // Support options cards animation
      supportCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: supportOptionsRef.current,
              start: "top 80%",
            }
          });
        }
      });

      // FAQ items animation
      faqItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            x: -30,
            opacity: 0,
            duration: 0.6,
            delay: 0.1 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faqsRef.current,
              start: "top 80%",
            }
          });
        }
      });

      // Contact form animation
      if (contactFormRef.current) {
        gsap.from(contactFormRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactFormRef.current,
            start: "top 80%",
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual API call in production
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: section, offsetY: 80 },
        ease: "power2.inOut"
      });
    }
  };

  const addButtonHoverEffect = (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power1.out"
    });
  };

  const removeButtonHoverEffect = (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power1.out"
    });
  };

  const toggleFAQ = (index: number) => {
    const newIndex = activeIndex === index ? null : index;
    setActiveIndex(newIndex);

    // Animate the answer reveal using ref
    if (faqAnswerRefs.current[index]) {
      gsap.fromTo(
        faqAnswerRefs.current[index],
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Join Us - It's Free' button in the navigation bar and following the registration process."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. For enterprise solutions, we also offer invoice-based payment options."
    },
    {
      question: "How can I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. Navigate to 'Billing' and select 'Cancel Subscription'."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee on all our premium plans. If you're not satisfied, please contact our support team."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team via email, phone, or live chat. We're available 24/7 to assist you."
    }
  ];

  return (
    <div className={`min-h-screen pt-24 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16" ref={heroRef}>
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">We're Here to Help</h1>
          <p className="text-lg md:text-xl mb-8 opacity-80">
            Get the support you need, when you need it. Our team is ready to assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-6 py-3 rounded-lg transition-all hover:shadow-lg"
              onClick={() => scrollToSection('contact-form')}
              onMouseEnter={(e) => addButtonHoverEffect(e.currentTarget)}
              onMouseLeave={(e) => removeButtonHoverEffect(e.currentTarget)}
            >
              Contact Support
            </button>
            <button 
              className={`border ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} font-medium px-6 py-3 rounded-lg transition-all`}
              onClick={() => scrollToSection('faqs')}
              onMouseEnter={(e) => addButtonHoverEffect(e.currentTarget)}
              onMouseLeave={(e) => removeButtonHoverEffect(e.currentTarget)}
            >
              Browse FAQs
            </button>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} id="support-options" ref={supportOptionsRef}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Can We Help You?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Live Chat */}
            <div 
              className={`rounded-xl p-8 transition-all hover:shadow-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'}`}
              ref={el => supportCardsRef.current[0] = el}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${isDarkMode ? 'bg-red-900/50' : 'bg-red-100'}`}>
                  <MessageCircle className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Live Chat</h3>
              <p className="text-center opacity-80 mb-6">
                Chat with our support team in real-time for immediate assistance.
              </p>
              <div className="text-center">
                <button 
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => window.open('https://chat.example.com', '_blank')}
                  onMouseEnter={(e) => addButtonHoverEffect(e.currentTarget)}
                  onMouseLeave={(e) => removeButtonHoverEffect(e.currentTarget)}
                >
                  Start Chat
                </button>
              </div>
            </div>

            {/* Email Support */}
            <div 
              className={`rounded-xl p-8 transition-all hover:shadow-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'}`}
              ref={el => supportCardsRef.current[1] = el}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${isDarkMode ? 'bg-red-900/50' : 'bg-red-100'}`}>
                  <Mail className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Email Support</h3>
              <p className="text-center opacity-80 mb-6">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <div className="text-center">
                <a 
                  href="mailto:support@example.com" 
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onMouseEnter={(e) => addButtonHoverEffect(e.currentTarget)}
                  onMouseLeave={(e) => removeButtonHoverEffect(e.currentTarget)}
                >
                  support@example.com
                </a>
              </div>
            </div>

            {/* Phone Support */}
            <div 
              className={`rounded-xl p-8 transition-all hover:shadow-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'}`}
              ref={el => supportCardsRef.current[2] = el}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${isDarkMode ? 'bg-red-900/50' : 'bg-red-100'}`}>
                  <Phone className="h-8 w-8 text-red-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Phone Support</h3>
              <p className="text-center opacity-80 mb-6">
                Call us for priority support on urgent matters.
              </p>
              <div className="text-center">
                <a 
                  href="tel:+1234567890" 
                  className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onMouseEnter={(e) => addButtonHoverEffect(e.currentTarget)}
                  onMouseLeave={(e) => removeButtonHoverEffect(e.currentTarget)}
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 container mx-auto px-4" id="faqs" ref={faqsRef}>
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`mb-4 rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
              ref={el => faqItemsRef.current[index] = el}
            >
              <button 
                className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                {activeIndex === index ? 
                  <MinusCircle className={`h-5 w-5 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} /> : 
                  <PlusCircle className={`h-5 w-5 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
                }
              </button>
              {activeIndex === index && (
                <div 
                  className={`p-4 ${isDarkMode ? 'border-t border-gray-700 bg-gray-750' : 'border-t border-gray-100 bg-gray-50'}`}
                  ref={el => faqAnswerRefs.current[index] = el}
                >
                  <p className="opacity-80">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} id="contact-form">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto" ref={contactFormRef}>
            <h2 className="text-3xl font-bold text-center mb-12">Still Need Help?</h2>
            {submitSuccess ? (
              <div className={`text-center p-6 rounded-lg mb-8 ${isDarkMode ? 'bg-green-800/30' : 'bg-green-100'}`}>
                <h3 className="text-xl font-medium mb-2">Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form className="grid gap-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900'
                      }`} 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-gray-50 border border-gray-300 text-gray-900'
                      }`} 
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label 
                    htmlFor="subject" 
                    className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border border-gray-300 text-gray-900'
                    }`} 
                    placeholder="How can we help you?" 
                    required 
                  />
                </div>
                <div>
                  <label 
                    htmlFor="message" 
                    className={`block mb-2 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border border-gray-300 text-gray-900'
                    }`} 
                    placeholder="Describe your issue in detail..." 
                    required
                  ></textarea>
                </div>
                <div>
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-6 py-3 rounded-lg transition-all hover:shadow-lg w-full md:w-auto"
                    disabled={isSubmitting}
                    onMouseEnter={(e) => !isSubmitting && addButtonHoverEffect(e.currentTarget)}
                    onMouseLeave={(e) => !isSubmitting && removeButtonHoverEffect(e.currentTarget)}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;