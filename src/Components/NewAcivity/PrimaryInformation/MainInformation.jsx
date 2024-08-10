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
    <div className="primaryInformation  container mx-auto  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
        <div id="mainInformation" className="shadow-md p-2 border rounded-lg">
            <h2 className="text-center font-bold">Main Information</h2>
            <div className=" flex flex-col ">
                <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none   text-lg" placeholder="Consumer name " type="text" value={consumerNameState} onChange={(e)=>{setConsumerNameState(e.target.value)}}  />

                <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base" maxLength={10}  placeholder="Consumer mobile no" type="text" value={consumerMobileNumberState} onChange={(e)=>{setConsumerMobileNumberState(e.target.value)}}  />
            <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base"  placeholder="Consumer Address" type="text" value={consumerAddress} onChange={(e)=>{setconsumerAddress(e.target.value)}}  />
                <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base" maxLength={2} placeholder="Required System in KW" type="text" value={requiredSystemKWState} onChange={(e)=>{setRequiredSystemKWState(e.target.value)}}  />

            </div>

            <div className="w-full justify-center">
                
                <div className="my-2 border rounded-full flex items-center py-2 gap-1 px-2 justify-between  ">
                <div className="text-base px-1">visit :</div> 
                    <select className="outline-none cursor-pointer text-base w-[100px] sm:w-fit" name="documents" id="documents" value={visitState} onChange={(e)=>{setVisitState(e.target.value)}}  >
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

            <div className="flex w-full justify-center mt-8">
            {
                isLoading ? <ReactLoading type='spinningBubbles' color='#3b82f6' height={'10%'} width={'10%'} /> :  
                <button className="bg-blue-500 text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
                onClick={handleSubmit}>Save</button>
            }

                {/* <ReactLoading type='spinningBubbles' color='#3b82f6' height={'8%'} width={'8%'} /> */}
            </div>

        </div>
    </div>
  )
}

export default MainInformation
