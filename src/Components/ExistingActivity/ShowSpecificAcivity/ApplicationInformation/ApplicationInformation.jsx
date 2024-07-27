import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";
import firestore from "../../../../Firebase/Firestore";

const ApplicationInformation = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
  return (
    <div>
        <h3>Application info</h3>
      <div>
            Applicatin Date : {firestore.formatTimestamp(trackSolarData?.AppliactionInfromationDate)} <br />
            Consumer Number : {trackSolarData?.ConsumerNumber} <br />
            MNRE Application Number : {trackSolarData?.MNREApplicationNumber} <br />
            PV Application Number : {trackSolarData?.PVApplicationNumber} <br />
            Technical feasibility (PV) : {trackSolarData?.PVTechnicalFeasibility ? "Done" : "Pending"} <br />
            Technical feasibility (MNRE) : {trackSolarData?.MNRETechnicalFeasibility ? "Done" : "Pending"} <br />
      </div>
    </div>
  )
}

export default ApplicationInformation
