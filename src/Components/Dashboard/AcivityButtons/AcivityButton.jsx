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
    <div className="flex justify-evenly mt-10 gap-3">
      <button onClick={(e)=>{
        e.stopPropagation()
        toast.dismiss()
        if(user?.verified === true){
          handleButton("/new-acivity")
        } else{
          toast.info("You are not verified",{position:'top-center'})
        }
      }} className={`p-2 text-sm  w-full border sm:p-3 sm:text-base rounded-full ${user?.verified ? "bg-green-900 text-white" : "bg-gray-400  text-gray-800"}  ${user?.name ? "" : " animate-pulse"} shadow-md `}>Project Entry</button>
      <button onClick={(e)=>{
        e.stopPropagation()
        handleButton("/show-existing-acivity")
      }} className={`py-2 px-3 text-sm  w-full border sm:p-3 sm:text-base rounded-full ${user?.name ? " bg-yellow-900 text-white" : " bg-gray-400 text-gray-900"} shadow-md `}>Project Overview</button>
    </div>
  )
}

export default AcivityButton
