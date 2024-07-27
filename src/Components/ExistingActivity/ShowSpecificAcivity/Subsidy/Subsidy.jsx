import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import firestore from '../../../../Firebase/Firestore';

const Subsidy = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    return (
      <div>
          <h3>Subsidy info</h3>
        <div>
              Subsidy info Date : {firestore.formatTimestamp(trackSolarData?.SubsidyInfromationDate)} <br />
              MNRE Subsidy Request : {trackSolarData?.MNRESubsidyRequest ? "Done" : "Pending"} <br />
              Subsidy Redeem : {trackSolarData?.SubsidyRedeem ? "Done" : "Pending"} <br />
     </div>
      </div>
    )
}

export default Subsidy
