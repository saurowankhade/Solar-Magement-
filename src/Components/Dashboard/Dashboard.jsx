
import { useContext, useRef } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import { toast } from "react-toastify";
import NavBar from "./NavBar/NavBar";
import AcivityButton from "./AcivityButtons/AcivityButton";
import BoxAnalytics from "./Analytics/ByTrackData/BoxAnalytics";
import TrackAnalytics from "./Analytics/ByTrackData/TrackAnalytics";
import Users from "./Users/Users";
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
        
        <div className=" w-full h-full">
          <NavBar />
          <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
              <AcivityButton />
          </div>
          <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
              
          <TrackAnalytics />
          </div>
          <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
            
          <Users />
          </div>
        </div>
    )
}

export default Dashboard