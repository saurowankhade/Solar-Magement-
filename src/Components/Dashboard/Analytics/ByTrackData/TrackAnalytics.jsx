import { useContext, useEffect, useState } from "react"
import BoxAnalytics from "./BoxAnalytics"
import AllTrackContext from "../../../../Context/AllTrackData/AllTrackContext"

const TrackAnalytics = () => {
  const {allTrack} = useContext(AllTrackContext)
  const [enquiryData,setEnquiryData] = useState([]);
  const [siteWorkData,setSiteWorkData] = useState([]);
  const [inspectionData,setInspectionData] = useState([]);
  const [meterInstallationData,setMeterInstallationData] = useState([]);
  const [NSCApprovedData,setNSCApprovedData] = useState([]);
  const [subsidyData,setSubsidyData] = useState([]);

  useEffect(()=>{
    setEnquiryData( allTrack.filter((data)=>
      data?.data?.ConsumerName     
    ))
    setSiteWorkData( allTrack.filter((data)=>
      data?.data?.SiteWorkInfromation?.isDone === true     
    ))
    setInspectionData( allTrack.filter((data)=>
      data?.data?.InspectionInfromation?.isDone === true     
    ))
    setMeterInstallationData( allTrack.filter((data)=>
      data?.data?.MeterInfromation?.isDone === true     
    ))
    setNSCApprovedData( allTrack.filter((data)=>
      data?.data?.NetMeteringInfromation?.isDone === true     
    ))
    setSubsidyData( allTrack.filter((data)=>
      data?.data?.SubsidyInfromation?.isDone === true     
    ))
  },[allTrack])
  return (
    <div>
        < div className="w-full  gap-2 sm:flex justify-around">
        <BoxAnalytics props={{imgNo:0,name:"Enquiry No",count:enquiryData.length}}/>
        <BoxAnalytics props={{imgNo:1,name:"Site Work Done",count:siteWorkData.length}}/>
        <BoxAnalytics props={{imgNo:2,name:"Inspection No",count:inspectionData.length}}/>
    </div>
    <div className="w-full  gap-2 sm:flex justify-around">
        <BoxAnalytics props={{imgNo:3,name:"Meter Installation",count:meterInstallationData.length}}/>
        <BoxAnalytics props={{imgNo:4,name:"NSC Approved",count:NSCApprovedData.length}}/>
        <BoxAnalytics props={{imgNo:5,name:"Subsidy",count:subsidyData.length}}/>
    </div>
    </div>
  )
}

export default TrackAnalytics
