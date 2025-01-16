import { useState,useEffect,useContext, useCallback } from "react"

import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";
import Loading from "react-loading";



const Inspection = () => {
    const [inspectionByAEQCOnSite,setInspectionByAEQCOnSite] = useState(false);
    const [inspectionFileSign,setInspectionFileSign] = useState(false);
    const [inspectionReportSendAEQC,setInspectionReportSendAEQC] = useState(false);
    const [MNREInspectionApproved,setMNREInspectionApproved] = useState(false);
    const [isLoading,setIsLoading] = useState(false)

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
        InspectionInfromation : {
          createdBy:trackSolarData?.InspectionInfromation?.createdBy || user,
          createdAt:trackSolarData?.InspectionInfromation?.createdAt || new Date(),
          isDone:(inspectionByAEQCOnSite && inspectionFileSign && inspectionReportSendAEQC && MNREInspectionApproved ? true : false)
      }
  };

  // Update the context state
  setTrackSolarData(updatedTrackSolarData);

  const companyID = user?.activeID;
  firestore.addData(companyID + "TrackSolarData", {"data":updatedTrackSolarData}, trackSolarData?.Id)
  .then((getStatus)=>{
      if(getStatus.status === 200){
          setIsLoading(false);
          toast.success("Data saved!Go next",{position:'top-right'});
      } else{
          setIsLoading(false);
          toast.error(getStatus?.message?.message || "Failed to add" ,{position:'top-right'})
      }
  });

}, [trackSolarData, inspectionByAEQCOnSite, inspectionFileSign, inspectionReportSendAEQC, MNREInspectionApproved, user, setTrackSolarData]);





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
        <div className="flex w-full justify-center gap-3 mt-5">
            {
                isLoading ? <Loading type='spinningBubbles' color='blue' height={'15%'} width={'15%'} /> :  <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2 m-2 w-[200px] text-xl" onClick={handleSubmit}>Save</button>
            }

            </div>
    </div>
   </div>
  )
}

export default Inspection
