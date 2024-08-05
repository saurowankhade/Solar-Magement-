import { useCallback, useContext, useEffect, useState } from "react"
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";
import Loading from "react-loading";


const SiteWork = () => {
    const [isStructure,setIsStructure] = useState(false);
    const [isConcreteEarthing,setIsConcreteEarthing] = useState(false);
    const [isElectricFitting,setIsElectricFitting] = useState(false);
    const [isPanelFitting,setIsPanelFitting] = useState(false);
    
  const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
  const {user} = useContext(UserContext);
  const [isLoading,setIsLoading] = useState(false)

    
  useEffect(()=>{
    if(trackSolarData){
        setIsStructure(trackSolarData?.Structure || false);
        setIsConcreteEarthing(trackSolarData?.ConcreteEarthing || false);
        setIsElectricFitting(trackSolarData?.ElectricFitting || false);
        setIsPanelFitting(trackSolarData?.PanelFitting || false);
    }
},[trackSolarData]);


// Adjusted handleSubmit function
const handleSubmit = useCallback((e) => {
  e.preventDefault();

  const updatedTrackSolarData = {
      ...trackSolarData,
      Structure:isStructure,
      ConcreteEarthing:isConcreteEarthing,
      PanelFitting:isPanelFitting,
      ElectricFitting:isElectricFitting,
      SiteWorkInfromation : {
        createdBy:trackSolarData?.SiteWorkInfromation?.createdBy || user,
        createdAt:trackSolarData?.SiteWorkInfromation?.createdAt || new Date(),
        isDone:(isStructure&&isConcreteEarthing&&isPanelFitting&&isElectricFitting ? true : false)
    }
  };

  // Update the context state
  setTrackSolarData(updatedTrackSolarData);

  const companyID = user?.companyID;
        firestore.addData(companyID + "TrackSolarData", {"data":updatedTrackSolarData}, trackSolarData?.Id)
        .then((getStatus)=>{
            if(getStatus.status === 200){
                setIsLoading(false);
                toast.success("Data saved!Go next",{position:'top-right'});
            } else{
                setIsLoading(false);
                toast.error(getStatus?.message?.message || "Failed to add" ,{position:'top-right'})
            }
        });

}, [trackSolarData, isStructure, isConcreteEarthing, isElectricFitting,isPanelFitting, setTrackSolarData, user?.companyID]);







  return (
   <div className="flex justify-center">
     <div className="w-[600px]">
    <h4 className="m-2">Site Work Information : </h4>
        <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="structure" id="structure" checked={isStructure} onChange={(e)=>{setIsStructure(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="structure">Structure</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="concreteEarthing" id="concreteEarthing"  checked={isConcreteEarthing} onChange={(e)=>{setIsConcreteEarthing(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="concreteEarthing">Concrete / Earthing</label>
                </div> 
        </div>
        <div className="flex flex-row gap-2 w-full">
        
        <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="panelFitting" id="panelFitting" checked={isPanelFitting} onChange={(e)=>{setIsPanelFitting(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="panelFitting">Panel fitting</label>
                </div> 

               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="electricFitting" id="electricFitting" checked={isElectricFitting} onChange={(e)=>{setIsElectricFitting(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="electricFitting">Electric fitting</label>
                </div> 
        </div>
        <div className="flex w-full justify-center gap-3 mt-5">
            {
                isLoading ? <Loading type='spinningBubbles' color='blue' height={'15%'} width={'15%'} /> :  <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2 m-2 w-[200px] text-xl" onClick={handleSubmit}>Save</button>
            }

            </div>
    </div>
   </div>
  )
}

export default SiteWork
