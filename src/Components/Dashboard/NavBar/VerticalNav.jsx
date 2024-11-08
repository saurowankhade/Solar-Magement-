import { useContext } from "react";
import { useEffect, useState } from "react";
// import UserContext from "../../../Context/UserContext/UserContext";

const VerticalNav = () => {
    const [processArray,setProcessArray] = useState(["Project Entry","Project Overview","Material Entry","Material Overview","All Users","Profile"]);


    // const {user} = useContext(UserContext);


    return (
        <div className={`sticky overflow-hidden bg-white top-0 bottom-0 flex md:justify-center items-start md:flex-col bg-[rgba(217, 217, 217, 0.27)] md:border-x-[1px] shadow-sm md:w-[250px] w-full border-y-[1px] h-fit overflow-x-scroll xl:overflow-x-hidden scrollbar-hide`}>
            {
                processArray.map((title,index)=>(
                    <div key={`${title+index}`}  
                     className={` flex justify-center text-center items-center gap-4 p-6  cursor-pointer group 
                    `}>
                         <svg
      viewBox="0 0 640 512"
      fill="currentColor"
      height="2em"
      width="2em"
    >
      <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7-1.3 7.2-1.9 14.7-1.9 22.3 0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320h-.7c26.6-23.5 43.3-57.8 43.3-96 0-7.6-.7-15-1.9-22.3 13.6-6.3 28.7-9.7 44.6-9.7h42.7c58.9 0 106.7 47.8 106.7 106.7 0 11.8-9.6 21.3-21.3 21.3H405.3zm10.7-96c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM128 485.3c0-73.6 59.7-133.3 133.3-133.3h117.4c73.6 0 133.3 59.7 133.3 133.3 0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
    </svg>
    
                    <span className={`text-sm md:text-base group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out `}>{title}</span>
                </div>
                ))
            }
        </div>
    )
}

export default VerticalNav
