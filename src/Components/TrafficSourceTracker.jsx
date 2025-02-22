import { useEffect, useState } from 'react';

const TrafficSourceTracker = () => {
  const [trafficSource, setTrafficSource] = useState({
    referrer: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    customSource: '',
    userAgent: '',
    platform: ''
  });

  useEffect(() => {
    // Get referrer if available
    const referrer = document.referrer || 'Direct/Unknown';

    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || '';
    const utmMedium = urlParams.get('utm_medium') || '';
    const utmCampaign = urlParams.get('utm_campaign') || '';
    const customSource = urlParams.get('source') || '';

    // Get user agent info
    const userAgent = navigator.userAgent;
    
    // Detect platform
    const getPlatform = () => {
      if (/android/i.test(userAgent)) return 'Android';
      if (/iPad|iPhone|iPod/.test(userAgent)) return 'iOS';
      if (/Windows/.test(userAgent)) return 'Windows';
      if (/Mac OS/.test(userAgent)) return 'MacOS';
      return 'Unknown';
    };

    setTrafficSource({
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      customSource,
      userAgent,
      platform: getPlatform()
    });

    // Log the traffic source (you can send this to your analytics service)
    console.log('Traffic source detected:', {
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      customSource,
      platform: getPlatform()
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Traffic Source Information</h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Referrer</h3>
            <p className="text-gray-600">{trafficSource.referrer}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">UTM Source</h3>
            <p className="text-gray-600">{trafficSource.utmSource || 'Not set'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">UTM Medium</h3>
            <p className="text-gray-600">{trafficSource.utmMedium || 'Not set'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">UTM Campaign</h3>
            <p className="text-gray-600">{trafficSource.utmCampaign || 'Not set'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Custom Source</h3>
            <p className="text-gray-600">{trafficSource.customSource || 'Not set'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Platform</h3>
            <p className="text-gray-600">{trafficSource.platform}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficSourceTracker;