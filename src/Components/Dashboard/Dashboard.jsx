
import { useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import NavBar from "./NavBar/NavBar";
import AcivityButton from "./AcivityButtons/AcivityButton";
import TrackAnalytics from "./Analytics/ByTrackData/TrackAnalytics";
import Users from "./Users/Users";
import firestore from "../../Firebase/Firestore";
import ShowAllUserContext from "../../Context/ShowAllUsersContext/ShowAllUserContext";
import AllTrackContext from "../../Context/AllTrackData/AllTrackContext";
import { toast } from "react-toastify";
const Dashboard =  ()=>{ 
  const {user} = useContext(UserContext);
  // const {setShowAllUser} = useContext(ShowAllUserContext);
  const {setAllUser} = useContext(ShowAllUserContext);
  const {setAllTrack} = useContext(AllTrackContext)
    useEffect(()=>{
      firestore.getAllUser().then((data)=>{
        const filterData = data.filter((da) => da?.companyID === user?.companyID);
        setAllUser(filterData)       
      });
      firestore.getAllDocuments(user?.companyID+"TrackSolarData")
      .then((data)=>{
        setAllTrack(data)        
      })
    },[setAllUser, user?.companyID,setAllTrack])
  return(
        
        <div onClick={()=>{
          toast.dismiss()
          if(!user?.name){
            toast.info("Loading data please wait...",{position:'top-center'})
          }
        }} className=" w-full h-full ">
          <NavBar />
          <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
              <AcivityButton />
          </div>
          <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
              
          <TrackAnalytics />
          </div>
          {
            user?.jobProfile === "Admin" ? 
            <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
          <Users />
          </div> : <></>
          }
        </div>
    )
}

export default Dashboard