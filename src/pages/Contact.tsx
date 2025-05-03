import React, { useState } from "react";
import axios from "axios";
import CustomMap from "@/pages/Map";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [id]: value
    }));
    if (successMessage || errorMessage) {
      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  const validateForm = (): boolean => {
    const { name, email, message } = formState;
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    if (message.length < 10) {
      setErrorMessage("Message must be at least 10 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
    
    try {
      const API_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${API_URL}/send-email`, formState);
      
      if (response.data.success) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setErrorMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error details:", error);
      const errorMsg = error.response?.data?.error || 
        "Error sending message. Please check your network and try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="min-h-screen bg-black py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
            Have questions or want to work with us? We'd love to hear from you.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-900/50 p-3 rounded-full">
                    <FaEnvelope className="text-indigo-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200">Email</h3>
                    <p className="text-gray-400">contact@d0lt.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-900/50 p-3 rounded-full">
                    <FaPhone className="text-indigo-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200">Phone</h3>
                    <p className="text-gray-400">+54 2915738993</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-900/50 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-indigo-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200">Address</h3>
                    <p className="text-gray-400">buenos aires, Argentina</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-800">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Business Hours</h2>
              <div className="space-y-2">
                <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-400">Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Send us a Message</h2>
                
                {successMessage && (
                  <div className="p-4 bg-green-900/50 text-green-400 rounded-lg border border-green-800">
                    {successMessage}
                  </div>
                )}
                
                {errorMessage && (
                  <div className="p-4 bg-red-900/50 text-red-400 rounded-lg border border-red-800">
                    {errorMessage}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200
                    ${isSubmitting 
                      ? 'bg-indigo-900 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-12">
          <CustomMap/>
        </div>
      </div>
    </div>
  );
};

export default Contact;
