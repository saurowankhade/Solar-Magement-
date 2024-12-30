import { useContext, useEffect, useState } from "react"
import UserContext from "../../../Context/UserContext/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authentication from "../../../Firebase/authentication";
import { setItem } from "../../../utils/LocalStorage/localAuth";
import Swal from "sweetalert2";

const NavBar = () => {
    const [show,setShow] = useState(false);
    const {user} = useContext(UserContext);
    const [hasShadow, setHasShadow] = useState(false);
    const location = useLocation()

    useEffect(() => {
      const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
   }, []);

   const navigate = useNavigate();
   const goBack = () => {
    navigate(-1); // Navigate to the previous route
  };

  const handleSignOut = ()=>{
    Swal.fire({
        title: "Do you want to sign out?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`, customClass: {
          confirmButton: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
          denyButton: 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
        }
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            authentication.signout().then((status)=>{
                if(status.status === 200){
                  setItem("isLogin",{isLogin:false,userID:""})
                  toast.success("Sign out",{position:'top-center'})
                  navigate("/user-signin")
                }
              })
        } 
      });
  }


  return (
<nav className={`fixed w-full top-0 transition-shadow duration-150n-300  border-gray-200   ${hasShadow ? ' shadow-md' : ' border '} ${user?.name ? " bg-white" : " animate-pulse bg-gray-300"}`}>
  <div className=" flex  flex-wrap items-center justify-between mx-auto p-4">
 {
  location.pathname === '/dashboard' ?  <a className="flex  items-center space-x-3 rtl:space-x-reverse">
  {/* <img src={urjaSolarLogo} className="h-8 border" alt="UrjaSolar Icon" /> */}
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

</a>


:  <a onClick={goBack} className="cursor-pointer">
  <svg
      viewBox="0 0 24 24"
      fill="#000"
      height="1.5em"
      width="1.5em"
    >
      <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
    </svg>
  </a>
 }
  <div className="flex items-center gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button onClick={()=>{
        toast.dismiss()
          navigator.clipboard.writeText(user?.companyID).then(()=>{
          toast.success("Copy to clipboard",{position:'bottom-center'})
        })
      }} className="flex text-sm md:me-0 items-center gap-3 text-center  font-bold border p-2 rounded-full bg-gradient-to-r from-[#F7AB0D] to-[#F0D807] text-white">{user?.companyID}</button>
      {
         user?.jobProfile === "Admin" && user?.verified ? 
         <div className="mr-4 sm:mr-10 ">
      <button
          onClick={()=>{
            // navigateTo('/dashboard/notification')
          }}
          type="button"
          className="flex"
        >
          <svg 
      height="1.5em"
      width="1.5em" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33334 39.5834V35.4167H12.5V20.8334C12.5 17.9514 13.3681 15.3993 15.1042 13.1771C16.8403 10.9202 19.0972 9.44446 21.875 8.75002V7.29169C21.875 6.42363 22.1702 5.69446 22.7604 5.10418C23.3854 4.47919 24.132 4.16669 25 4.16669C25.8681 4.16669 26.5972 4.47919 27.1875 5.10418C27.8125 5.69446 28.125 6.42363 28.125 7.29169V8.75002C30.9028 9.44446 33.1597 10.9202 34.8958 13.1771C36.632 15.3993 37.5 17.9514 37.5 20.8334V35.4167H41.6667V39.5834H8.33334ZM25 45.8334C23.8542 45.8334 22.8646 45.434 22.0313 44.6354C21.2327 43.8021 20.8333 42.8125 20.8333 41.6667H29.1667C29.1667 42.8125 28.75 43.8021 27.9167 44.6354C27.1181 45.434 26.1458 45.8334 25 45.8334ZM16.6667 35.4167H33.3333V20.8334C33.3333 18.5417 32.5174 16.5799 30.8854 14.9479C29.2535 13.316 27.2917 12.5 25 12.5C22.7083 12.5 20.7465 13.316 19.1146 14.9479C17.4827 16.5799 16.6667 18.5417 16.6667 20.8334V35.4167Z" fill="#1D1B20"/>
</svg>
        </button>
      </div> : <></>
      }
      
      <div className="relative z-100">
        <button
          onClick={() => setShow(!show)}
          type="button"
          className="flex text-sm md:me-0 items-center gap-3  "
          id="user-menu-button"
          aria-expanded={show}
          data-dropdown-toggle="user-dropdown"
        >
            <div className="hidden sm:flex sm:flex-col text-sm items-end ">
                <p className={`text-gray-700 text-[14px]${user?.name ? " " : " w-[50px] bg-gray-500 animate-pulse rounded-md  text-gray-500 "}`}>{user?.name || "hello"}</p>

                <p className={`text-gray-500 text-[12px]${user?.jobProfile ? " " : " w-[50px] bg-gray-500 animate-pulse  rounded-md  text-white "}`}>{user?.jobProfile || "   "}</p>
            </div>
            <svg width="35" height="35" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="36" rx="18" fill="url(#paint0_linear_421_90)"/>
