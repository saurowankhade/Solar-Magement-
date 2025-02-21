import { useEffect, useState } from "react";

const CheckIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CopyIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CelebrationUI = ({ id = "ABC-123-XYZ", duration = 6000 , showCelebration,setShowCelebration }) => {
  const [confetti, setConfetti] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  // Generate random confetti pieces
  useEffect(() => {
    const colors = ['#FFD700', '#FF69B4', '#4169E1', '#32CD32', '#FF4500'];
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)]
    }));
    setConfetti(pieces);

    // Hide celebration after duration
    // const timer = setTimeout(() => {
    //   setIsVisible(false);
    // }, duration);

    // return () => clearTimeout(timer);
  }, [duration]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copy status after 2s
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className=" absolute bg-[#00000016] backdrop-blur-lg h-full w-full  inset-0 flex items-center justify-center z-50">
      <div className="relative w-full h-full">
        {/* Confetti pieces */}
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-2 h-2 rounded-full animate-fall"
            style={{
              left: piece.left,
              backgroundColor: piece.backgroundColor,
              animationDelay: piece.animationDelay,
              top: '-10px'
            }}
          />
        ))}
        
        {/* Message card */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center ">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Company ID!</h2>
            
            {/* ID Display with Copy Button */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="bg-gray-100 px-4 py-2 rounded-l font-mono text-lg">
                {id}
              </div>
              <button
                onClick={handleCopy}
                className={`p-2 rounded-r transition-colors ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                title="Copy to clipboard"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>

            <button
              onClick={() => 
              {
                setIsVisible(false)
                setShowCelebration(false)
              }
              }
              className="px-4 py-2 bg-black text-white rounded hover:bg-[#000000c3] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CelebrationUI;