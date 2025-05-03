/**
 * Utility for handling cross-domain authentication
 * This file should be used in the receiving application (port 8081)
 */

// Function to extract token and authentication data from URL
export const extractAuthFromUrl = (): { token: string | null; userId: string | null; state: any } => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const userId = urlParams.get('userId');
  let state = null;
  
  try {
    const stateParam = urlParams.get('state');
    if (stateParam) {
      state = JSON.parse(decodeURIComponent(stateParam));
    }
  } catch (error) {
    console.error('Failed to parse state parameter:', error);
  }
  
  return { token, userId, state };
};

// Check if URL contains valid authentication parameters
export const hasValidAuthParams = (): boolean => {
  const { token, state } = extractAuthFromUrl();
  
  if (!token) return false;
  
  // Optional: Validate state parameter (timestamp, origin)
  if (state && state.timestamp) {
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutes
    
    if (now - state.timestamp > maxAge) {
      console.warn('Authentication link has expired');
      return false;
    }
  }
  
  return true;
};

// Save authentication data from URL to localStorage
export const saveAuthFromUrl = (): boolean => {
  const { token, userId } = extractAuthFromUrl();
  
  if (token) {
    localStorage.setItem('doit-token', token);
    if (userId) localStorage.setItem('doit-userId', userId);
    
    // Clean up URL params after extracting them for better security
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    url.searchParams.delete('userId');
    url.searchParams.delete('state');
    window.history.replaceState({}, document.title, url.toString());
    
    return true;
  }
  
  return false;
};

// Automatically handle authentication when redirected from main site
export const handleRedirectAuth = (callback?: () => void): boolean => {
  if (hasValidAuthParams()) {
    const success = saveAuthFromUrl();
    if (success && callback) {
      callback();
    }
    return success;
  }
  return false;
};