<path d="M20 18C18.1667 18 16.5972 17.4125 15.2917 16.2375C13.9861 15.0625 13.3334 13.65 13.3334 12C13.3334 10.35 13.9861 8.9375 15.2917 7.7625C16.5972 6.5875 18.1667 6 20 6C21.8334 6 23.4028 6.5875 24.7084 7.7625C26.0139 8.9375 26.6667 10.35 26.6667 12C26.6667 13.65 26.0139 15.0625 24.7084 16.2375C23.4028 17.4125 21.8334 18 20 18ZM6.66669 30V25.8C6.66669 24.95 6.90974 24.1687 7.39585 23.4562C7.88196 22.7437 8.5278 22.2 9.33335 21.825C11.0556 21.05 12.8056 20.4687 14.5834 20.0812C16.3611 19.6937 18.1667 19.5 20 19.5C21.8334 19.5 23.6389 19.6937 25.4167 20.0812C27.1945 20.4687 28.9445 21.05 30.6667 21.825C31.4722 22.2 32.1181 22.7437 32.6042 23.4562C33.0903 24.1687 33.3334 24.95 33.3334 25.8V30H6.66669ZM10 27H30V25.8C30 25.525 29.9236 25.275 29.7709 25.05C29.6181 24.825 29.4167 24.65 29.1667 24.525C27.6667 23.85 26.1528 23.3438 24.625 23.0063C23.0972 22.6688 21.5556 22.5 20 22.5C18.4445 22.5 16.9028 22.6688 15.375 23.0063C13.8472 23.3438 12.3334 23.85 10.8334 24.525C10.5834 24.65 10.382 24.825 10.2292 25.05C10.0764 25.275 10 25.525 10 25.8V27ZM20 15C20.9167 15 21.7014 14.7062 22.3542 14.1187C23.007 13.5312 23.3334 12.825 23.3334 12C23.3334 11.175 23.007 10.4688 22.3542 9.88125C21.7014 9.29375 20.9167 9 20 9C19.0834 9 18.2986 9.29375 17.6459 9.88125C16.9931 10.4688 16.6667 11.175 16.6667 12C16.6667 12.825 16.9931 13.5312 17.6459 14.1187C18.2986 14.7062 19.0834 15 20 15Z" fill="#FDF7FF"/>
<defs>
<linearGradient id="paint0_linear_421_90" x1="0" y1="18" x2="40" y2="18" gradientUnits="userSpaceOnUse">
<stop stopColor="#F6AE0C"/>
<stop offset="1" stopColor="#F0D707"/>
</linearGradient>
</defs>
</svg>

        </button>

        {/* Dropdown menu */}
        <div
          className={`absolute right-1 my-6  z-50 ${show ? " block " : "hidden"}  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow  sm:right-1 md:right-0  lg:right-0 `}
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 ">{user?.name}</span>
            <span className="block text-sm text-gray-500 truncate ">{user?.email}</span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <a href="#" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
              <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
        clipRule="evenodd"
      />
    </svg>
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
              <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
      <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" />
    </svg>
                FAQ
              </a>
            </li>
            <li>
              <a onClick={handleSignOut}  className=" flex gap-2 items-center cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z" />
    </svg>Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</nav>

  )
}

export default NavBar
