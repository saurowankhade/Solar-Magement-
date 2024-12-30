import { useNavigate } from 'react-router-dom';
import dashboardImg from '../../assets/dashboard.png';
const Home = ()=>{
    const navigateTo = useNavigate();
    const handleClick = (e)=>{
        const text = e?.target?.innerText;
        console.log(e);
        
        switch(text) {
            case 'Register Company' : navigateTo("/company-signup") ; break;
            case 'Sign In' : navigateTo("/user-signin") ; break;
            case 'Sign Up' : navigateTo("/user-signup") ; break;
            default : console.log("Error");
            
        }
        
    }
    return (
    <div className="min-h-screen">
  {/* Header */}
  <header className="flex items-center justify-between p-6 bg-white shadow-md">
    <div className="flex gap-2 justify-center items-center">
    <span>
 <svg  height="32" viewBox="0 0 147 154" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="12.5635" width="146.286" height="141.436" rx="21" fill="#F7AB0D"/>
<g filter="url(#filter0_d_27_6)">
<path d="M19.5625 45.4688V41.25H66.4375V45.4688H53.9375V99.375C53.9375 105.312 54.4062 110.417 55.3438 114.688C57.8438 126.146 64.3542 131.875 74.875 131.875C91.5417 131.771 99.9271 120.938 100.031 99.375V45.4688H87.5312V41.25H118.312V45.4688H105.812V98.4375C105.812 105.833 104.979 112.135 103.312 117.344C98.9375 130.156 88.3646 136.562 71.5938 136.562C45.4479 136.458 32.2708 124.479 32.0625 100.625V45.4688H19.5625Z" fill="white"/>
</g>
<defs>
<filter id="filter0_d_27_6" x="15.5625" y="41.25" width="106.75" height="103.312" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_27_6"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_27_6" result="shape"/>
</filter>
</defs>
</svg>
 </span>

  <span className="self-center text-2xl font-semibold whitespace-nowrap sm:block hidden">UrjaSolar</span>
    </div>
    <nav className="hidden md:flex gap-6 text-gray-600">
      <a href="#features" className=" hover:text-[#000]">Features</a>
      <a href="#testimonials" className="hover:text-black">Testimonials</a>
      <a href="#faq" className="hover:text-black">FAQ</a>
      <a href="#pricing" className="hover:text-black">Pricing</a>
    </nav>
    <div className="flex gap-4">
      <button onClick={(e)=>{handleClick(e)}} className="px-4 py-2 text-sm font-medium text-black border border-black rounded-md hover:bg-[#00000002]">
        Sign In
      </button>
      <button onClick={(e)=>{handleClick(e)}} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black">
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
      <button onClick={(e)=>{handleClick(e)}} className="px-6 py-3 font-bold text-white bg-[#000] rounded-lg text-lg hover:bg-[#000d]">
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
  <section id="features" className="py-16 bg-white flex flex-col items-center">
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-800">Features</h2>
    <p className="mt-4 text-gray-600">
      Everything you need to manage your solar projects efficiently.
    </p>
  </div>
  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 justify-items-center">
    {/* Consumer Tracking */}
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
      <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
        <i className="fas fa-user"></i>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">Consumer Tracking</h3>
      <p className="mt-2 text-gray-600">
        Manage consumer details with ease, from site work to subsidies.
      </p>
    </div>
    
    {/* Material Management */}
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600">
        <i className="fas fa-box"></i>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">Material Management</h3>
      <p className="mt-2 text-gray-600">
        Track materials added, returned, and used during projects.
      </p>
    </div>
    
    {/* Users Management */}
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
      <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
        <i className="fas fa-users"></i>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">Users Management</h3>
      <p className="mt-2 text-gray-600">
        Manage and verify users for access to project data and features.
      </p>
    </div>
  </div>
  
  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 justify-items-center">
    {/* Export to Excel */}
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
      <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
        <i className="fas fa-file-excel"></i>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">Export to Excel</h3>
      <p className="mt-2 text-gray-600">
        Easily export your data to Excel for better analysis and reporting.
      </p>
    </div>
    
    {/* Pending Task Reminder */}
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
      <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center text-red-600">
        <i className="fas fa-bell"></i>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">Pending Task Reminder</h3>
      <p className="mt-2 text-gray-600">
        Get notified about pending tasks and deadlines for smooth project management.
      </p>
    </div>
    
    {/* Easy Sort and Analyze */}
    <div className="max-w-xs w-full bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
      <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
        <i className="fas fa-sort"></i>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800">Easy Sort & Analyze</h3>
      <p className="mt-2 text-gray-600">
        Sort and analyze data easily to make informed decisions and streamline processes.
      </p>
    </div>
  </div>
</section>




  {/* Testimonials */}
  <section id="testimonials" className="py-16 bg-gray-50">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800">What Our Users Say</h2>
      <p className="mt-4 text-gray-600">Hear from contractors using UrjaSolar.</p>
    </div>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-600">
          &quot;UrjaSolar has transformed the way we manage our projects. Highly
          recommend!&quot;
        </p>
        <p className="mt-4 font-bold text-gray-800">- John D.</p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-600">
        &quot;The material tracking feature is a lifesaver. Great tool !&quot;
        </p>
        <p className="mt-4 font-bold text-gray-800">- Sarah M.</p>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <p className="text-gray-600">
          &quot;Monitoring progress and managing consumer data has never been
          easier.&quot;
        </p>
        <p className="mt-4 font-bold text-gray-800">- Raj K.</p>
      </div>
    </div>
  </section>

  {/* FAQ Section */}
  <section id="faq" className="py-16 bg-white">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
      <p className="mt-4 text-gray-600">Everything you need to know.</p>
    </div>
    <div className="mt-12 space-y-8 px-6 md:px-12">
      <div>
        <h4 className="text-lg font-semibold text-gray-800">What is UrjaSolar?</h4>
        <p className="text-gray-600">UrjaSolar is a platform for solar contractors to manage projects, materials, and progress effectively.</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">How do I get started?</h4>
        <p className="text-gray-600">Click on "Get Started" to create an account and start managing your projects.</p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800">Is it free?</h4>
        <p className="text-gray-600">We offer a free plan along with premium options for additional features.</p>
      </div>
    </div>
  </section>

  {/* Pricing Section */}
  <section id="pricing" className="py-16 bg-gray-50">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-800">Pricing Plans</h2>
      <p className="mt-4 text-gray-600">Choose the plan that fits your needs.</p>
    </div>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-800">Free Plan</h3>
        <p className="mt-4 text-gray-600">$0/month</p>
        <ul className="mt-4 text-gray-600">
          <li>✔ Basic Features</li>
          <li>✔ Up to 10 Projects</li>
        </ul>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Get Started
        </button>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-800">Professional Plan</h3>
        <p className="mt-4 text-gray-600">$49/month</p>
        <ul className="mt-4 text-gray-600">
          <li>✔ Unlimited Projects</li>
          <li>✔ Advanced Features</li>
        </ul>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Get Started
        </button>
      </div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-800">Enterprise Plan</h3>
        <p className="mt-4 text-gray-600">Custom Pricing</p>
        <ul className="mt-4 text-gray-600">
          <li>✔ Tailored Features</li>
          <li>✔ Priority Support</li>
        </ul>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Contact Us
        </button>
      </div>
    </div>
  </section>

  
    {/* Footer */}
    <footer className="bg-gray-800 text-white">
  <div className="container mx-auto px-6 py-10">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      {/* Logo and Description */}
      <div className="mb-6 md:mb-0">
        <h3 className="text-2xl font-bold text-white">UrjaSolar</h3>
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