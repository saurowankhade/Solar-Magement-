import { useState } from "react"
import TrackSolarContext from "./TrackSolarContext";


const TrackSolarContextProvider = ({children})=>{
    const [trackSolarData,setTrackSolarData] = useState();
    return(
        <TrackSolarContext.Provider value={{trackSolarData,setTrackSolarData}}>
            {children}
        </TrackSolarContext.Provider>
    )
}

export default TrackSolarContextProvider
