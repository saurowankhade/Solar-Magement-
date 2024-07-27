import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import firestore from '../../../../Firebase/Firestore';

const SiteWork = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    return (
      <div>
          <h3>Site Work info</h3>
        <div>
              Site Work Date : {firestore.formatTimestamp(trackSolarData?.SiteWorkInfromationDate)} <br />
              Structure : {trackSolarData?.Structure ? "Done" : "Pending"} <br />
              Concrete / Earthing : {trackSolarData?.ConcreteEarthing ? "Done" : "Pending"} <br />
              Electric Fitting : {trackSolarData?.ElectricFitting ? "Done" : "Pending"} <br />
        </div>
      </div>
    )
}

export default SiteWork
