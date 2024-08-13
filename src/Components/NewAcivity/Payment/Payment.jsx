import {  useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { v4 as docID } from 'uuid';
import ReactLoading from 'react-loading';
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const Payment = () => {
    
    const [totalAmount,setTotalAmount] = useState("");
    const [isSubsidyCheque,setIsSubsidyCheque] = useState(false);
    const [subsidyChequeAmount,setSubsidyChequeAmount] = useState("");
    const paymentMedium = ["Cash","Cheque","UPI"]

    const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    if (newValue) {
        // Set the selected date and retain the current time
        const currentTime = new Date();
        newValue.setHours(currentTime.getHours());
        newValue.setMinutes(currentTime.getMinutes());
        newValue.setSeconds(currentTime.getSeconds());
        newValue.setMilliseconds(currentTime.getMilliseconds());
      }
      setValue(newValue);
  };

   
    const [isLoading,setIsLoading] = useState(false);
        

    //Context 
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);


    useEffect(()=>{
        if(trackSolarData){
            setTotalAmount(trackSolarData?.TotalAmount || "");
            setIsSubsidyCheque(trackSolarData?.SubsidyCheque || false)
            setSubsidyChequeAmount(trackSolarData?.SubsidyChequeAmount || "")     
        }

    },[trackSolarData])

    const handleSubmit = ()=>{
        toast.dismiss();       
       
            setIsLoading(true);
            const updatedTrackSolarData = {
                ...trackSolarData,
                Id:trackSolarData?.Id || docID(),
                TotalAmount:totalAmount,
                SubsidyCheque:isSubsidyCheque,
                SubsidyChequeAmount:subsidyChequeAmount,
                PaymentInfromation : {
                    createdBy:trackSolarData?.PaymentInfromation?.createdBy || user,
                    createdAt:trackSolarData?.PaymentInfromation?.createdAt || new Date(),
                    isDone : (totalAmount ) ? true : false
                   
                }
            }
            

            const companyID = user?.companyID;
            firestore.addData(companyID + "TrackSolarData", {"data":updatedTrackSolarData}, updatedTrackSolarData?.Id)
            .then((getStatus)=>{
                if(getStatus.status === 200){
                    setIsLoading(false);
                    setTrackSolarData(updatedTrackSolarData)
                    toast.success("Data saved!Go next",{position:'top-right'});
                } else{
                    setIsLoading(false);
                    toast.error(getStatus?.message?.message || "Failed to add" ,{position:'top-right'})
                }
            });

    }


  return (
    <div className="primaryInformation  container mx-auto  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
        <div id="mainInformation" className="shadow-md p-2 border rounded-lg">
            <h2 className="text-center font-bold">Payment Information</h2>
            <div className=" flex flex-col my-2 ">
              
                <input  onKeyDown={(e)=>{
                     if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                e.preventDefault();
                    }
                }} className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base" maxLength={10}  placeholder="Total Amount" type="number" value={totalAmount} onChange={(e)=>{setTotalAmount(e.target.value)}}  />
            </div>

            <div className={` border px-2 ${isSubsidyCheque ? " rounded-md" : " rounded-full"} `}>
               <div className=" flex gap-2 my-1 py-1 px-2">
               <span className="text-base ">Subsidy Cheque : </span>
                <input className="cursor-pointer" type="radio" name="subsidyCheque" id="subsidyChequeYes" checked={isSubsidyCheque} onChange={()=>{setIsSubsidyCheque(true)}} />
                <label className=" text-base  cursor-pointer" htmlFor="subsidyChequeYes">Yes</label>
                <input className="cursor-pointer" type="radio" name="subsidyCheque" id="subsidyChequeNo" checked={!isSubsidyCheque} onChange={()=>{setIsSubsidyCheque(false)}} />
                <label className=" text-base  cursor-pointer" htmlFor="subsidyChequeNo">No</label>
               </div>

                {
                    isSubsidyCheque ? 
                    <div className=" flex flex-col my-2 ">
              
                    <input  onKeyDown={(e)=>{
                         if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                    e.preventDefault();
                        }
                    }} className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base" maxLength={10}  placeholder="Subsidy Cheque Amount" type="number" value={subsidyChequeAmount} onChange={(e)=>{setSubsidyChequeAmount(e.target.value)}}  />
                </div> : <></>
                }
            </div>


            <div className="px-2 py-2 border">
            <DateTimePicker onChange={handleChange} value={value} />
            <p>{value ? value.toUTCString(): "Not found."}</p>
            </div>

            

            

            <div className="flex w-full justify-center mt-8">
            {
                isLoading ? <ReactLoading type='spinningBubbles' color='#3b82f6' height={'10%'} width={'10%'} /> :  
                <button className="bg-blue-500 text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
                onClick={handleSubmit}>Save</button>
            }
            </div>

        </div>
    </div>
  )
}

export default Payment
