import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import firestore from "../../Firebase/Firestore";

const UserContextProvider = ({children})=>{
    const [user,setUser] = useState();

    useEffect(()=>{
        const userData = firestore.getUserData();
        userData.then((userCri)=>{
          setUser(userCri)
        })
      },[setUser])

    return (
        <UserContext.Provider value={{user,setUser}}>

            {children}

        </UserContext.Provider>
    )
}
export default UserContextProvider