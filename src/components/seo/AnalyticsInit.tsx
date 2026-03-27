import { useEffect } from 'react';
import { initGoogleAnalytics } from '../../lib/analytics';

const AnalyticsInit: React.FC = () => {
  useEffect(() => {
    initGoogleAnalytics();
  }, []);
  return null;
};

export default AnalyticsInit;
