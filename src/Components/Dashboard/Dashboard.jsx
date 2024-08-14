
import { useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import NavBar from "./NavBar/NavBar";
import AcivityButton from "./AcivityButtons/AcivityButton";
import TrackAnalytics from "./Analytics/ByTrackData/TrackAnalytics";
import Users from "./Users/Users";
import firestore from "../../Firebase/Firestore";
import ShowAllUserContext from "../../Context/ShowAllUsersContext/ShowAllUserContext";
import { toast } from "react-toastify";
import ChartsBar from "./Analytics/BarCharts/ChartsBar";
import AllTrackContext from "../../Context/AllTrackData/AllTrackContext";
import { Outlet } from "react-router-dom";
import { useFirestoreDocuments } from "../../useFirestoreDocuments/useFirestoreDocuments";
const Dashboard =  ()=>{ 
  const {user} = useContext(UserContext);
  const {setAllUser} = useContext(ShowAllUserContext);
  const {setAllTrack,allTrack} = useContext(AllTrackContext);
  // useEffect(()=>{
  //   if(user?.companyID){
  //     firestore.getAllDocuments(user?.companyID+"TrackSolarData")
  //     .then((status)=>{
  //       console.log(status?.data)
  //       if(status?.status === 200 ){
  //         setAllTrack(status?.data)
  //       }
  //     })
  //   }
  // },[user,setAllTrack])

  const { data, error } = useFirestoreDocuments("SolarData");
  useEffect(()=>{
    console.log("Data is ",data);
    setAllTrack(data ?? [])
  },[data,setAllTrack])

  useEffect(()=>{
    console.log("In dashbord : ",allTrack);
  })

  
  useEffect(()=>{
    firestore.getAllDocuments("Users")
    .then((status)=>{        
     if(status?.status === 200){
      const filterData = (status.data).filter((userData) => userData?.companyID === user?.companyID);
      setAllUser(filterData)      
     } 
    });
  },[setAllUser, user])


  if (error) {
    return <div>Error: {error.message}</div>;
  }
  



  return(
        
        <div onClick={()=>{
          if(!user?.name){
            toast.dismiss()
            toast.info("Loading data please wait...",{position:'top-center'})
          }
        }} className=" w-full h-full ">
          <NavBar />
          
          {/* <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
              <AcivityButton />
          </div>
          <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
          <TrackAnalytics />
          </div>
          <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">   
          <ChartsBar />
          </div>
          {
            user?.jobProfile === "Admin" && user?.verified ? 
            <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
          <Users />
          </div> : <></>
          } */}
          <Outlet />
        </div>
    )
}

export default Dashboard