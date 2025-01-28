import { useCallback, useContext, useEffect, useState } from "react"

import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";
import Loading from "react-loading";

const ApplicationInformation = () => {
  const [consumerNo,setConsumerNo] = useState("");
  const [billUnit,setBillUnit] = useState("");
  const [MNREAppliactionNumber,setMNREApplicationNumber] = useState("");
  const [PVAppliactionNumber,setPVApplicationNumber] = useState("");
  // const [PVTechnicalFeasibility,setPVTechnicalFeasibility] = useState(false);
  // const [MNRETechnicalFeasibility,setMNRETechnicalFeasibility] = useState(false);
  const {user} = useContext(UserContext);
  const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
  const [isLoading,setIsLoading] = useState(false)


  useEffect(()=>{
    if(trackSolarData){
        setConsumerNo(trackSolarData?.ConsumerNumber || "");
        setBillUnit(trackSolarData?.BillUnit || "");
        setMNREApplicationNumber(trackSolarData?.MNREApplicationNumber || "");
        setPVApplicationNumber(trackSolarData?.PVApplicationNumber || "");
        // setPVTechnicalFeasibility(trackSolarData?.PVTechnicalFeasibility || false);
        // setMNRETechnicalFeasibility(trackSolarData?.MNRETechnicalFeasibility || false);
    }
},[trackSolarData]);

// Adjusted handleSubmit function
const handleSubmit = useCallback((e) => {
  e.preventDefault();

  setIsLoading(true)
  const updatedTrackSolarData = {
    ...trackSolarData,
      ConsumerNumber:consumerNo,
      BillUnit:billUnit,
      MNREApplicationNumber:MNREAppliactionNumber ,
      PVApplicationNumber:PVAppliactionNumber,
      // PVTechnicalFeasibility:PVTechnicalFeasibility,
      // MNRETechnicalFeasibility:MNRETechnicalFeasibility,
      ApplicationInfromation : {
        createdBy:trackSolarData?.ApplicationInfromation?.createdBy || user,
        createdAt:trackSolarData?.ApplicationInfromation?.createdAt || new Date(),
        isDone:((consumerNo && billUnit && MNREAppliactionNumber && PVAppliactionNumber) ? true : false)
    }
  };

  const companyID = user?.activeID;
  firestore.addData(companyID + "TrackSolarData", {"data":updatedTrackSolarData}, trackSolarData?.Id)
  .then((getStatus)=>{
      if(getStatus.status === 200){
          // Update the context state
          setTrackSolarData(updatedTrackSolarData);
          setIsLoading(false);
          toast.success("Data saved!Go next",{position:'top-right'});
      } else{
          setIsLoading(false);
          toast.error(getStatus?.message?.message || "Failed to add" ,{position:'top-right'})
      }
  });

}, [trackSolarData,billUnit, user,consumerNo, MNREAppliactionNumber, PVAppliactionNumber, setTrackSolarData]);


  
  return (
    <div className="primaryInformation container mx-auto  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
    <div id="mainInformation" className="shadow-md p-2 border rounded-lg">
    <h2 className="text-center font-bold">Application Information</h2>
        <div className="flex flex-col w-full justify-center">
            <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  " placeholder="Consumer Number " type="text" value={consumerNo} onChange={(e)=>{setConsumerNo(e.target.value)}}  />
            <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  "  placeholder="Bill Unit" type="text" value={billUnit} onChange={(e)=>{setBillUnit(e.target.value)}}  />
        </div>

        <div className="flex flex-col w-full justify-center">
        <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  "  placeholder="MNRE Application Number" type="text" value={MNREAppliactionNumber} onChange={(e)=>{setMNREApplicationNumber(e.target.value)}}  />
            <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  " placeholder="PV Application Number" type="text" value={PVAppliactionNumber} onChange={(e)=>{setPVApplicationNumber(e.target.value)}}  />
        </div>


        {/* <div className="flex flex-wrap gap-2 my-2">
               <div className=" w-full p-2 rounded-full border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer" type="checkbox" name="PVTechnicalFeasibility" id="PVTechnicalFeasibility" checked={PVTechnicalFeasibility} onChange={(e)=>{setPVTechnicalFeasibility(e.target.checked)}}  />
                <label className=" px-2 py01 text-base cursor-pointer text-black" htmlFor="PVTechnicalFeasibility">PV Technical Feasibility</label>
                </div> 

                <div className=" w-full p-2 my-2 rounded-full border  flex flex-row items-center hover:border hover:border-gray-500">
                
                <input className="cursor-pointer " type="checkbox" name="MNRETechnicalFeasibility" id="MNRETechnicalFeasibility"  checked={MNRETechnicalFeasibility} onChange={(e)=>{setMNRETechnicalFeasibility(e.target.checked)}}   />
                <label className=" px-2 py01 text-base cursor-pointer text-black" htmlFor="MNRETechnicalFeasibility">MNRE Technical Feasibility</label>
                </div> 
               </div> */}



               <div className="flex w-full justify-center gap-3 mt-5">
               {
                isLoading ? <Loading type='spinningBubbles' color='#3b82f6' height={'10%'} width={'10%'} /> :  
                <button className="bg-blue-500 text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
                onClick={handleSubmit}>Save</button>
            }

            </div>
    </div>
</div>
  )
}

export default ApplicationInformation
