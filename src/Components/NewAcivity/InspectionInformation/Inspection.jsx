import { useState,useEffect,useContext, useCallback } from "react"

import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";



const Inspection = () => {
    const [inspectionByAEQCOnSite,setInspectionByAEQCOnSite] = useState(false);
    const [inspectionFileSign,setInspectionFileSign] = useState(false);
    const [inspectionReportSendAEQC,setInspectionReportSendAEQC] = useState(false);
    const [MNREInspectionApproved,setMNREInspectionApproved] = useState(false);


    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);

    
    useEffect(()=>{
      if(trackSolarData){
        setInspectionByAEQCOnSite(trackSolarData?.InspectionByAEQCOnSite || false);
        setInspectionFileSign(trackSolarData?.InspectionFileSign || false);
        setInspectionReportSendAEQC(trackSolarData?.InspectionReportSendAEQC || false);
        setMNREInspectionApproved(trackSolarData?.MNREInspectionApproved || false);
      }
  },[trackSolarData]);
  

  // Adjusted handleSubmit function
const handleSubmit = useCallback((e) => {
  e.preventDefault();

  const updatedTrackSolarData = {
    ...trackSolarData,
    InspectionByAEQCOnSite:inspectionByAEQCOnSite,
        InspectionFileSign:inspectionFileSign,
        InspectionReportSendAEQC:inspectionReportSendAEQC,
        MNREInspectionApproved:MNREInspectionApproved,
    InspectionInfromationDate: trackSolarData?.InspectionInfromationDate || new Date()
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

}, [trackSolarData, inspectionByAEQCOnSite, inspectionFileSign, inspectionReportSendAEQC, MNREInspectionApproved, setTrackSolarData, user?.companyID]);





  return (
    <div className="flex justify-center">
     <div className="w-[600px]">
    <h4 className="m-2">Inspection Information : </h4>
        <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="inspectionByAEQCOnSite" id="inspectionByAEQCOnSite" checked={inspectionByAEQCOnSite} onChange={(e)=>{setInspectionByAEQCOnSite(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="inspectionByAEQCOnSite">Inspection by AEQC on site</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="inspectionFileSign" id="inspectionFileSign"  checked={inspectionFileSign} onChange={(e)=>{setInspectionFileSign(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="inspectionFileSign">File sign of inspection report</label>
                </div> 
        </div>
        <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="inspectionReportSendAEQC" id="inspectionReportSendAEQC" checked={inspectionReportSendAEQC} onChange={(e)=>{setInspectionReportSendAEQC(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="inspectionReportSendAEQC">Inspection report send to AEQC</label>
                </div> 

                <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="MNREInspectionApproved" id="MNREInspectionApproved" checked={MNREInspectionApproved} onChange={(e)=>{setMNREInspectionApproved(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="MNREInspectionApproved">MNRE Inspection Approved</label>
                </div> 


        </div>
        <div className="m-2 flex justify-center">
            <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2" onClick={handleSubmit}>Save</button>
        </div>
    </div>
   </div>
  )
}

export default Inspection
