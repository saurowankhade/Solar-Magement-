import { useNavigate } from 'react-router-dom';
import dashboardImg from '../../assets/dashboard.png';
import Testimonial from './Testimonial/Testimonial';
import Feature from './Features/Feature';
import FAQ from './FAQ/FAQ';
import PricingCard from './Pricing/PricingCard';
const Home = () => {
    const navigateTo = useNavigate();
    const handleClick = (e) => {
        const text = e?.target?.innerText;
        switch (text) {
            case 'Register Company': navigateTo("/company-signup"); break;
            case 'Sign In': navigateTo("/user-signin"); break;
            case 'Sign Up': navigateTo("/user-signup"); break;
            default: console.log("Error");

        }

    }

    const testimonials = [
        {
            text: "UrjaSolar has transformed the way we manage our projects. Highly recommend!",
            name: "Mayuresh Gadge"
        },
        {
            text: "The material tracking feature is a lifesaver. Great tool!",
            name: "Shabda Gadge"
        },
        {
            text: "Monitoring progress and managing consumer data has never been easier.",
            name: "Shreenath Solar"
        },
        // Add more testimonials as needed
    ];
    const features = [
        {
            icon: "fas fa-user",
            title: "Consumer Tracking",
            description: "Manage consumer details with ease, from site work to subsidies.",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            icon: "fas fa-box",
            title: "Material Management",
            description: "Track materials added, returned, and used during projects.",
            iconColor: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            icon: "fas fa-users",
            title: "Users Management",
            description: "Manage and verify users for access to project data and features.",
            iconColor: "text-purple-600",
            bgColor: "bg-purple-100"
        },
        {
            icon: "fas fa-file-excel",
            title: "Export to Excel",
            description: "Easily export your data to Excel for better analysis and reporting.",
            iconColor: "text-orange-600",
            bgColor: "bg-orange-100"
        },
        {
            icon: "fas fa-bell",
            title: "Pending Task Reminder",
            description: "Get notified about pending tasks and deadlines for smooth project management.",
            iconColor: "text-red-600",
            bgColor: "bg-red-100"
        },
        {
            icon: "fas fa-sort",
            title: "Easy Sort & Analyze",
            description: "Sort and analyze data easily to make informed decisions and streamline processes.",
            iconColor: "text-teal-600",
            bgColor: "bg-teal-100"
        },
    ];

    const faqData = [
        {
            question: 'What is UrjaSolar?',
            answer: 'UrjaSolar is a platform for solar contractors to manage projects, materials, and progress effectively.'
        },
        {
            question: 'How do I register as a user?',
            answer: 'To register as a user, click on the "Sign Up" button on the homepage, fill in your details, and submit the form to create your account.'
        },
        {
            question: 'How do I register my company?',
            answer: 'To register your company, click on the "Register Company" button after logging in. Fill in the required company information, and submit the form to complete the registration process.'
        },

        {
            question: 'Is it free?',
            answer: 'We offer a free plan along with premium options for additional features.'
        },
        {
            question: 'What is the response time for customer support?',
            answer: 'Our customer support team typically responds within 24 hours during business days. For urgent issues, please mark them as high priority.'
        },
        {
            question: 'What if I face any technical issues?',
            answer: 'If you encounter any technical issues, you can contact our technical support team by emailing support@urjasolar.com, or you can call or WhatsApp us at +91 9322108251.'
        }
    ];

    const pricingData = [
        {

            title: "7-Day Free Tier",
            price: "Free for the first 7 days",
            features: ["Basic Features", "Up to 5 Projects"],
            buttonText: "Get Started",
        },
        {
            title: "Monthly Plan",
            price: "₹999/month",
            features: ["Unlimited Projects", "Android App", "Advanced Features", "Priority Support"],
            buttonText: "Get Started",
        },
        {
            title: "Yearly Plan",
            price: "₹9999/year",
            features: ["Unlimited Projects", "Android App", "Advanced Features", "Priority Support", "2 Months Free"],
            buttonText: "Get Started",
        },
    ];



    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="flex items-center justify-between p-6 bg-white shadow-md">
                <div className="flex gap-2 justify-center items-center">
                    <span>
                        <svg height="32" viewBox="0 0 147 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="12.5635" width="146.286" height="141.436" rx="21" fill="#F7AB0D" />
                            <g filter="url(#filter0_d_27_6)">
                                <path d="M19.5625 45.4688V41.25H66.4375V45.4688H53.9375V99.375C53.9375 105.312 54.4062 110.417 55.3438 114.688C57.8438 126.146 64.3542 131.875 74.875 131.875C91.5417 131.771 99.9271 120.938 100.031 99.375V45.4688H87.5312V41.25H118.312V45.4688H105.812V98.4375C105.812 105.833 104.979 112.135 103.312 117.344C98.9375 130.156 88.3646 136.562 71.5938 136.562C45.4479 136.458 32.2708 124.479 32.0625 100.625V45.4688H19.5625Z" fill="white" />
                            </g>
                            <defs>
                                <filter id="filter0_d_27_6" x="15.5625" y="41.25" width="106.75" height="103.312" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_27_6" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_27_6" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </span>

                    <span className="self-center text-2xl font-semibold whitespace-nowrap sm:block hidden">UrjaSolar</span>
                </div>
                <nav className="hidden md:flex gap-6 text-gray-600">
                    <a href="#features" className="hover:text-black scroll-smooth">Features</a>
                    <a href="#testimonials" className="hover:text-black scroll-smooth">Testimonials</a>
                    <a href="#faq" className="hover:text-black scroll-smooth">FAQ</a>
                    <a href="#pricing" className="hover:text-black scroll-smooth">Pricing</a>
                </nav>
                <div className="flex gap-4">
                    <button onClick={(e) => { handleClick(e) }} className="px-4 py-2 text-sm font-medium text-black border border-black rounded-md hover:bg-[#00000002]">
                        Sign In
                    </button>
                    <button onClick={(e) => { handleClick(e) }} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black">
                        Sign Up
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-16 px-6  ">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                    Simplify Solar Contracting
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                    Empowering solar contractors to manage consumer data, materials, and installation progress—all in one platform.
                </p>
                <div className="mt-6 flex gap-4">
                    <button onClick={(e) => { handleClick(e) }} className="px-6 py-3 font-bold text-white bg-[#000] rounded-lg text-lg hover:bg-[#000d]">
                        Register Company
                    </button>
                </div>
                <img
                    src={dashboardImg}
                    alt="UrjaSolar Dashboard Mockup"
                    className="mt-10 w-full max-w-4xl rounded-lg shadow-lg"
                />
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-gray-50 flex flex-col items-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Features</h2>
                    <p className="mt-4 text-gray-600">
                        Everything you need to manage your solar projects efficiently.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 justify-items-center">
                    {features.map((feature, index) => (
                        <Feature
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            iconColor={feature.iconColor}
                            bgColor={feature.bgColor}
                        />
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-16 sm:px-8 lg:px-32  overflow-hidden">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
                    <p className="mt-4 text-gray-600">Hear from contractors using UrjaSolar.</p>
                </div>
                <div className="mt-12 relative overflow-hidden">
                    {/* Slider container */}
                    <div className="flex animate-slide">
                        {testimonials.map((testimonial, index) => (
                            <Testimonial key={index} testimonial={testimonial} />
                        ))}
                        {/* Duplicate testimonials for infinite scrolling */}
                        {testimonials.map((testimonial, index) => (
                            <Testimonial key={index + testimonials.length} testimonial={testimonial} />
                        ))}
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <FAQ faqData={faqData} />

            {/* Pricing Section */}
            <section id="pricing" className="py-16 flex flex-col items-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Pricing Plans</h2>
                    <p className="mt-4 text-gray-600">Choose the plan that fits your needs.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
                    {pricingData.map((plan, index) => (
                        <PricingCard
                            key={index}
                            title={plan.title}
                            price={plan.price}
                            features={plan.features}
                            buttonText={plan.buttonText}
                        />
                    ))}
                </div>
            </section>





            {/* Footer */}
            <footer className="bg-black text-white">
                <div className="container mx-auto px-6 py-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        {/* Logo and Description */}
                        <div className="mb-6 md:mb-0">
                            {/* <h3 className="text-2xl font-bold text-white">UrjaSolar</h3> */}
                            <div className='flex gap-2'>
                            <span>
                        <svg height="32" viewBox="0 0 147 154" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="12.5635" width="146.286" height="141.436" rx="21" fill="#F7AB0D" />
                            <g filter="url(#filter0_d_27_6)">
                                <path d="M19.5625 45.4688V41.25H66.4375V45.4688H53.9375V99.375C53.9375 105.312 54.4062 110.417 55.3438 114.688C57.8438 126.146 64.3542 131.875 74.875 131.875C91.5417 131.771 99.9271 120.938 100.031 99.375V45.4688H87.5312V41.25H118.312V45.4688H105.812V98.4375C105.812 105.833 104.979 112.135 103.312 117.344C98.9375 130.156 88.3646 136.562 71.5938 136.562C45.4479 136.458 32.2708 124.479 32.0625 100.625V45.4688H19.5625Z" fill="white" />
                            </g>
                            <defs>
                                <filter id="filter0_d_27_6" x="15.5625" y="41.25" width="106.75" height="103.312" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset dy="4" />
                                    <feGaussianBlur stdDeviation="2" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_27_6" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_27_6" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </span>

                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">UrjaSolar</span>
                            </div>
                            <p className="mt-2 text-gray-400">
                                Empowering solar contractors to manage projects efficiently.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div>
                                <h4 className="font-semibold text-lg text-gray-300">Quick Links</h4>
                                <ul className="mt-2 space-y-2">
                                    <li><a href="#features" className="hover:underline text-gray-400">Features</a></li>
                                    <li><a href="#testimonials" className="hover:underline text-gray-400">Testimonials</a></li>
                                    <li><a href="#faq" className="hover:underline text-gray-400">FAQ</a></li>
                                    <li><a href="#pricing" className="hover:underline text-gray-400">Pricing</a></li>
                                </ul>
                            </div>
                            {/* Contact Us */}
                            <div>
                                <h4 className="font-semibold text-lg text-gray-300">Contact Us</h4>
                                <ul className="mt-2 space-y-2">
                                    <li>
                                        <a
                                            href="mailto:support@urjasolar.com"
                                            className="hover:underline text-gray-400"
                                        >
                                            Email: support@urjasolar.com
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="tel:+919322108251"
                                            className="hover:underline text-gray-400"
                                        >
                                            Phone: +91 93221 08251
                                        </a>
                                    </li>
                                    <li>
                                        <p className="text-gray-400">
                                            Address: Pune, India
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mt-8 border-t border-gray-600 pt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            &copy; 2024 UrjaSolar. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

        </div>




    )
}

export default Home