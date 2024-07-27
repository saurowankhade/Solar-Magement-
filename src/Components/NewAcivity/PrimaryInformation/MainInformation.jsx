import {  useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { v4 as docID } from 'uuid';

const MainInformation = () => {
    
    const [consumerNameState,setConsumerNameState] = useState("");
    const [consumerMobileNumberState,setConsumerMobileNumberState] = useState("");
    const [requiredSystemKWState,setRequiredSystemKWState] = useState("");
    const [visitState,setVisitState] = useState("Non");
    const visitArray = ["Physical","Mobile Communication"]

    const [isSave,setIsSave] = useState(false);
        

    //Context 
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);

    useEffect(()=>{
        if(trackSolarData){
            setConsumerNameState(trackSolarData?.ConsumerName || "");
            setConsumerMobileNumberState(trackSolarData?.ConsumerMobileNumber || "");
            setRequiredSystemKWState(trackSolarData?.RequiredSystemKW || "")
            setVisitState(trackSolarData?.Visit || "")
            if(trackSolarData?.Visit){setIsSave(true)}
        }

    },[trackSolarData])

    const handleSubmit = ()=>{
           if(consumerNameState.length <=0){
            toast.error("Enter Consumer name",{position:"bottom-center"})
           } else if(consumerMobileNumberState.length <=0){
            toast.error("Enter Consumer Mobile no",{position:"bottom-center"})
           } else if(requiredSystemKWState.length <=0){
            toast.error("Enter Required System In KW",{position:"bottom-center"})
           } else if(visitState === "Non"){
            toast.error("Enter Visit",{position:"bottom-center"})
           } else{
            setTrackSolarData((pre)=>({
                ...pre,
                Id:pre?.Id ? pre?.Id : docID(),
                ConsumerName:consumerNameState,
                ConsumerMobileNumber:consumerMobileNumberState,
                RequiredSystemKW:requiredSystemKWState,
                Visit:visitState
            }))
            toast.success("Saved! Go Next ➡️ ")
            setIsSave(true);
           }
    }
  return (
    <div className="primaryInformation">
        <div id="mainInformation" className="">
            <div className="flex w-full justify-center">
                <input className="p-2 m-2 border outline-none w-[300px] " placeholder="Consumer name " type="text" value={consumerNameState} onChange={(e)=>{setConsumerNameState(e.target.value)}} readOnly={isSave} />
                <input className="p-2 m-2 border outline-none w-[300px] " maxLength={10} placeholder="Consumer mobile no" type="text" value={consumerMobileNumberState} onChange={(e)=>{setConsumerMobileNumberState(e.target.value)}} readOnly={isSave} />
            </div>

            <div className="flex w-full justify-center">
                <input className="p-2 m-2 border outline-none w-[300px] " maxLength={2} placeholder="Required System in KW" type="text" value={requiredSystemKWState} onChange={(e)=>{setRequiredSystemKWState(e.target.value)}} readOnly={isSave} />

                <div className="w-[300px] m-2 border flex items-center p-2 justify-between  ">
                visit : 
                    <select className="outline-none cursor-pointer" name="documents" id="documents" value={visitState} onChange={(e)=>{setVisitState(e.target.value)}} readOnly={isSave} >
                        {
                            
                                !visitArray.includes(visitState) && (
                                    <option className="cursor-pointer" key={visitState} value={visitState}>
                                        {visitState}
                                    </option>
                                )
                            
                        }
                        {
                            visitArray.map((document)=>(
                                <option className="cursor-pointer" key={document} value={document}>
                                    {document}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="flex w-full justify-center gap-3">
                
                {
                    isSave ? <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2" onClick={()=>{setIsSave(false)}}>Edit</button> : <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2" onClick={handleSubmit}>Save</button>
                }
            </div>
        </div>
    </div>
  )
}

export default MainInformation
