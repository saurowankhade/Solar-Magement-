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
      <button onClick={()=>{
        handleButton("/new-acivity")
      }}  className="p-2 text-base w-full border sm:p-3 sm:text-lg rounded-full bg-green-900 text-white shadow-md ">New Acivity</button>
      <button onClick={()=>{
        handleButton("/show-existing-acivity")
      }} className="p-2 text-base w-full border sm:p-3 sm:text-lg rounded-full bg-yellow-900 text-white shadow-md ">Existing Acivity</button>
    </div>
  )
}

export default AcivityButton
