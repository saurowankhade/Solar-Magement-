import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";

const MainData = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {ConsumerName,ConsumerMobileNumber,RequiredSystemKW,Visit} = trackSolarData;
  return (
    <div>
      <div className="">
             Consumer Name : {ConsumerName} <br />
             Consumer Mobile No : {ConsumerMobileNumber} <br />
             Required System in KW : {RequiredSystemKW}
             <br />
             Visit : {Visit}
      </div>
    </div>
  )
}

export default MainData
