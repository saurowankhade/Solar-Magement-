import { useEffect, useState } from 'react';

const TrafficSourceTracker = () => {
    const [sourceInfo, setSourceInfo] = useState({
        platform: 'Unknown',
        browser: 'Unknown',
        mobileApp: 'Unknown',
        isInApp: false,
        referrer: 'Unknown',
        deviceType: 'Unknown'
      });
    
      useEffect(() => {
        const detectSource = () => {
          const userAgent = navigator.userAgent.toLowerCase();
          const referrer = document.referrer.toLowerCase();
          let info = {
            platform: 'Unknown',
            browser: 'Unknown',
            mobileApp: 'Unknown',
            isInApp: false,
            referrer: document.referrer || 'Direct Access',
            deviceType: 'Unknown'
          };
    
          // Platform Detection
          if (/android/.test(userAgent)) info.platform = 'Android';
          else if (/ipad|iphone|ipod/.test(userAgent)) info.platform = 'iOS';
          else if (/windows/.test(userAgent)) info.platform = 'Windows';
          else if (/macintosh|mac os x/.test(userAgent)) info.platform = 'MacOS';
          else if (/linux/.test(userAgent)) info.platform = 'Linux';
    
          // Browser Detection
          if (/edg/.test(userAgent)) info.browser = 'Microsoft Edge';
          else if (/chrome/.test(userAgent)) info.browser = 'Chrome';
          else if (/firefox/.test(userAgent)) info.browser = 'Firefox';
          else if (/safari/.test(userAgent)) info.browser = 'Safari';
          else if (/opera|opr/.test(userAgent)) info.browser = 'Opera';
    
          // Enhanced App Detection
          const detectApp = () => {
            // Check user agent patterns
            if (/fb_iab|fb4a|fbav|fbios/.test(userAgent)) return 'Facebook App';
            if (/instagram|ig_android|ig_ios/.test(userAgent)) return 'Instagram App';
            if (/twitter|twitter_app/.test(userAgent)) return 'Twitter App';
            if (/linkedin|linkedin_app/.test(userAgent)) return 'LinkedIn App';
            if (/whatsapp|wa|wap/.test(userAgent)) return 'WhatsApp';
            if (/telegram|tg_app|tgios/.test(userAgent)) return 'Telegram';
            
            // Check referrer patterns
            if (/facebook\.com/.test(referrer)) return 'Facebook';
            if (/instagram\.com/.test(referrer)) return 'Instagram';
            if (/twitter\.com/.test(referrer)) return 'Twitter';
            if (/linkedin\.com/.test(referrer)) return 'LinkedIn';
            if (/whatsapp\.com|wa\.me/.test(referrer)) return 'WhatsApp';
            if (/t\.me|telegram\.me/.test(referrer)) return 'Telegram';
    
            // Check for WebView
            if (/; wv\)/.test(userAgent)) {
              if (info.platform === 'Android') return 'Android App WebView';
              if (info.platform === 'iOS') return 'iOS App WebView';
            }
    
            // Check mobile browser patterns that might indicate in-app browsers
            if (/mobile(.*)safari/.test(userAgent) && !/version/.test(userAgent)) {
              return 'In-App Browser';
            }
    
            return 'Unknown App';
          };
    
          info.mobileApp = detectApp();
          info.isInApp = info.mobileApp !== 'Unknown App';
    
          // Device Type Detection
          if (/mobile|android|ios|iphone/.test(userAgent) && !/tablet|ipad/.test(userAgent)) {
            info.deviceType = 'Mobile';
          } else if (/tablet|ipad/.test(userAgent)) {
            info.deviceType = 'Tablet';
          } else {
            info.deviceType = 'Desktop';
          }
    
          return info;
        };
    
        const info = detectSource();
        setSourceInfo(info);
        
        // Debug logging
        console.log('Detailed Detection Info:', {
          ...info,
          userAgent: navigator.userAgent,
          referrer: document.referrer
        });
      }, []);
    
      return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Traffic Source Detection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Device Platform</h3>
              <p className="text-gray-600">{sourceInfo.platform}</p>
            </div>
    
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Browser</h3>
              <p className="text-gray-600">{sourceInfo.browser}</p>
            </div>
    
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Device Type</h3>
              <p className="text-gray-600">{sourceInfo.deviceType}</p>
            </div>
    
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Source App</h3>
              <p className="text-gray-600">{sourceInfo.mobileApp}</p>
            </div>
    
            <div className="p-4 bg-gray-50 rounded-lg col-span-2">
              <h3 className="font-semibold text-gray-700 mb-2">Referrer</h3>
              <p className="text-gray-600 break-all">{sourceInfo.referrer}</p>
            </div>
    
            <div className="p-4 bg-gray-50 rounded-lg col-span-2">
              <h3 className="font-semibold text-gray-700 mb-2">User Agent</h3>
              <p className="text-gray-600 break-all">{navigator.userAgent}</p>
            </div>
          </div>
        </div>
      );
    };
    
    
export default TrafficSourceTracker;