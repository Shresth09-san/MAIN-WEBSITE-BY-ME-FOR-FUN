import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { LoadingProvider } from "@/context/LoadingContext";
import Loader from "@/components/ui/loader";
import { Suspense, useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

// Direct imports instead of lazy loading
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/CommingSoon";
import MarketPlace from "./pages/MarketPlace";
import Support from "./pages/Support";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const [pageLoading, setPageLoading] = useState(true);

  // Initial app load with 3-second loading screen
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <LoadingProvider>
              <Toaster />
              <Sonner />
              <Router>
                <Navbar />
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/marketplace" element={<MarketPlace />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/coming-soon" element={<ComingSoon />} />
                  </Routes>
                </Suspense>
              </Router>
            </LoadingProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
