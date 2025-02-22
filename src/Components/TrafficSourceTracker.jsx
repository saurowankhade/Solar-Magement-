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
          const vendor = navigator.vendor?.toLowerCase() || '';
          
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
    
          // Enhanced App Detection using multiple signals
          const detectApp = () => {
            // Check if running in WebView
            const isWebView = (/; wv\)/.test(userAgent)) || 
                             (/safari/.test(userAgent) && !/version/.test(userAgent));
    
            // iOS specific WebView detection
            const isIOSWebView = info.platform === 'iOS' && 
                               !(/safari/.test(userAgent)) && 
                               !(/CriOS/.test(userAgent));
    
            // Android specific patterns
            if (info.platform === 'Android') {
              if (/whatsapp/.test(userAgent)) return 'WhatsApp';
              if (/telegram/.test(userAgent)) return 'Telegram';
              if (/instagram/.test(userAgent)) return 'Instagram';
              if (/fb_iab|fb4a|fbav/.test(userAgent)) return 'Facebook';
              
              // Check for specific Android WebView patterns
              if (isWebView) {
                // WhatsApp typically includes specific browser versions
                if (/chrome/.test(userAgent) && /mobile safari/.test(userAgent)) {
                  const chromeVersion = userAgent.match(/chrome\/(\d+)/i)?.[1];
                  if (chromeVersion) {
                    // WhatsApp commonly uses specific Chrome versions
                    if (['96', '97', '98', '99'].includes(chromeVersion)) {
                      return 'Likely WhatsApp';
                    }
                    // Telegram commonly uses different Chrome versions
                    if (['94', '95'].includes(chromeVersion)) {
                      return 'Likely Telegram';
                    }
                  }
                }
              }
            }
    
            // iOS specific patterns
            if (info.platform === 'iOS') {
              if (isIOSWebView) {
                if (/whatsapp/.test(userAgent)) return 'WhatsApp';
                if (/telegram/.test(userAgent)) return 'Telegram';
                if (/instagram/.test(userAgent)) return 'Instagram';
                // iOS apps often use specific Mozilla/WebKit versions
                const webkitVersion = userAgent.match(/webkit\/(\d+)/i)?.[1];
                if (webkitVersion) {
                  if (['602', '603'].includes(webkitVersion)) {
                    return 'Likely WhatsApp';
                  }
                }
              }
            }
    
            // Check URL parameters if available
            const urlParams = new URLSearchParams(window.location.search);
            const source = urlParams.get('source')?.toLowerCase();
            if (source) {
              if (source.includes('whatsapp')) return 'WhatsApp (via URL)';
              if (source.includes('telegram')) return 'Telegram (via URL)';
            }
    
            // If all specific detection fails, return generic in-app browser
            if (isWebView || isIOSWebView) {
              return `In-App Browser (${info.platform})`;
            }
    
            return 'Browser';
          };
    
          info.mobileApp = detectApp();
          info.isInApp = info.mobileApp !== 'Browser';
    
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
        console.log('Full Detection Details:', {
          ...info,
          userAgent: navigator.userAgent,
          vendor: navigator.vendor,
          referrer: document.referrer,
          platform: navigator.platform
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
              <h3 className="font-semibold text-gray-700 mb-2">App Source</h3>
              <p className="text-gray-600">{sourceInfo.mobileApp}</p>
            </div>
    
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Device Type</h3>
              <p className="text-gray-600">{sourceInfo.deviceType}</p>
            </div>
    
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Is In-App?</h3>
              <p className="text-gray-600">{sourceInfo.isInApp ? 'Yes' : 'No'}</p>
            </div>
    
            <div className="p-4 bg-gray-50 rounded-lg col-span-2">
              <h3 className="font-semibold text-gray-700 mb-2">User Agent</h3>
              <p className="text-gray-600 break-all text-sm">{navigator.userAgent}</p>
            </div>
          </div>
        </div>
      );
    };
    
    
export default TrafficSourceTracker;