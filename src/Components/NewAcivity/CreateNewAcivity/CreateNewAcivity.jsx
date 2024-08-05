import PrimaryInformation from "../PrimaryInformation/PrimaryInformation"
import {  useState } from "react"
import Inspection from "../InspectionInformation/Inspection"
import Meter from "../MeterTestingInstalltion/Meter"
import NetMetering from "../NetMeteringAgrement/NetMetering"
import SiteWork from "../SiteWork/SiteWork"
import Subsidy from "../Subsidy/Subsidy"
import ApplicationInformation from "../ApplicationInformation/ApplicationInformation"
import TrackStipper from "../../Stipper/TrackStipper"

const CreateNewAcivity = () => {
  const [showPage,setShowPage] = useState(0);

  return (
    
    <div className="w-fit lg:w-full flex justify-center">
    <div className="w-fit">

    <TrackStipper setShowPage={setShowPage} />

      {
        showPage === 0 ? <PrimaryInformation /> :
        showPage === 1 ? <ApplicationInformation/> : 
        showPage === 2 ? <SiteWork /> :
        showPage === 3 ? <Inspection /> :
        showPage === 4 ? <Meter /> :
        showPage === 5 ? <NetMetering /> :
        showPage === 6 ? <Subsidy /> : <></>
      }

    </div>

    </div>
  )
}

export default CreateNewAcivity
