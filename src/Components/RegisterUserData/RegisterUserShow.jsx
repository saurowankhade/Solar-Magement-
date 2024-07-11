import { toast } from "react-toastify";
import firestore from "../../Firebase/Firestore";


function RegisterUserShow({getData}) {
    const {name,email,mobileNo,jobProfile,userImg,verified,userID} = getData;
   const handleRightButton = ()=>{
    const added = firestore.updateDocument("Users",userID,{verified:true});
    added.then(()=>{
        toast.success("Added!")
        window.location.reload();
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
