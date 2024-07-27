import { useState,useEffect,useContext, useCallback } from "react"

import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";



const Subsidy = () => {
    const [MNRESubsidyRequest,setMNRESubsidyRequest] = useState(false);
    const [subsidyRedeem,setSubsidyRedeem] = useState(false);

    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);

    
    useEffect(()=>{
      if(trackSolarData){
        setMNRESubsidyRequest(trackSolarData?.MNRESubsidyRequest || false);
        setSubsidyRedeem(trackSolarData?.SubsidyRedeem || false);
      }
  },[trackSolarData]);
  


  // Adjusted handleSubmit function
const handleSubmit = useCallback((e) => {
  e.preventDefault();

  const updatedTrackSolarData = {
    ...trackSolarData,
        MNRESubsidyRequest:MNRESubsidyRequest,
        SubsidyRedeem:subsidyRedeem,
    SubsidyInfromationDate: trackSolarData?.SubsidyInfromationDate || new Date()
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

}, [trackSolarData, MNRESubsidyRequest, subsidyRedeem, setTrackSolarData, user?.companyID]);





  return (
    <div className="flex justify-center">
     <div className="w-[600px]">
    <h4 className="m-2">Subsidy Information : </h4>
        <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="MNRESubsidyRequest" id="MNRESubsidyRequest" checked={MNRESubsidyRequest} onChange={(e)=>{setMNRESubsidyRequest(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="MNRESubsidyRequest">MNRE Subsidy Request</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="subsidyRedeem" id="subsidyRedeem"  checked={subsidyRedeem} onChange={(e)=>{setSubsidyRedeem(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="subsidyRedeem">Subsidy Redeem</label>
                </div> 
        </div>
     
        <div className="m-2 flex justify-center">
            <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2" onClick={handleSubmit}>Save</button>
        </div>
    </div>
   </div>
  )
}

export default Subsidy
