import { useContext, useEffect, useState } from "react"
import AllTrackContext from "./AllTrackContext";
import UserContext from "../UserContext/UserContext";
import firestore from "../../Firebase/Firestore";

const AllTrackContextProvider = ({children}) => {
    const [allTrack,setAllTrack] = useState([]);
    // const {user} = useContext(UserContext);
    // useEffect(()=>{
    //   if(user?.name ){
    //     firestore.getAllDocuments(user?.companyID+"TrackSolarData")
    //     .then((status)=>{
    //       // setAllTrack(data)
    //       if(status?.status === 200){
    //         setAllTrack(status?.data)
    //       }
    //     })
    //   }
    // },[user,allTrack])
  return (
    <AllTrackContext.Provider value={{allTrack,setAllTrack}} >
        {children}
    </AllTrackContext.Provider>
  )
}

export default AllTrackContextProvider
