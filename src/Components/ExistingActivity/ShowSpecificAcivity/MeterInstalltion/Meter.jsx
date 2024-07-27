import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import firestore from '../../../../Firebase/Firestore';


const Meter = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    return (
      <div>
          <h3>Meter Testing / Installtion info</h3>
        <div>
              Meter info Date : {firestore.formatTimestamp(trackSolarData?.MeterInfromationDate)} <br />
              Meter testing call : {trackSolarData?.MeterTestingCall ? "Done" : "Pending"} <br />
              Meter test -&gt; submit meter : {trackSolarData?.SubmitMeter ? "Done" : "Pending"} <br />
              Get Meter test report : {trackSolarData?.MeterTestReport ? "Done" : "Pending"} <br />
              Release leter / Meter Installtion : {trackSolarData?.ReleaseLetterMeterInstall ? "Done" : "Pending"} <br />
        </div>
      </div>
    )
}

export default Meter
