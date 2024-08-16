import { useContext, useEffect, useState } from "react"
import UserContext from "../../../Context/UserContext/UserContext";
import { useLocation, useNavigate } from "react-router-dom";

import urjaSolarLogo from '../../../../urja-solar.png'
import allUserIcon from '../../../assets/all-user.png'
import userIcon from '../../../assets/user-profile.png'
import { toast } from "react-toastify";
import authentication from "../../../Firebase/authentication";
import firestore from "../../../Firebase/Firestore";
import { setItem } from "../../../utils/LocalStorage/localAuth";

const NavBar = () => {
    const [show,setShow] = useState(false);
    const {user} = useContext(UserContext);
    const navigateTo = useNavigate();
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



  return (
<nav className={`transition-shadow duration-150n-300  border-gray-200   ${hasShadow ? ' shadow-md' : ' border '} ${user?.name ? " bg-white" : " animate-pulse bg-gray-300"}`}>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
 {
  location.pathname === '/dashboard' ?  <a className="flex items-center space-x-3 rtl:space-x-reverse">
  <img src={urjaSolarLogo} className="h-8" alt="UrjaSolar Icon" />
  <span className="self-center text-2xl font-semibold whitespace-nowrap sm:block hidden">UrjaSolar</span>
</a> :  <a onClick={goBack} className="cursor-pointer">
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
      }} className="flex text-sm md:me-0 items-center gap-3  border p-2 rounded-full bg-blue-900 text-white">{user?.companyID}</button>
      {
         user?.jobProfile === "Admin" && user?.verified ? 
         <div className="mr-4 sm:mr-10 ">
      <button
          onClick={()=>{
            navigateTo('/regitser-users')
          }}
          type="button"
          className="flex text-sm md:me-0 items-center gap-3  "
        >
          <img
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            src={allUserIcon}
            alt="user profiles"
          />
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
          <img
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            src={userIcon}
            alt="user photo"
          />
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
              <a onClick={()=>{
                authentication.signout().then((status)=>{
                  if(status.status === 200){
                    setItem("isLogin",{isLogin:false,userID:""})
                    toast.success("Sign out",{position:'top-center'})
                    navigateTo("/user-signin")
                  }
                })
              }}  className=" flex gap-2 items-center cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
