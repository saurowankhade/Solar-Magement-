import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import WhoAddData from '../WhoAddData/WhoAddData';

const Subsidy = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {MNRESubsidyRequest,SubsidyRedeem,SubsidyInfromation} = trackSolarData
    return (
      <div>


      <WhoAddData date={SubsidyInfromation?.createdAt} user={SubsidyInfromation?.createdBy} />
           
      
             <div className="flex justify-center">
            <div className="p-2  shadow-md border  w-[700px] ">
            <h3 className="text-center text-xl underline">Site Work Data</h3>
                
                 <div className="mt-2">
                  <span className="text-base font-bold">MNRE Subsidy Request : </span> 
                  <span className={`${MNRESubsidyRequest ? "text-blue-800" : "text-red-800"}`}>{MNRESubsidyRequest ? "Done" : "Pending"}</span>
                 </div>
      
                 <div className="mt-2">
                  <span className="text-base font-bold">Subsidy Redeem : </span> 
                  <span className={`${SubsidyRedeem ? "text-blue-800" : "text-red-800"}`}>{SubsidyRedeem ? "Done" : "Pending"}</span>
                 </div>
      
            </div>
          </div>
      </div>
    )
}

export default Subsidy
