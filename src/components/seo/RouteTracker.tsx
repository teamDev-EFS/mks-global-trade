import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../../lib/analytics';

/** Sends SPA route changes to GA4 (when VITE_GA_MEASUREMENT_ID is set). */
const RouteTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    trackPageView(path);
  }, [location.pathname, location.search]);

  return null;
};

export default RouteTracker;
