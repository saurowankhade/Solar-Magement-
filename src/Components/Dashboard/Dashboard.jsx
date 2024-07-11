
import { useContext, useRef } from "react";
import NavigationDashboard from "./NavigationDashboard";
import UserContext from "../../Context/UserContext/UserContext";
import { toast } from "react-toastify";
const Dashboard =  ()=>{ 
  const {user} = useContext(UserContext);
  const copyRef = useRef();


  const copyToClipboard = ()=>{
    const copyText = copyRef.current.value;
    navigator.clipboard.writeText(copyText).then(()=>{
      toast.success("Copied to Clipboard");
    });
  }
  return(
        
        <div className="flex flex-col">
        <NavigationDashboard />

        <div className="ml-[200px] border p-3 w-fit flex gap-2" onClick={copyToClipboard}>
          <p  >Compay ID : </p>
            <input className="outline-none cursor-pointer" type="text"
             readOnly ref={copyRef} value={user ? user?.companyID : "Loading..."} / >
        </div>

        </div>
    )
}

export default Dashboard