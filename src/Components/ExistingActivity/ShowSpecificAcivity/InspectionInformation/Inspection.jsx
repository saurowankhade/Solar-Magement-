import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import firestore from '../../../../Firebase/Firestore';

const Inspection = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    return (
      <div>
          <h3>Inspection info</h3>
        <div>
              Inspection Date : {firestore.formatTimestamp(trackSolarData?.InspectionInfromationDate)} <br />
              Inspection by AEQC on site : {trackSolarData?.InspectionByAEQCOnSite ? "Done" : "Pending"} <br />
              File sign on Inspection report : {trackSolarData?.InspectionFileSign ? "Done" : "Pending"} <br />
              Inspection report send to AEQC : {trackSolarData?.InspectionReportSendAEQC ? "Done" : "Pending"} <br />
              MNRE Inspection Approved : {trackSolarData?.MNREInspectionApproved ? "Done" : "Pending"} <br />
        </div>
      </div>
    )
}

export default Inspection
