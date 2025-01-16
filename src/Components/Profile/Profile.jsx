import { useContext, useRef, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import { toast } from "react-toastify";
import firestore from "../../Firebase/Firestore";

import ReactLoading from 'react-loading';

const Profile = () => {
    const {user} = useContext(UserContext);
    const [compnayIdState,setCompnayIdState] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const handleAdd = ()=>{
        setIsLoading(true)
        firestore.updateData("Users",{
            companyID:[...user?.companyID,compnayIdState]
        },user?.userID)
        .then((status)=>{
            if(status.status === 200){
                toast.success("Added!")
            } else{
                toast.error(status.message)
            }
            setIsLoading(false)
        }).catch((e)=>{
            console.log(e);
            
        })
    }
    const handleActiveId = (e)=>{
        setIsLoading(true)
        firestore.updateData("Users",{
            activeID:e.target.value
        },user?.userID)
        .then((status)=>{
            if(status.status === 200){
                toast.success("Added!")
            } else{
                toast.error(status.message)
            }
            setIsLoading(false)
        }).catch((e)=>{
            console.log(e);
            
        })
    }
  return (
    <div className="max-w-lg mx-auto mt-32 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="mb-4">
        <h2 className="text-gray-700 font-semibold">Name</h2>
        <p className="text-gray-800">{user?.name || "N/A"}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-gray-700 font-semibold">Email</h2>
        <p className="text-gray-800">{user?.email || "N/A"}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-gray-700 font-semibold">Phone</h2>
        <p className="text-gray-800">{user?.mobileNo || "N/A"}</p>
      </div>

      {user?.isCmp ?  
      <div className="w-full justify-center my-2">    
                <div className=" border rounded-full flex items-center py-2 gap-1 px-2 justify-between  ">
                <div className="text-base px-1">Company ID :</div> 
                    <select className="outline-none cursor-pointer text-base w-[100px] sm:w-fit" name="documents" id="documents" value={user?.activeID}  onChange={(e)=>{handleActiveId(e)}}  >
                        {
                            user?.companyID.map((document)=>(
                                <option className="cursor-pointer" key={document} value={document}>
                                    {document}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
 :
          
          <div className="mb-4">
            <h2 className="text-gray-700 font-semibold">Company ID</h2>
            <p className="text-gray-800">{user?.companyID || "N/A"}</p>
          </div>

          }

  {
    user?.isCmp &&(
        <div className="text-center  mt-6 flex flex-col gap-3 ">
        <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none   text-lg" placeholder="Compnay ID" type="text"  value={compnayIdState} onChange={(e)=>{
            setCompnayIdState(e.target.value)
        }}  />
  
          <div className="flex flex-col items-center">
          {
            isLoading ? <ReactLoading type='spinningBubbles' color='#000' height={'10%'} width={'10%'} /> :  
                            
            <button
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-[#000000d9]"
            onClick={()=>{
                if(compnayIdState.length < 14){
                    toast.error("Enter proper ID")
                } else{
                    handleAdd()
                } 
            } }
          >
            Add Compnay ID
          </button>
          }
          </div>
        </div>
    )
  }
    </div>
  );
};

export default Profile;
