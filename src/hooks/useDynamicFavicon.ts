import { useEffect } from 'react';

export function useDynamicFavicon() {
  useEffect(() => {
    const updateFavicon = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDarkMode = e.matches;
      const faviconLinks = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]');

      faviconLinks.forEach(link => {
        if (!link.media) {
          // Update the fallback favicon
          link.href = isDarkMode ? '/favicon-dark.svg' : '/favicon-light.svg';
        }
      });
    };

    // Check if browser supports matchMedia
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

      // Set initial favicon
      updateFavicon(darkModeQuery);

      // Listen for changes
      if (darkModeQuery.addEventListener) {
        darkModeQuery.addEventListener('change', updateFavicon);
        return () => darkModeQuery.removeEventListener('change', updateFavicon);
      } else if (darkModeQuery.addListener) {
        // Fallback for older browsers
        darkModeQuery.addListener(updateFavicon);
        return () => darkModeQuery.removeListener(updateFavicon);
      }
    }
  }, []);
}