import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";

const MainData = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
  return (
    <div>
      <div className="">
             Consumer Name : {trackSolarData?.ConsumerName} <br />
             Consumer Mobile No : {trackSolarData?.ConsumerMobileNumber} <br />
             Required System inn KW : {trackSolarData?.RequiredSystemKW}
             <br />
             Visit : {trackSolarData?.Visit}
      </div>
    </div>
  )
}

export default MainData
