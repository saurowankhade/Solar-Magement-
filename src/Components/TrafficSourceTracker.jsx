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
          let info = {
            platform: 'Unknown',
            browser: 'Unknown',
            mobileApp: 'Unknown',
            isInApp: false,
            referrer: document.referrer || 'Direct Access',
            deviceType: 'Unknown'
          };
    
          // Detect Platform
          if (/android/.test(userAgent)) info.platform = 'Android';
          else if (/ipad|iphone|ipod/.test(userAgent)) info.platform = 'iOS';
          else if (/windows/.test(userAgent)) info.platform = 'Windows';
          else if (/macintosh|mac os x/.test(userAgent)) info.platform = 'MacOS';
          else if (/linux/.test(userAgent)) info.platform = 'Linux';
    
          // Detect Browser
          if (/edg/.test(userAgent)) info.browser = 'Microsoft Edge';
          else if (/chrome/.test(userAgent)) info.browser = 'Chrome';
          else if (/firefox/.test(userAgent)) info.browser = 'Firefox';
          else if (/safari/.test(userAgent)) info.browser = 'Safari';
          else if (/opera|opr/.test(userAgent)) info.browser = 'Opera';
    
          // Detect if coming from mobile app
          if (/fb_iab/.test(userAgent) || /fb4a/.test(userAgent)) {
            info.mobileApp = 'Facebook App';
            info.isInApp = true;
          } else if (/instagram/.test(userAgent)) {
            info.mobileApp = 'Instagram App';
            info.isInApp = true;
          } else if (/twitter/.test(userAgent)) {
            info.mobileApp = 'Twitter App';
            info.isInApp = true;
          } else if (/linkedin/.test(userAgent)) {
            info.mobileApp = 'LinkedIn App';
            info.isInApp = true;
          } else if (/whatsapp/.test(userAgent)) {
            info.mobileApp = 'WhatsApp';
            info.isInApp = true;
          } else if (/telegram/.test(userAgent)) {
            info.mobileApp = 'Telegram';
            info.isInApp = true;
          }
    
          // Detect Device Type
          if (/mobile|android|ios|iphone|ipad|ipod/.test(userAgent)) {
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
        
        // Log the detection results
        console.log('Source Detection Results:', info);
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
              <h3 className="font-semibold text-gray-700 mb-2">Mobile App</h3>
              <p className="text-gray-600">{sourceInfo.isInApp ? sourceInfo.mobileApp : 'Not from mobile app'}</p>
            </div>
    
            <div className="p-4 bg-gray-50 rounded-lg col-span-2">
              <h3 className="font-semibold text-gray-700 mb-2">Referrer</h3>
              <p className="text-gray-600">{sourceInfo.referrer}</p>
            </div>
          </div>
        </div>
      );
    };
    
export default TrafficSourceTracker;