import {  useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { v4 as docID } from 'uuid';
import ReactLoading from 'react-loading';
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";

const MainInformation = () => {
    
    const [consumerNameState,setConsumerNameState] = useState("");
    const [consumerMobileNumberState,setConsumerMobileNumberState] = useState("");
    const [requiredSystemKWState,setRequiredSystemKWState] = useState("");
    const [consumerAddress,setconsumerAddress] = useState("");
    const [visitState,setVisitState] = useState("Non");
    const visitArray = ["Physical","Mobile Communication"]

   
    const [isLoading,setIsLoading] = useState(false);
        

    //Context 
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(trackSolarData){
            setConsumerNameState(trackSolarData?.ConsumerName || "");
            setConsumerMobileNumberState(trackSolarData?.ConsumerMobileNumber || "");
            setRequiredSystemKWState(trackSolarData?.RequiredSystemKW || "")
            setconsumerAddress(trackSolarData?.ConsumerAddress || "")
            setVisitState(trackSolarData?.Visit || "")
        }

    },[trackSolarData])

    const handleSubmit = ()=>{
        toast.dismiss();
           if(consumerNameState.length <=0){
            toast.error("Enter Consumer name")
           } else if(consumerMobileNumberState.length <=0){
            toast.error("Enter Consumer Mobile no")
           } else if(requiredSystemKWState.length <=0){
            toast.error("Enter Required System In KW")
           } else if(consumerAddress.length <=0){
            toast.error("Enter Consumer address")
           }
           else if(visitState === "Non"){
            toast.error("Enter Visit")
           } else{
            setIsLoading(true);
            const updatedTrackSolarData = {
                ...trackSolarData,
                Id:trackSolarData?.Id || docID(),
                ConsumerName:consumerNameState,
                ConsumerMobileNumber:consumerMobileNumberState,
                ConsumerAddress:consumerAddress,
                RequiredSystemKW:requiredSystemKWState,
                Visit:visitState,
                CreatedAt:trackSolarData?.CreatedAt || new Date(),
                PrimaryInfromation : {
                    createdBy:trackSolarData?.PrimaryInfromation?.createdBy || user,
                    createdAt:trackSolarData?.PrimaryInfromation?.createdAt || new Date(),
                    isDone:(trackSolarData?.BankLoan === true || trackSolarData?.BankLoan===false ? true : false),
                    isMainDone:(consumerNameState && consumerAddress && visitState && consumerMobileNumberState && requiredSystemKWState ? true : false)
                }
            }
            setTrackSolarData(updatedTrackSolarData)

            const companyID = user?.companyID;
            firestore.addData(companyID + "TrackSolarData", {"data":updatedTrackSolarData}, updatedTrackSolarData?.Id)
            .then((getStatus)=>{
                if(getStatus.status === 200){
                    setIsLoading(false);
                    toast.success("Data saved!Go next",{position:'top-right'});
                } else{
                    setIsLoading(false);
                    toast.error(getStatus?.message?.message || "Failed to add" ,{position:'top-right'})
                }
            });

           }
    }
  return (
    <div className="primaryInformation w-full  flex justify-center ">
        <div id="mainInformation" className="">
            <div className=" w-full  flex flex-col ">
                <input className="p-4 m-2 border outline-none w-[600px]  text-lg" placeholder="Consumer name " type="text" value={consumerNameState} onChange={(e)=>{setConsumerNameState(e.target.value)}}  />

                <input className="p-4 m-2 border outline-none w-[600px] text-lg" maxLength={10}  placeholder="Consumer mobile no" type="text" value={consumerMobileNumberState} onChange={(e)=>{setConsumerMobileNumberState(e.target.value)}}  />

            </div>
            
            <div className="w-full justify-center">

            <input className="p-4 m-2 border outline-none w-[600px] text-lg"  placeholder="Consumer Address" type="text" value={consumerAddress} onChange={(e)=>{setconsumerAddress(e.target.value)}}  />


            </div>
            <div className="w-full justify-center">
                <input className="p-4 m-2 border outline-none w-[600px] text-lg" maxLength={2} placeholder="Required System in KW" type="text" value={requiredSystemKWState} onChange={(e)=>{setRequiredSystemKWState(e.target.value)}}  />
                
                <div className="w-[600px] m-2 border flex items-center p-4 justify-between  ">
                <span className="text-lg">visit :</span> 
                    <select className="outline-none cursor-pointer text-lg" name="documents" id="documents" value={visitState} onChange={(e)=>{setVisitState(e.target.value)}}  >
                        {
                            
                                !visitArray.includes(visitState) && (
                                    <option className="cursor-pointer text-lg" key={visitState} value={visitState}>
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

            <div className="flex w-full justify-center gap-3 mt-5">
            {
                isLoading ? <ReactLoading type='spinningBubbles' color='blue' height={'15%'} width={'15%'} /> :  <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2 m-2 w-[200px] text-xl" onClick={handleSubmit}>Save</button>
            }

            </div>

        </div>
    </div>
  )
}

export default MainInformation
