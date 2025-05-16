import { useState, useEffect } from "react";
import { ShoppingCart, Search, Filter, X, Loader2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Example product data with placeholder images
const PRODUCTS = [
  {
    id: 1,
    name: "PVC Pipe (1 inch)",
    description: "Durable PVC pipe for plumbing and repairs.",
    price: 12.99,
    category: "Plumbing",
  },
  {
    id: 2,
    name: "Paint Brush Set",
    description: "High-quality brushes for smooth painting.",
    price: 8.49,
    category: "Painting",
  },
  {
    id: 3,
    name: "Box of Nails (Assorted)",
    description: "Assorted nails for all your carpentry needs.",
    price: 5.99,
    category: "Hardware",
  },
  {
    id: 4,
    name: "Adjustable Wrench",
    description: "Versatile wrench for plumbing and repairs.",
    price: 14.99,
    category: "Tools",
  },
  {
    id: 5,
    name: "Electrical Tape",
    description: "Insulated tape for electrical work.",
    price: 3.49,
    category: "Electrical",
  },
  {
    id: 6,
    name: "Hammer",
    description: "Heavy-duty hammer for construction and repairs.",
    price: 11.99,
    category: "Tools",
  },
  {
    id: 7,
    name: "Screwdriver Set",
    description: "Multi-size screwdriver set for all jobs.",
    price: 9.99,
    category: "Tools",
  },
  {
    id: 8,
    name: "Plumbing Tape",
    description: "Sealing tape for leak-proof plumbing.",
    price: 2.99,
    category: "Plumbing",
  },
  {
    id: 9,
    name: "Sandpaper Pack",
    description: "Assorted grit sandpaper for finishing.",
    price: 4.99,
    category: "Painting",
  },
  {
    id: 10,
    name: "Pipe Cutter",
    description: "Precision pipe cutter for clean cuts.",
    price: 15.99,
    category: "Plumbing",
  },
  {
    id: 11,
    name: "Wire Stripper",
    description: "Essential tool for electrical installations.",
    price: 7.99,
    category: "Electrical",
  },
  {
    id: 12,
    name: "Paint Roller",
    description: "Smooth finish paint roller for walls and ceilings.",
    price: 6.99,
    category: "Painting",
  },
  {
    id: 13,
    name: "Measuring Tape",
    description: "Accurate measuring tape for all projects.",
    price: 4.49,
    category: "Tools",
  },
  {
    id: 14,
    name: "Screws (Assorted)",
    description: "Box of assorted screws for multiple uses.",
    price: 5.49,
    category: "Hardware",
  },
  {
    id: 15,
    name: "Pipe Fittings Set",
    description: "Set of pipe fittings for plumbing connections.",
    price: 13.99,
    category: "Plumbing",
  },
  {
    id: 16,
    name: "Voltage Tester",
    description: "Handheld voltage tester for safety checks.",
    price: 8.99,
    category: "Electrical",
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
];

const MarketPlace = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [products] = useState(PRODUCTS);
  const [cartCount, setCartCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Use global theme context for dark/light mode
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50"}`}>
      {/* Navbar is assumed to be outside this component */}
      <div className="container mx-auto px-4 py-20 pt-[88px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${isDark ? "text-amber-400" : "text-orange-700"}`}>
            Hardware Store Products
          </h1>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`md:hidden p-2 rounded-lg ${
              isDark ? "bg-gray-800 text-amber-400" : "bg-orange-100 text-orange-600"
            }`}
          >
            {showFilters ? <X size={20} /> : <Filter size={20} />}
          </button>
        </div>

        {/* Search and Category Filter */}
        <div className={`${showFilters ? "block" : "hidden md:flex"} flex-col md:flex-row md:items-center gap-4 mb-8`}>
          <div className="relative flex-grow">
            <Search size={18} className={`absolute left-3 top-3 ${isDark ? "text-amber-400" : "text-orange-400"}`} />
            <input
              type="text"
              placeholder="Search for spare parts, tools, etc..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDark 
                  ? "border-gray-700 bg-gray-800 text-amber-200 placeholder:text-amber-400/50" 
                  : "border-orange-200 bg-white text-orange-900 placeholder:text-orange-400"
              } focus:outline-none focus:ring-2 ${isDark ? "focus:ring-amber-500" : "focus:ring-orange-300"} transition`}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition ${
                  category === cat
                    ? isDark 
                      ? "bg-amber-600 text-white" 
                      : "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                    : isDark
                      ? "bg-gray-800 text-amber-300 hover:bg-gray-700"
                      : "bg-white text-orange-700 hover:bg-orange-50 border border-orange-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 size={32} className={`animate-spin ${isDark ? "text-amber-500" : "text-orange-500"}`} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className={`text-center ${isDark ? "text-amber-300" : "text-orange-700"} text-lg py-20`}>
            No products found. Try a different search term or category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col transform hover:-translate-y-1 ${
                  isDark
                    ? "border-gray-700 bg-gray-800"
                    : "border-orange-200 bg-white"
                }`}
              >
                <div className={`h-48 ${isDark ? "bg-gray-700" : "bg-orange-50"} flex items-center justify-center`}>
                  <img
                    src={`/api/placeholder/400/300?text=${encodeURIComponent(product.name)}`}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold text-lg ${isDark ? "text-amber-200" : "text-orange-800"}`}>
                      {product.name}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isDark ? "bg-gray-700 text-amber-400" : "bg-orange-100 text-orange-600"
                    }`}>
                      {product.category}
                    </span>
                  </div>
                  <p className={`text-sm mb-4 flex-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className={`font-bold text-lg ${isDark ? "text-amber-400" : "text-orange-700"}`}>
                      ${product.price.toFixed(2)}
                    </span>
                    <button 
                      onClick={() => setCartCount(cartCount + 1)}
                      className={`${
                        isDark 
                          ? "bg-amber-600 hover:bg-amber-700" 
                          : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                      } text-white px-3 py-2 rounded-lg font-medium shadow transition flex items-center gap-2`}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredProducts.length > 0 && (
          <div className="mt-8 text-center">
            <p className={`${isDark ? "text-amber-300" : "text-orange-700"}`}>
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className={`mt-20 py-6 ${isDark ? "bg-gray-800 text-gray-300" : "bg-orange-100 text-orange-800"}`}>
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 HandyTools Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MarketPlace;