import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";

const MainData = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {ConsumerName,ConsumerMobileNumber,StampPaper,RequiredSystemKW,Visit,ConsumerAddress} = trackSolarData;
  return (
    <div className="flex justify-center">
      <div className={`p-2  shadow-md border  w-[700px] ${trackSolarData?.PrimaryInfromation?.isMainDone ? " bg-white" : " bg-red-100"} `}>
      <h3 className="text-center text-xl underline">Main Data</h3>
          
           <div className="mt-2">
            <span className="text-base font-bold">Consumer Name : </span> 
            <span className="text-blue-800">{ConsumerName}</span>
           </div>
           <div className="mt-2">
              <span className="text-base font-bold">Consumer Mobile Number : </span>
             <span className="text-blue-800">{ConsumerMobileNumber}</span>
           </div>
           <div className="mt-2">
              <span className="text-base font-bold">Consumer Address : </span>
             <span className="text-blue-800">{ConsumerAddress}</span>
           </div>
           <div className="mt-2">
             <span className="text-base font-bold">Consumer Required System in KW : </span>
             <span className="text-blue-800">{RequiredSystemKW}</span>
           </div>
           <div className="mt-2">
             <span className="text-base font-bold">2 Stamp Paper : </span>
             <span className={`${StampPaper ? " text-blue-800" : "text-red-800"}`}>{StampPaper ? "Yes" : "No"}</span>
           </div>
           <div className="mt-2">
            <span className="text-base font-bold">Visit : </span> 
            <span className="text-blue-800">{Visit}</span>
           </div>
      </div>
    </div>
  )
}

export default MainData
