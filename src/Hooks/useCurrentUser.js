import { useEffect, useState } from "react"
import { auth } from "../Firebase/firebase";

const useCurrentUser = ()=>{
    const [user,setUser] = useState();
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setUser(user);
        });
    },[setUser])
    return [user];
}

export default useCurrentUser;