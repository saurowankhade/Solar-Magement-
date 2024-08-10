import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";
import WhoAddData from "../WhoAddData/WhoAddData";

const ApplicationInformation = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const{ConsumerNumber,MNREApplicationNumber,PVApplicationNumber,PVTechnicalFeasibility,MNRETechnicalFeasibility,ApplicationInfromation,BillUnit} = trackSolarData;
  return (
    <div>


<WhoAddData date={ApplicationInfromation?.createdAt} user={ApplicationInfromation?.createdBy} />
     

       <div className="flex justify-center">
      <div className="p-2  shadow-md border  w-[700px] ">
      <h3 className="text-center text-xl underline">Application Data</h3>
          
           <div className="mt-2">
            <span className="text-base font-bold">Consumer Number : </span> 
            <span className={`${ConsumerNumber ? "text-blue-800" : "text-red-800"}`}>{ConsumerNumber || "Not yet"}</span>
           </div>
           <div className="mt-2">
            <span className="text-base font-bold">Bill Unit : </span> 
            <span className={`${ConsumerNumber ? "text-blue-800" : "text-red-800"}`}>{BillUnit || "Not yet"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">MNRE Application Number : </span> 
            <span className={`${MNREApplicationNumber ? "text-blue-800" : "text-red-800"}`}>{MNREApplicationNumber || "Not yet"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">PV Application Number : </span> 
            <span className={`${PVApplicationNumber ? "text-blue-800" : "text-red-800"}`}>{PVApplicationNumber || "Not yet"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">PV Technical Feasibility : </span> 
            <span className={`${PVTechnicalFeasibility ? "text-blue-800" : "text-red-800"}`}>{PVTechnicalFeasibility ? "Done" : "Pending"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">MNRE Technical Feasibility : </span> 
            <span className={`${MNRETechnicalFeasibility ? "text-blue-800" : "text-red-800"}`}>{MNRETechnicalFeasibility ? "Done" : "Pending"}</span>
           </div>
           
      </div>
    </div>
    </div>
  )
}

export default ApplicationInformation
