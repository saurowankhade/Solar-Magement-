import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import WhoAddData from '../WhoAddData/WhoAddData';

const SiteWork = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {Structure,ConcreteEarthing,PanelFitting,ElectricFitting,SiteWorkInfromation} = trackSolarData
    return (
      <div>


      <WhoAddData date={SiteWorkInfromation?.createdAt} user={SiteWorkInfromation?.createdBy} />
           
      
             <div className="flex justify-center">
            <div className="p-2  shadow-md border  w-[700px] ">
            <h3 className="text-center text-xl underline">Site Work Data</h3>
                
                 <div className="mt-2">
                  <span className="text-base font-bold">Structure : </span> 
                  <span className={`${Structure ? "text-blue-800" : "text-red-800"}`}>{Structure ? "Done" : "Pending"}</span>
                 </div>
      
                 <div className="mt-2">
                  <span className="text-base font-bold">Concrete Earthing : </span> 
                  <span className={`${ConcreteEarthing ? "text-blue-800" : "text-red-800"}`}>{ConcreteEarthing ? "Done" : "Pending"}</span>
                 </div>
      
                 <div className="mt-2">
                  <span className="text-base font-bold">Panel Fitting : </span> 
                  <span className={`${PanelFitting ? "text-blue-800" : "text-red-800"}`}>{PanelFitting ? "Done" : "Pending"}</span>
                 </div>
      
                 <div className="mt-2">
                  <span className="text-base font-bold">Electric Fitting : </span> 
                  <span className={`${ElectricFitting ? "text-blue-800" : "text-red-800"}`}>{ElectricFitting ? "Done" : "Pending"}</span>
                 </div>
                 
            </div>
          </div>
      </div>
    )
}

export default SiteWork
