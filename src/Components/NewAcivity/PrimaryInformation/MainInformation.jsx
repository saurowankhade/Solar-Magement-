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
    const [stampPaper,setStampPaper] = useState(false);
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
            setStampPaper(trackSolarData?.StampPaper || false)
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
                StampPaper:stampPaper,
                CreatedAt:trackSolarData?.CreatedAt || new Date(),
                PrimaryInfromation : {
                    createdBy:trackSolarData?.PrimaryInfromation?.createdBy || user,
                    createdAt:trackSolarData?.PrimaryInfromation?.createdAt || new Date(),
                    isMainDone:(consumerNameState && consumerAddress && visitState && consumerMobileNumberState && requiredSystemKWState && stampPaper ? true : false),
                    

                    isNameChangeDone:trackSolarData?.PrimaryInfromation?.isNameChangeDone || false,
                    isBankDetailsDone:trackSolarData?.PrimaryInfromation?.isBankDetailsDone || false,
                    isBankLoanDone:trackSolarData?.PrimaryInfromation?.isBankLoanDone || false,
                    isDone:  (consumerNameState && consumerAddress && visitState && consumerMobileNumberState && requiredSystemKWState && stampPaper ? true : false)
                     && trackSolarData?.PrimaryInfromation?.isNameChangeDone && trackSolarData?.PrimaryInfromation?.isBankDetailsDone ? true : false,
                }
            }
            

            const companyID = user?.activeID;
            firestore.addData(companyID + "TrackSolarData", {"data":updatedTrackSolarData}, updatedTrackSolarData?.Id)
            .then((getStatus)=>{
                if(getStatus.status === 200){
                    setIsLoading(false);
                    setTrackSolarData(updatedTrackSolarData)
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

                <input onWheel={(e) => e.target.blur()}  onKeyDown={(e)=>{
                     if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault(); }
                }} className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base" maxLength={10}  placeholder="Consumer mobile no" type="number" value={consumerMobileNumberState} onChange={(e)=>{setConsumerMobileNumberState(e.target.value)}}  />
            <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base"  placeholder="Consumer Address" type="text" value={consumerAddress} onChange={(e)=>{setconsumerAddress(e.target.value)}}  />
                <input onWheel={(e) => e.target.blur()}  onKeyDown={(e)=>{
                     if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
        }
                }} className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base"  placeholder="Required System in KW" type="number" value={requiredSystemKWState} onChange={(e)=>{setRequiredSystemKWState(e.target.value)}}  />

            </div>

            <div className="w-full justify-center my-2">
            <div className=" w-full px-2 border rounded-full flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="consumerStampPaper" id="consumerStampPaper" checked={stampPaper} onChange={(e)=>{setStampPaper(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="consumerStampPaper">2 Stamp Paper</label>
                </div> 
            </div>

            <div className="w-full justify-center my-2">    
                <div className=" border rounded-full flex items-center py-2 gap-1 px-2 justify-between  ">
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
                <button className="bg-[#F7AB0D] text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
                onClick={handleSubmit}>Save</button>
            }
            </div>

        </div>
    </div>
  )
}

export default MainInformation
