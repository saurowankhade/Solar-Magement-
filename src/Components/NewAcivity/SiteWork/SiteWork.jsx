import { useCallback, useContext, useEffect, useState } from "react"
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";


const SiteWork = () => {
    const [isStructure,setIsStructure] = useState(false);
    const [isConcreteEarthing,setIsConcreteEarthing] = useState(false);
    const [isElectricFitting,setIsElectricFitting] = useState(false);
    
  const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
  const {user} = useContext(UserContext);

    
  useEffect(()=>{
    if(trackSolarData){
        setIsStructure(trackSolarData?.Structure || false);
        setIsConcreteEarthing(trackSolarData?.ConcreteEarthing || false);
        setIsElectricFitting(trackSolarData?.ElectricFitting || false);
    }
},[trackSolarData]);


// Adjusted handleSubmit function
const handleSubmit = useCallback((e) => {
  e.preventDefault();

  const updatedTrackSolarData = {
    ...trackSolarData,
    Structure:isStructure,
      ConcreteEarthing:isConcreteEarthing,
      ElectricFitting:isElectricFitting,
    SiteWorkInfromationDate: trackSolarData?.SiteWorkInfromationDate || new Date()
  };

  // Update the context state
  setTrackSolarData(updatedTrackSolarData);

  const companyID = user?.companyID;
  firestore.addData(companyID + "TrackSolarData", updatedTrackSolarData, trackSolarData?.Id)
    .then((message) => {
      toast.success(message);
      toast.success("Saved! Submit the data");
    })
    .catch((error) => {
      toast.error("Error saving data: " + error.message);
    });

}, [trackSolarData, isStructure, isConcreteEarthing, isElectricFitting, setTrackSolarData, user?.companyID]);







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
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="electricFitting" id="electricFitting" checked={isElectricFitting} onChange={(e)=>{setIsElectricFitting(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="electricFitting">Electric fitting</label>
                </div> 
        </div>
        <div className="m-2 flex justify-center">
            <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2" onClick={handleSubmit}>Save</button>
        </div>
    </div>
   </div>
  )
}

export default SiteWork
