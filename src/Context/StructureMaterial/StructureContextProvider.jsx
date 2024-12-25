import { useState } from "react"
import StructureContext from "./StructureContext";


const StructureContextProvider = ({children})=>{
    const [structureData,setStructureData] = useState();
    return(
        <StructureContext.Provider value={{structureData,setStructureData}}>
            {children}
        </StructureContext.Provider>
    )
}

export default StructureContextProvider