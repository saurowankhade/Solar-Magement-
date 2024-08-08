import { useContext, useState } from "react"
import UserContext from "../../../Context/UserContext/UserContext";
import { useNavigate } from "react-router-dom";

import urjaSolarLogo from '../../../../urja-solar.png'
import allUserIcon from '../../../assets/all-user.png'
import userIcon from '../../../assets/user-profile.png'

const NavBar = () => {
    const [show,setShow] = useState(false);
    const {user} = useContext(UserContext);
    const viwAllUser = useNavigate();
  return (
<nav className="bg-white border-gray-200 border shadow-xl">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a  className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={urjaSolarLogo} className="h-8" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap sm:block hidden">UrjaSolar</span>
  </a>
  <div className="flex items-center gap-3 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      
      {
         user?.jobProfile === "Admin" ? 
         <div className="mr-4 sm:mr-10 ">
      <button
          onClick={()=>{
            viwAllUser('/regitser-users')
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
      
      <div>
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
          className={`absolute right-3 my-6  z-100 ${show ? " block " : "hidden"}  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow  sm:right-4 md:right-14 `}
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 ">{user?.name}</span>
            <span className="block text-sm text-gray-500 truncate ">{user?.email}</span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sign out
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
