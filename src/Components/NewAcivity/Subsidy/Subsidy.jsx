import { useState,useEffect,useContext, useCallback } from "react"

import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";
import Loading from "react-loading";



const Subsidy = () => {
    const [MNRESubsidyRequest,setMNRESubsidyRequest] = useState(false);
    const [subsidyRedeem,setSubsidyRedeem] = useState(false);
    const [isLoading,setIsLoading] = useState(false)
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
  setIsLoading(true)

  const updatedTrackSolarData = {
        ...trackSolarData,
        MNRESubsidyRequest:MNRESubsidyRequest,
        SubsidyRedeem:subsidyRedeem,
        SubsidyRedeemDate:subsidyRedeem ? new Date() : "",
        SubsidyInfromation : {
          createdBy:trackSolarData?.SubsidyInfromation?.createdBy || user,
          createdAt:trackSolarData?.SubsidyInfromation?.createdAt || new Date(),
          isDone:(MNRESubsidyRequest && subsidyRedeem ? true : false)
        },
        ...(subsidyRedeem && {
          PaymentInfromation: {
            createdBy: trackSolarData?.PaymentInfromation?.createdBy || "",
            createdAt: trackSolarData?.PaymentInfromation?.createdAt || "",
            isDone:
              trackSolarData?.TotalAmount &&
              trackSolarData?.BalanceAmount === 0 &&
              trackSolarData?.Installament.length > 0
                ? trackSolarData?.SubsidyCheque
                  ? subsidyRedeem
                  : true
                : false
          }})
          
        
  };

  
  const companyID = user?.companyID;
  firestore.addData(companyID + "TrackSolarData", {"data":updatedTrackSolarData}, trackSolarData?.Id)
  .then((getStatus)=>{
    if(getStatus.status === 200){
              // Update the context state
              setTrackSolarData(updatedTrackSolarData);
                setIsLoading(false);
                toast.success("Data saved!",{position:'top-right'});
            } else{
                setIsLoading(false);
                toast.error(getStatus?.message?.message || "Failed to add" ,{position:'top-right'})
            }
        });

}, [trackSolarData, MNRESubsidyRequest,user, subsidyRedeem, setTrackSolarData]);


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
     
        <div className="flex w-full justify-center gap-3 mt-5">
            {
                isLoading ? <Loading type='spinningBubbles' color='blue' height={'15%'} width={'15%'} /> :  <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2 m-2 w-[200px] text-xl" onClick={handleSubmit}>Save</button>
            }

            </div>
    </div>
   </div>
  )
}

export default Subsidy
