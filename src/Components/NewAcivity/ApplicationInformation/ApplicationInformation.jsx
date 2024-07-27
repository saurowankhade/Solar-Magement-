import { useCallback, useContext, useEffect, useState } from "react"

import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";

const ApplicationInformation = () => {
  const [consumerNo,setConsumerNo] = useState("");
  const [MNREAppliactionNumber,setMNREApplicationNumber] = useState("");
  const [PVAppliactionNumber,setPVApplicationNumber] = useState("");
  const [PVTechnicalFeasibility,setPVTechnicalFeasibility] = useState(false);
  const [MNRETechnicalFeasibility,setMNRETechnicalFeasibility] = useState(false);
  const [isSave,setIsSave] = useState(false);
  const {user} = useContext(UserContext);
  const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);


  useEffect(()=>{
    if(trackSolarData){
        setConsumerNo(trackSolarData?.ConsumerNumber || "");
        setMNREApplicationNumber(trackSolarData?.MNREApplicationNumber || "");
        setPVApplicationNumber(trackSolarData?.PVApplicationNumber || "");
        setPVTechnicalFeasibility(trackSolarData?.PVTechnicalFeasibility || false);
        setMNRETechnicalFeasibility(trackSolarData?.MNRETechnicalFeasibility || false);
    }
},[trackSolarData]);

// Adjusted handleSubmit function
const handleSubmit = useCallback((e) => {
  e.preventDefault();

  const updatedTrackSolarData = {
    ...trackSolarData,
    ConsumerNumber:consumerNo,
      MNREApplicationNumber:MNREAppliactionNumber ,
      PVApplicationNumber:PVAppliactionNumber,
      PVTechnicalFeasibility:PVTechnicalFeasibility,
      MNRETechnicalFeasibility:MNRETechnicalFeasibility,
      AppliactionInfromationDate: trackSolarData?.ApplicationInfromationDate || new Date()
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

}, [trackSolarData, consumerNo, MNREAppliactionNumber, PVAppliactionNumber, PVTechnicalFeasibility, MNRETechnicalFeasibility, setTrackSolarData, user?.companyID]);


  
  return (
    <div className="primaryInformation flex justify-center pb-3">
    <div id="mainInformation" className="w-[600px]">
      <h3>Application Information : </h3>
        <div className="flex w-full justify-center">
            <input className="p-2 m-2 border outline-none w-[300px] " placeholder="Consumer Number " type="text" value={consumerNo} onChange={(e)=>{setConsumerNo(e.target.value)}} readOnly={isSave} />
            <input className="p-2 m-2 border outline-none w-[300px] "  placeholder="MNRE Application Number" type="text" value={MNREAppliactionNumber} onChange={(e)=>{setMNREApplicationNumber(e.target.value)}} readOnly={isSave} />
        </div>

        <div className="flex w-full justify-center">
            <input className="p-2 m-2 border outline-none w-[600px] " placeholder="PV Application Number" type="text" value={PVAppliactionNumber} onChange={(e)=>{setPVApplicationNumber(e.target.value)}} readOnly={isSave} />
        </div>


        <div className="flex flex-row gap-2">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="PVTechnicalFeasibility" id="PVTechnicalFeasibility" checked={PVTechnicalFeasibility} onChange={(e)=>{setPVTechnicalFeasibility(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="PVTechnicalFeasibility">PV Technical Feasibility</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="MNRETechnicalFeasibility" id="MNRETechnicalFeasibility"  checked={MNRETechnicalFeasibility} onChange={(e)=>{setMNRETechnicalFeasibility(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="MNRETechnicalFeasibility">MNRE Technical Feasibility</label>
                </div> 
               </div>



        <div className="flex w-full justify-center gap-3 mt-2">
            
            {
                isSave ? <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2" onClick={()=>{setIsSave(false)}}>Edit</button> 
                : <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2" onClick={handleSubmit}>Save</button>
            }
        </div>
    </div>
</div>
  )
}

export default ApplicationInformation
