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
import TrackStipper from "../../Stipper/TrackStipper";
import Payment from "./Payment/Payment";

const ShowSpecific = () => {
  const {Id} = useParams();
  const {user} = useContext(UserContext);
  const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
  
  const [showPage,setShowPage] = useState(0);
  
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


  return (
    <div>
    {
      !trackSolarData?.CreatedAt ? <TableUi /> :
      <>

      <>
      <TrackStipper setShowPage={setShowPage} />
      </>

    {
      showPage === 0 ? <PrimaryInformation/> :
      showPage === 1 ? <ApplicationInformation/> :
      showPage === 2 ? <SiteWork/> :
      showPage === 3 ? <Inspection/> :
      showPage === 4 ? <Meter/> :
      showPage === 5 ? <NetMettering/> :
      showPage === 6 ? <Subsidy/> : 
      showPage === 7 ? <Payment/> : <></>
    }
    </>
      }
    </div>
  )
}

export default ShowSpecific
