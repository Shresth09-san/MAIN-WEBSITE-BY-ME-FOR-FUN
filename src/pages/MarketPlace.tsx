import { useState, useEffect } from "react";

const MarketPlace = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Marketplace</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product cards would go here */}
            <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Product Name</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">Product description goes here.</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$99.99</span>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            
            {/* Placeholder for more products */}
            <div className="border rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Product Name</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">Product description goes here.</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">$149.99</span>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
