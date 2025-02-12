import { useState,useEffect,useContext, useCallback } from "react"

import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";
import Loading from "react-loading";



const Meter = () => {
    const [meterTestingCall,setMeterTestingCall] = useState(false);
    const [submitMeter,setSubmitMeter] = useState(false);
    const [meterTestReport,setMeterTestReport] = useState(false);
    const [releaseLetterMeterInstall,setReleaseLetterMeterInstall] = useState(false);

    const [isLoading,setIsLoading] = useState(false)
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);

    
    useEffect(()=>{
      if(trackSolarData){
        setMeterTestingCall(trackSolarData?.MeterTestingCall || false);
        setSubmitMeter(trackSolarData?.SubmitMeter || false);
        setMeterTestReport(trackSolarData?.MeterTestReport || false);
        setReleaseLetterMeterInstall(trackSolarData?.ReleaseLetterMeterInstall || false);
      }
  },[trackSolarData]);
  


  // Adjusted handleSubmit function
const handleSubmit = useCallback((e) => {
  e.preventDefault();

  const updatedTrackSolarData = {
    ...trackSolarData,
        MeterTestingCall:meterTestingCall,
        SubmitMeter:submitMeter,
        MeterTestReport:meterTestReport,
        ReleaseLetterMeterInstall:releaseLetterMeterInstall,
        MeterInfromation : {
          createdBy:trackSolarData?.MeterInfromation?.createdBy || user,
          createdAt:trackSolarData?.MeterInfromation?.createdAt || new Date(),
          isDone:(meterTestingCall && submitMeter && releaseLetterMeterInstall ? true : false)
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

}, [trackSolarData, meterTestingCall, submitMeter, meterTestReport, releaseLetterMeterInstall, setTrackSolarData, user]);





  return (
    <div className="flex justify-center">
     <div className="w-[600px]">
    <h4 className="m-2">Meter Testing / Information : </h4>
        <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="inspectionByAEQCOnSite" id="inspectionByAEQCOnSite" checked={meterTestingCall} onChange={(e)=>{setMeterTestingCall(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="inspectionByAEQCOnSite">Meter Testing Call</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="inspectionFileSign" id="inspectionFileSign"  checked={submitMeter} onChange={(e)=>{setSubmitMeter(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="inspectionFileSign">Meter test -&gt; submit meter</label>
                </div> 
        </div>
        <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="inspectionReportSendAEQC" id="inspectionReportSendAEQC" checked={meterTestReport} onChange={(e)=>{setMeterTestReport(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="inspectionReportSendAEQC">Get Meter test report</label>
                </div> 

                <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="MNREInspectionApproved" id="MNREInspectionApproved" checked={releaseLetterMeterInstall} onChange={(e)=>{setReleaseLetterMeterInstall(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="MNREInspectionApproved">Release leter / Meter Installtion</label>
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

export default Meter
