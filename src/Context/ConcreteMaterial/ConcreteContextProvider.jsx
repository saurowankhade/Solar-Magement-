import { useState } from "react"
import ConcreteContext from "./ConcreteContext";


const ConcreteContextProvider = ({children})=>{
    const [concreteData,setconcreteData] = useState();
    return(
        <ConcreteContext.Provider value={{concreteData,setconcreteData}}>
            {children}
        </ConcreteContext.Provider>
    )
}

export default ConcreteContextProvider