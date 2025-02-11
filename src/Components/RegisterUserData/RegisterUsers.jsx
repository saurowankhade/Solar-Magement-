import { useContext, useEffect, useState } from "react"
import UserContext from "../../Context/UserContext/UserContext";
import RegisterUserShow from "./RegisterUserShow";
import TableUi from "../ShimmerUI/TableUi";
import ShowAllUserContext from "../../Context/ShowAllUsersContext/ShowAllUserContext";
import firestore from "../../Firebase/Firestore";
// import ShowAllUserContext from "../../Context/ShowAllUsersContext/ShowAllUserContext";

function RegisterUsers() {

    const [usersData,setUserData] = useState([]);
    const {user} = useContext(UserContext);
    // const {allUser,setAllUser} = useContext(ShowAllUserContext);
    const {allUser,setAllUser} = useContext(ShowAllUserContext);
    
    useEffect(()=>{
      firestore.getAllDocuments("Users")
      .then((status)=>{        
       if(status?.status === 200){
        const filterData = (status.data).filter((userData) => userData?.activeID === user?.activeID);
        setAllUser(filterData) 

       } 
      });
    },[setAllUser, user])

    useEffect(()=>{
      setUserData(allUser);
    },[allUser])

  return (
    <div className="mt-5">
        <h3 className="p-2 text-2xl text-center">Users Data </h3>
        {/* {
          console.log();
          
        } */}
      {
            usersData.length === 0 ? <TableUi/> : 
      <> 
      {
       usersData.map((user)=>(
        <RegisterUserShow key={user?.userID} getData={user} />
       ))
      }
      </>
      
    }
    </div>
  )
}

export default RegisterUsers
