import { useContext, useEffect, useState } from "react"
import UserContext from "../../Context/UserContext/UserContext";
import firestore from "../../Firebase/Firestore";
import RegisterUserShow from "./RegisterUserShow";
import TableUi from "../ShimmerUI/TableUi";


function RegisterUsers() {

    const [usersData,setUserData] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(()=>{
        firestore.getAllDocuments("Users")
        .then((users)=>{
            const filteredUsers = users.filter((userData) =>userData?.companyID === user?.companyID);
            setUserData(filteredUsers);
        })
    },[user,setUserData]);

  return (
    <div className="">
        <h3 className="p-2 text-2xl text-center">Users Data </h3>
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
