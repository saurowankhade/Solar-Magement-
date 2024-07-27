import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import firestore from '../../../../Firebase/Firestore';

const NetMettering = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    return (
      <div>
          <h3>Net Meter Arrgrement info</h3>
        <div>
              Net Meter info Date : {firestore.formatTimestamp(trackSolarData?.NetMeteringInfromationDate)} <br />
              Sign by DYEE / add EE : {trackSolarData?.NetMeterSignByDYEE ? "Done" : "Pending"} <br />
              Send to DC Engineer : {trackSolarData?.NetMeterSendDCEngineer ? "Done" : "Pending"} <br />
              NSC Approved : {trackSolarData?.NetMeterNSCApproved ? "Done" : "Pending"} <br />
              File submitted @ MSEDCL / Consumer Copy 1 : {trackSolarData?.NetMeterFileSubmitted ? "Done" : "Pending"} <br />
        </div>
      </div>
    )
}

export default NetMettering
