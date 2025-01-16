import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import firestore from "../../Firebase/Firestore";
import authentication from "../../Firebase/authentication";

const UserContextProvider = ({children})=>{
    const [user,setUser] = useState();

    useEffect(()=>{
      const userId = authentication.userID();      
         firestore.subscribeToUserData(userId,setUser);
        // userData.then((userCri)=>{
        //   setUser(userCri)
        // })
      },[setUser])


    return (
        <UserContext.Provider value={{user,setUser}}>

            {children}

        </UserContext.Provider>
    )
}
export default UserContextProvider