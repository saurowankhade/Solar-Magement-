
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Context/UserContext/UserContext";
import NavBar from "./NavBar/NavBar";
import firestore from "../../Firebase/Firestore";
import ShowAllUserContext from "../../Context/ShowAllUsersContext/ShowAllUserContext";
import { toast } from "react-toastify";
import AllTrackContext from "../../Context/AllTrackData/AllTrackContext";
import { Outlet } from "react-router-dom";
import { useFirestoreDocuments } from "../../useFirestoreDocuments/useFirestoreDocuments";
const Dashboard =  ()=>{ 
  const {user} = useContext(UserContext);
  const {setAllUser} = useContext(ShowAllUserContext);
  const {setAllTrack} = useContext(AllTrackContext);

  const [show,setShow] = useState(false);


  const { data } = useFirestoreDocuments("SolarData");
  useEffect(()=>{
    setAllTrack(data ?? [])
  },[data,setAllTrack])
  
  useEffect(()=>{
    firestore.getAllDocuments("Users")
    .then((status)=>{        
     if(status?.status === 200){
      const filterData = (status.data).filter((userData) => userData?.activeID === user?.activeID);
      setAllUser(filterData)      
     } 
    });
  },[setAllUser, user]);

  return(
        
        <div onClick={(e)=>{
          if(!user?.name){
            e.preventDefault();
            e.stopPropagation();
            toast.dismiss()
            toast.info("Loading data please wait...",{position:'top-center'})
          } 
          if(show){
            setShow(false);
          }
        }} className=" w-full h-full ">
          <NavBar  show={show} setShow={setShow} /> 
          <Outlet />
        </div>
    )
}

export default Dashboard