import { toast } from "react-toastify";
import firestore from "../../Firebase/Firestore";
import { useState } from "react";
import Loading from "react-loading";

function RegisterUserShow({getData}) {
    const {name,email,mobileNo,jobProfile,userImg,verified,userID,companyID,isCmp} = getData;
    const [isLoading,setIsLoading] = useState(false);
   const handleRightButton = ()=>{
    setIsLoading(true)
    firestore.addData("Users",{
        name:name,
        mobileNo:mobileNo,
        email:email,
        jobProfile:jobProfile,
        companyID:companyID,
        userID:userID,
        userImg:userImg,
        mobileNoVerify:false,
        isCmp:isCmp,
        verified:true
    },userID)
    .then((status)=>{
        if(status.status === 200){
            toast.success("Added!")
            window.location.reload();
            
        } else{
            toast.error("Failed")
        }
        setIsLoading(false)
        
    }).catch((error)=>{
        toast.error(error.message)
    })
    }
    const handleWrongButton = ()=>{
        const added = firestore.updateDocument("Users",userID,{verified:false});
    added.then(()=>{
        toast.success("Added!")
        window.location.reload();
    }).catch((error)=>{
        toast.error(error.message)
    })
    }
  return (
    <div className="border w-full shadow-md p-3 flex flex-col gap-3 mt-3">
        <div className="flex justify-between">
        <p>Name : {name} </p>
        {
            verified ? 
            <p className="text-2xl cursor-pointer" title="Verified">✅</p> 
            : 
            isLoading ? <Loading type='spinningBubbles' color='#3b82f6' height={'4%'} width={'4%'} /> :  
                          
            <span className="flex gap-2">
            <p className="text-2xl cursor-pointer" onClick={handleWrongButton}>❌</p>
            <p className="text-2xl cursor-pointer" onClick={handleRightButton}>✅</p>
           </span>
        }
        </div>
        <p>Email : {email}</p>
        <p>Mobile No : {mobileNo}</p>
        <p>Job Profile : {jobProfile}</p>
    </div>
  )
}

export default RegisterUserShow
