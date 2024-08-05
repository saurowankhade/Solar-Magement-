import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import WhoAddData from '../WhoAddData/WhoAddData';

const NetMettering = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {NetMeterSignByDYEE,NetMeterSendDCEngineer,NetMeterNSCApproved,NetMeterFileSubmitted,NetMeteringInfromation} = trackSolarData;
    return (
     
<div>
<WhoAddData date={NetMeteringInfromation?.createdAt} user={NetMeteringInfromation?.createdBy} />
     

       <div className="flex justify-center">
      <div className="p-2  shadow-md border  w-[700px] ">
      <h3 className="text-center text-xl underline">Net Meter Aggrement Data</h3>
          
           <div className="mt-2">
            <span className="text-base font-bold">Sign by DYEE / add EE : </span> 
            <span className={`${NetMeterSignByDYEE ? "text-blue-800" : "text-red-800"}`}>{NetMeterSignByDYEE ? "Done" : "Pending"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold"> Send to DC Engineer : </span> 
            <span className={`${NetMeterSendDCEngineer ? "text-blue-800" : "text-red-800"}`}>{NetMeterSendDCEngineer ? "Done" : "Pending"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">  File submitted @ MSEDCL / Consumer Copy 1  : </span> 
            <span className={`${NetMeterFileSubmitted ? "text-blue-800" : "text-red-800"}`}>{NetMeterFileSubmitted ? "Done" : "Pending"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">NSC Approved : </span> 
            <span className={`${NetMeterNSCApproved ? "text-blue-800" : "text-red-800"}`}>{NetMeterNSCApproved ? "Done" : "Pending"}</span>
           </div>
           
      </div>
    </div>
  </div>



    )
}

export default NetMettering
