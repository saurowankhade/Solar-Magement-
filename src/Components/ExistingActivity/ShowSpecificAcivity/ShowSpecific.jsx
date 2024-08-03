import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";
import { toast } from "react-toastify";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import PrimaryInformation from "./PrimaryInfromation/PrimaryInformation";
import ApplicationInformation from "./ApplicationInformation/ApplicationInformation";
import SiteWork from "./SiteWork/SiteWork";
import Inspection from "./InspectionInformation/Inspection";
import Meter from "./MeterInstalltion/Meter";
import NetMettering from "./NetMetering/NetMettering";
import Subsidy from "./Subsidy/Subsidy";
import TableUi from "../../ShimmerUI/TableUi";

const ShowSpecific = () => {
  const {Id} = useParams();
  const {user} = useContext(UserContext);
  const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
  const [currentPage,setCurrentPage] = useState(0);
  const [showPage,setShowPage] = useState(0);
  const processArray = ["Primary","Application","Site Work","Inspection","Meter Installation","Net Metering","Subsidy"]
  
  useEffect(()=>{
    if(user?.companyID){
    const companyID = user?.companyID;
    firestore.getOneData(companyID + "TrackSolarData",Id)
      .then((data)=>{
          setTrackSolarData(data?.data);
      }).catch((error)=>{
          toast.error(error);
      })
    }
    return (()=>{
      setTrackSolarData({});
    })

  },[Id,user,setTrackSolarData])

  useEffect(()=>{
    if(trackSolarData?.BankLoan === true || trackSolarData?.BankLoan === false) {
      setCurrentPage(1)
    }
    if(trackSolarData?.PVTechnicalFeasibility === true) {
      setCurrentPage(2)
    }  
    if(trackSolarData?.ElectricFitting === true){
      setCurrentPage(3)
    }  if(trackSolarData?.MNREInspectionApproved === true){
      setCurrentPage(4)
    }  if(trackSolarData?.ReleaseLetterMeterInstall === true){
      setCurrentPage(5)
    }  if(trackSolarData?.NetMeterFileSubmitted){
      setCurrentPage(6)
    }
    if(trackSolarData?.SubsidyRedeem){
      setCurrentPage(7)
    }
    return (()=>{setCurrentPage(0)})    
  },[trackSolarData])

  return (
    <div>
    {
      !trackSolarData?.CreatedAt ? <TableUi /> :
      <>
      <ol className="flex  items-center justify-center w-fit p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm  sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse ">
      {
        processArray.map((element,index)=>(
         
         <li onClick={()=>{
          if(currentPage > index){
            setShowPage(index)
          } else{
            toast.error("This process is in pending...")
          }
         }}  key={element} className={`flex items-center cursor-pointer ${currentPage > index ?  "text-green-500" : "text-gray-500"} ${currentPage===7 && index===6 ? "text-green-500" : ""}`}>
   
   
   
    <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border  rounded-full shrink-0 ">
            {index+1}
        </span>
        {element}  <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg>
</li>
        ))
      }
    </ol>

    {
      showPage === 0 ? <PrimaryInformation/> :
      showPage === 1 ? <ApplicationInformation/> :
      showPage === 2 ? <SiteWork/> :
      showPage === 3 ? <Inspection/> :
      showPage === 4 ? <Meter/> :
      showPage === 5 ? <NetMettering/> :
      showPage === 6 ? <Subsidy/> : <></>
    }
    </>
      }
    </div>
  )
}

export default ShowSpecific
