// components/Feature.js
const Feature = ({ icon, title, description, iconColor, bgColor }) => {
  return (
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
      <div className={`w-16 h-16 mx-auto ${bgColor} rounded-full flex items-center justify-center ${iconColor}`}>
        <i className={icon}></i>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default Feature;
