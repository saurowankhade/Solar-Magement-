import { useContext, useEffect, useState } from "react"
import UserContext from "../../../Context/UserContext/UserContext";
import { useNavigate } from "react-router-dom";

import urjaSolarLogo from '../../../../urja-solar.png'
import allUserIcon from '../../../assets/all-user.png'
import userIcon from '../../../assets/user-profile.png'
import { toast } from "react-toastify";
import authentication from "../../../Firebase/authentication";
import { setItem } from "../../../utils/LocalStorage/localAuth";

const BackButton = () => {
    const [hasShadow, setHasShadow] = useState(false);

    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); // Navigate to the previous route
    };

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


  return (
<nav className={`sticky top-0 transition-shadow duration-150n-300  border-gray-200   ${hasShadow ? ' shadow-md' : ' border '} bg-white`}>
  <div className="max-w-screen-xl flex flex-wrap items-start justify-start p-4">
  <a onClick={goBack} className="cursor-pointer">
  <svg
      viewBox="0 0 24 24"
      fill="#000"
      height="1.5em"
      width="1.5em"
    >
      <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
    </svg>
  </a>


  </div>
</nav>

  )
}

export default BackButton
