import { useState,useEffect,useContext, useCallback } from "react"
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";



const NetMetering = () => {
    const [netMeterSignByDYEE,setNetMeterSignByDYEE] = useState(false);
    const [netMeterSendDCEngineer,setNetMeterSendDCEngineer] = useState(false);
    const [netMeterNSCApproved,setNetMeterNSCApproved] = useState(false);
    const [netMeterFileSubmitted,setNetMeterFileSubmitted] = useState(false);


    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);

    
    useEffect(()=>{
      if(trackSolarData){
        setNetMeterSignByDYEE(trackSolarData?.NetMeterSignByDYEE || false);
        setNetMeterSendDCEngineer(trackSolarData?.NetMeterSendDCEngineer || false);
        setNetMeterNSCApproved(trackSolarData?.NetMeterNSCApproved || false);
        setNetMeterFileSubmitted(trackSolarData?.NetMeterFileSubmitted || false);
      }
  },[trackSolarData]);
  
 


  // Adjusted handleSubmit function
const handleSubmit = useCallback((e) => {
  e.preventDefault();

  const updatedTrackSolarData = {
    ...trackSolarData,
    NetMeterSignByDYEE:netMeterSignByDYEE,
        NetMeterSendDCEngineer:netMeterSendDCEngineer,
        NetMeterNSCApproved:netMeterNSCApproved,
        NetMeterFileSubmitted:netMeterFileSubmitted,
    NetMeteringInfromationDate: trackSolarData?.NetMeteringInfromationDate || new Date()
  };

  // Update the context state
  setTrackSolarData(updatedTrackSolarData);

  const companyID = user?.companyID;
  firestore.addData(companyID + "TrackSolarData", updatedTrackSolarData, trackSolarData?.Id)
    .then((message) => {
      toast.success(message);
      toast.success("Saved! Submit the data");
    })
    .catch((error) => {
      toast.error("Error saving data: " + error.message);
    });

}, [trackSolarData, netMeterSignByDYEE, netMeterSendDCEngineer, netMeterNSCApproved, netMeterFileSubmitted, setTrackSolarData, user?.companyID]);





  return (
    <div className="flex justify-center">
     <div className="w-[600px]">
    <h4 className="m-2">Net Metering Agreement Information : </h4>
        <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="netMeterSignByDYEE" id="netMeterSignByDYEE" checked={netMeterSignByDYEE} onChange={(e)=>{setNetMeterSignByDYEE(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="netMeterSignByDYEE">Sign by DYEE / add EE</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="inspectionFileSign" id="inspectionFileSign"  checked={netMeterSendDCEngineer} onChange={(e)=>{setNetMeterSendDCEngineer(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="inspectionFileSign">Send to DC Engineer</label>
                </div> 
        </div>
        <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="inspectionReportSendAEQC" id="inspectionReportSendAEQC" checked={netMeterNSCApproved} onChange={(e)=>{setNetMeterNSCApproved(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="inspectionReportSendAEQC">NSC Approved</label>
                </div> 

                <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="MNREInspectionApproved" id="MNREInspectionApproved" checked={netMeterFileSubmitted} onChange={(e)=>{setNetMeterFileSubmitted(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="MNREInspectionApproved">File submitted @ MSEDCL / Consumer Copy 1</label>
                </div> 


        </div>
        <div className="m-2 flex justify-center">
            <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2" onClick={handleSubmit}>Save</button>
        </div>
    </div>
   </div>
  )
}

export default NetMetering
