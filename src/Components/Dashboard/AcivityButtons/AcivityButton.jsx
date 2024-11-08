import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import UserContext from "../../../Context/UserContext/UserContext";
import { toast } from "react-toastify";

const AcivityButton = () => {
    const navigator = useNavigate();
    const {user} = useContext(UserContext);
    const handleButton = (goto) =>{
      if(user?.name){
        navigator(goto)
      }
    }
  return (
   <div>
     <div className="flex justify-evenly mt-10 gap-3">
      <button onClick={(e)=>{
        e.stopPropagation()
        toast.dismiss()
        if(user?.verified === true){
          handleButton("/dashboard/new-acivity")
        } else{
          toast.info("You are not verified",{position:'top-center'})
        }
      }} className={`p-2 text-sm  w-full border sm:p-3 sm:text-base rounded-full ${user?.verified ? "bg-[#000000e9] font-bold text-white" : "bg-gray-400  text-gray-800"}  ${user?.name ? "" : " animate-pulse"} shadow-md `}>Project Entry</button>
      <button onClick={(e)=>{
        e.stopPropagation()
        handleButton("/dashboard/show-existing-acivity")
      }} className={`py-2 px-3 text-sm  w-full border sm:p-3 sm:text-base rounded-full ${user?.name ? " bg-[#000000e9] font-bold text-white" : " bg-gray-400 text-gray-900"} shadow-md `}>Project Overview</button>
    </div>

    <div className="flex justify-evenly mt-10 gap-3">
      <button onClick={(e)=>{
        e.stopPropagation()
        toast.dismiss()
        if(user?.verified === true){
          handleButton("/dashboard/material-entry")
        } else{
          toast.info("You are not verified",{position:'top-center'})
        }
      }} className={`p-2 text-sm  w-full border sm:p-3 sm:text-base rounded-full ${user?.verified ? "bg-[#000000e9] font-bold text-white" : "bg-gray-400  text-gray-800"}  ${user?.name ? "" : " animate-pulse"} shadow-md `}>Material Entry</button>
      <button onClick={(e)=>{
        e.stopPropagation()
        handleButton("/dashboard/material-overview")
      }} className={`py-2 px-3 text-sm  w-full border sm:p-3 sm:text-base rounded-full ${user?.name ? " bg-[#000000e9] font-bold text-white" : " bg-gray-400 text-gray-900"} shadow-md `}>Material Overview</button>
    </div>

    <div className="flex justify-evenly mt-10 gap-3">
      <button onClick={(e)=>{
        e.stopPropagation()
        toast.dismiss()
        if(user?.verified === true){
          handleButton("/dashboard/library")
        } else{
          toast.info("You are not verified",{position:'top-center'})
        }
      }} className={`p-2 text-sm flex items-center justify-center gap-4  w-full border sm:p-3 sm:text-base rounded-full hover:bg-black ${user?.verified ? "bg-[#000000e9] font-bold text-white" : "bg-gray-400  text-gray-800"}  ${user?.name ? "" : " animate-pulse"} shadow-md  `}>
        <span> <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      viewBox="0 0 24 24"
      height="1.2em"
      width="1.2em"
    >
      <path d="M16 6l4 14M12 6v14M8 8v12M4 4v16" />
    </svg></span>
         <span>Library</span></button>
    </div>

   </div>
  )
}

export default AcivityButton
