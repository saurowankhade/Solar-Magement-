import { useState } from "react"
import AllTrackContext from "./AllTrackContext";

const AllTrackContextProvider = ({children}) => {
    const [allTrack,setAllTrack] = useState([]);
  return (
    <AllTrackContext.Provider value={{allTrack,setAllTrack}} >
        {children}
    </AllTrackContext.Provider>
  )
}

export default AllTrackContextProvider
