import {  useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import TrackSolarContext from "../../Context/TrackSolarContext/TrackSolarContext";
import { v4 as docID } from 'uuid';

const ConsumerData = ()=>{

    const [consumerNameState,setConsumerNameState] = useState("");
    const [consumerNumberState,setConsumerNumberState] = useState("");
    const [consumerMobileNumberState,setConsumerMobileNumberState] = useState("");
    const [areaOfAddressState,setAreaOfAddressState] = useState("");
    const [PVApplicationNumberState,setPVApplicationNumberState] = useState("");
    const [MNRERegistrationNumberState,setMNRERegistrationNumberState] = useState("");

    //Context 
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);

    useEffect(()=>{
        if(trackSolarData){
            setConsumerNameState(trackSolarData?.ConsumerName);
            setConsumerNumberState(trackSolarData?.ConsumerNumber);
            setConsumerMobileNumberState(trackSolarData?.ConsumerMobileNumber);
            setAreaOfAddressState(trackSolarData?.AreaOfAddress);
            setPVApplicationNumberState(trackSolarData?.PVApplicationNumber);
            setMNRERegistrationNumberState(trackSolarData?.MNRERegistrationNumber);
        }
    },[trackSolarData])

    const handleSubmit = ()=>{
        
            setTrackSolarData((pre)=>({
                ...pre,
                Id:pre?.Id ? pre?.Id : docID(),
                ConsumerName:consumerNameState,
                ConsumerNumber:consumerNumberState,
                ConsumerMobileNumber:consumerMobileNumberState,
                AreaOfAddress:areaOfAddressState,
                PVApplicationNumber:PVApplicationNumberState,
                MNRERegistrationNumber:MNRERegistrationNumberState
            }))
            toast.success("Saved! Go Next ➡️ ")
        // }
    }
    return (
        <div className="flex flex-col w-[700px] border ">
        <h3 className="text-xl underline ">Consumer Information : </h3>
        <div className=" ml-2 p-2 flex flex-col">
          
        <div className="flex justify-between">
           <input className="p-3 m-2 border border-black w-full text-base placeholder:text-base  placeholder:text-black" type="text" name="consumerName" id="consumerName" placeholder="Consumer Name" title="Consumer Name" onChange={(e)=>{setConsumerNameState(e.target.value)}} value={consumerNameState}  />
           <input className="p-3 m-2 border border-black w-full text-base placeholder:text-base  placeholder:text-black" type="text" name="consumerNumber" id="consumerNumber" placeholder="Consumer Number" title="Consumer Number" maxLength={12} onChange={(e)=>{setConsumerNumberState(e.target.value)}} value={consumerNumberState}  />
           </div>

           <div className="flex">
           <input className="p-3 m-2 border border-black w-full text-base placeholder:text-base placeholder:text-black" type="tel"  name="consumerMobileNumber" id="consumerMobileNumber" placeholder="Consumer Mobile Number" title="Consumer Mobile Number" maxLength={10} onChange={(e)=>{setConsumerMobileNumberState(e.target.value)}} value={consumerMobileNumberState}  />
           <input className="p-3 m-2 border border-black w-full text-base placeholder:text-base placeholder:text-black" type="text" name="address" id="address" placeholder="Area of address" title="Area of address" onChange={(e)=>{setAreaOfAddressState(e.target.value)}} value={areaOfAddressState}  />
           </div>

           <div className="flex">
           <input className="p-3 m-2 border border-black w-full text-base placeholder:text-base placeholder:text-black" type="tel" name="PVAppliactionNumber" id="PVAppliactionNumber" placeholder="PV Appliaction Number" title="PV Appliaction Number" maxLength={10} onChange={(e)=>{setPVApplicationNumberState(e.target.value)}} value={PVApplicationNumberState}  />
           <input className="p-3 m-2 border border-black w-full text-base placeholder:text-base placeholder:text-black" type="text" name="MNRERegistrationNumber" id="MNRERegistrationNumber" placeholder="MNRE Registration Number" title="MNRE Registration Number" onChange={(e)=>{setMNRERegistrationNumberState(e.target.value)}} value={MNRERegistrationNumberState}  />
          </div>

        </div>

        <div className="w-full flex justify-end p-3 mr-3">
            <button className="bg-blue-500 text-white rounded-lg pl-3 pr-3 pt-2 pb-2 w-fit hover:bg-blue-600 hover:shadow-lg" onClick={handleSubmit}>Save</button>
           </div>
        </div>
    )


}

export default ConsumerData