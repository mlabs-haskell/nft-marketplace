import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls page to top any time the path changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('Pathname:', pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
