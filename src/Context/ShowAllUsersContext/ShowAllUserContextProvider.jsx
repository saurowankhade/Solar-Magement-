import { useState } from "react"
import ShowAllUserContext from "./ShowAllUserContext";

const ShowAllUserContextProvider = ({children}) => {
    const [allUser,setAllUser] = useState([]);
  return (
    <ShowAllUserContext.Provider value={{allUser,setAllUser}} >
        {children}
    </ShowAllUserContext.Provider>
  )
}

export default ShowAllUserContextProvider
