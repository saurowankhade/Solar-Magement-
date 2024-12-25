import { useState } from "react"
import ElectricContext from "./ElectricContext";


const ElectricContextProvider = ({children})=>{
    const [electricData,setElectricData] = useState();
    return(
        <ElectricContext.Provider value={{electricData,setElectricData}}>
            {children}
        </ElectricContext.Provider>
    )
}

export default ElectricContextProvider