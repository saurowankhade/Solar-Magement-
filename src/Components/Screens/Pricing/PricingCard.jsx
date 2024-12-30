import { useNavigate } from "react-router-dom";

const PricingCard = ({ title, price, features, buttonText }) => {
    const navigateTo = useNavigate();
    const handleClick = ()=>{
        if(title.includes('Free')){
            navigateTo('/user-signin');
        }
    }
    return (
        <div className="p-6 w-[250px] sm:w-[400px] bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="mt-4 text-gray-600">{price}</p>
            <ul className="mt-4 text-gray-600">
                {features.map((feature, index) => (
                    <li key={index}>✔ {feature}</li>
                ))}
            </ul>
            <button onClick={handleClick} className="mt-6 px-4 py-2 bg-[black] text-white rounded-md hover:bg-[#000000de]">
                {buttonText}
            </button>
        </div>
    );
};
export default PricingCard