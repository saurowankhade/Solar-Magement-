import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import WhoAddData from '../WhoAddData/WhoAddData';

const Inspection = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {InspectionByAEQCOnSite,InspectionFileSign,InspectionReportSendAEQC,MNREInspectionApproved,InspectionInfromation} = trackSolarData
    return (
      <div>


      <WhoAddData date={InspectionInfromation?.createdAt} user={InspectionInfromation?.createdBy} />
           
      
             <div className="flex justify-center">
            <div className="p-2  shadow-md border  w-[700px] ">
            <h3 className="text-center text-xl underline">Inspection Data</h3>
                
                 <div className="mt-2">
                  <span className="text-base font-bold">Inspection By AEQC On Site : </span> 
                  <span className={`${InspectionByAEQCOnSite ? "text-blue-800" : "text-red-800"}`}>{InspectionByAEQCOnSite ? "Done" : "Pending"}</span>
                 </div>
      
                 <div className="mt-2">
                  <span className="text-base font-bold">Inspection File Sign : </span> 
                  <span className={`${InspectionFileSign ? "text-blue-800" : "text-red-800"}`}>{InspectionFileSign ? "Done" : "Pending"}</span>
                 </div>
      
                 <div className="mt-2">
                  <span className="text-base font-bold">Inspection Report Send AEQC : </span> 
                  <span className={`${InspectionReportSendAEQC ? "text-blue-800" : "text-red-800"}`}>{InspectionReportSendAEQC ? "Done" : "Pending"}</span>
                 </div>
      
                 <div className="mt-2">
                  <span className="text-base font-bold">MNRE Inspection Approved : </span> 
                  <span className={`${MNREInspectionApproved ? "text-blue-800" : "text-red-800"}`}>{MNREInspectionApproved ? "Done" : "Pending"}</span>
                 </div>
                 
            </div>
          </div>
      </div>
    )
}

export default Inspection
