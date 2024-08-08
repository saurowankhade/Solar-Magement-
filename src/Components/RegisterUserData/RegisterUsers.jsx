import { useContext, useEffect, useState } from "react"
import UserContext from "../../Context/UserContext/UserContext";
import RegisterUserShow from "./RegisterUserShow";
import TableUi from "../ShimmerUI/TableUi";
import ShowAllUserContext from "../../Context/ShowAllUsersContext/ShowAllUserContext";


function RegisterUsers() {

    const [usersData,setUserData] = useState([]);
    const {user} = useContext(UserContext);
    const {allUser} = useContext(ShowAllUserContext);
    useEffect(()=>{
          if(user?.name){
            setUserData(allUser);
          }
    },[allUser,user]);

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
