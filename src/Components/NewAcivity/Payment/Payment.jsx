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
import TableHeader from "./TableHeader";

const Payment = () => {
    
    const [totalAmount,setTotalAmount] = useState("");
    const [isSubsidyCheque,setIsSubsidyCheque] = useState(false);
    const [subsidyChequeAmount,setSubsidyChequeAmount] = useState("");
    const paymentMedium = ["Cash","Cheque","UPI"]

    const [selectDate, setSelectDate] = useState(new Date());
    const [installamentNumber,setInstallamentNumber] = useState(1);
    const [installamentAmount,setInstallamentAmount] = useState(0);
    const [installamentPaymentMode,setInstallamentPaymentMode] = useState("Cash");
    const [balance,setBalance] = useState();
    const [installamentData,setInstallamentData] = useState([]);

    const [isLoading,setIsLoading] = useState(false);
        

    //Context 
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);


  const handleChange = (newValue) => {
    if (newValue) {
        // Set the selected date and retain the current time
        const currentTime = new Date();
        newValue.setHours(currentTime.getHours());
        newValue.setMinutes(currentTime.getMinutes());
        newValue.setSeconds(currentTime.getSeconds());
        newValue.setMilliseconds(currentTime.getMilliseconds());
      }
      setSelectDate(newValue);
  };

    useEffect(()=>{
        if(trackSolarData){
            setTotalAmount(trackSolarData?.TotalAmount || "");
            setIsSubsidyCheque(trackSolarData?.SubsidyCheque || false)
            setSubsidyChequeAmount(trackSolarData?.SubsidyChequeAmount || "")
            setBalance(trackSolarData?.Balance || "")
            setInstallamentData(trackSolarData?.Installament || [])
        }

    },[trackSolarData])

    const handleSubmit = ()=>{
        toast.dismiss();       
       
            setIsLoading(true);
            const updatedTrackSolarData = {
                ...trackSolarData,
                TotalAmount:totalAmount,
                SubsidyCheque:isSubsidyCheque,
                SubsidyChequeAmount:subsidyChequeAmount,
                Installament :installamentData,
                BalanceAmount:balance,
                PaymentInfromation : {
                    createdBy:trackSolarData?.PaymentInfromation?.createdBy || user,
                    createdAt:trackSolarData?.PaymentInfromation?.createdAt || new Date(),
                    isDone : (totalAmount.length >0 && balance === 0 && installamentData.length > 0 ) ? 
                    (isSubsidyCheque ? trackSolarData?.SubsidyInfromation?.isDone === true : true ) : false
                   
                }
            }
            

            const companyID = user?.companyID;
            firestore.addData(companyID + "TrackSolarData", {"data":updatedTrackSolarData}, updatedTrackSolarData?.Id)
            .then((getStatus)=>{
                if(getStatus.status === 200){
                    setIsLoading(false);
                    setTrackSolarData(updatedTrackSolarData)
                    toast.success("Data saved!",{position:'top-right'});
                } else{
                    setIsLoading(false);
                    toast.error(getStatus?.message?.message || "Failed to add" ,{position:'top-right'})
                }
            });

    }

    const addInstallament = ()=>{
         if(totalAmount.length <=0 || !totalAmount ||!selectDate  || !installamentAmount || installamentAmount.length <=0 || installamentPaymentMode.length <=0){
            toast.error("Fill installament details..")
        }  else{
            const installmentExists = installamentData.some(
                (item) => item?.InstallmentNumber === installamentNumber
              );  
              if (installmentExists) {
                toast.error("Select correct installament");
              } else {
                // Update the array state by adding the new data
                setInstallamentData((prevData) => [
                  ...prevData,
                  {
                    Date: selectDate,
                    Amount: installamentAmount,
                    PaymentMedium: installamentPaymentMode,
                    InstallmentNumber: installamentNumber,
                  },
                ]);
              }
                   
       
        }

        
    }

    useEffect(()=>{
        let balanceAmount = 0;
        if(isSubsidyCheque){
            balanceAmount = Number(totalAmount) - Number(subsidyChequeAmount);
        } else{
            balanceAmount = Number(totalAmount) - Number(0);
        }
        installamentData.map((data)=>{
            balanceAmount = balanceAmount - Number(data?.Amount)
        })
        if(balanceAmount < 0){
            toast.error("Check your amount")
        }
        setBalance(balanceAmount)
    },[isSubsidyCheque,totalAmount,subsidyChequeAmount,installamentData])


  return (
    <div className="primaryInformation  container mx-auto  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
        <div id="mainInformation" className="shadow-md p-2 border rounded-lg">
            <h2 className="text-center font-bold">Payment Information</h2>
            <div className=" flex  flex-col my-2 ">
              
                <input onWheel={(e) => e.target.blur()}  onKeyDown={(e)=>{
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
              
                    <input onWheel={(e) => e.target.blur()}  onKeyDown={(e)=>{
                         if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                    e.preventDefault();
                        }
                    }} className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base" maxLength={10}  placeholder="Subsidy Cheque Amount" type="number" value={subsidyChequeAmount} onChange={(e)=>{setSubsidyChequeAmount(e.target.value)}}  />
                </div> : <></>
                }
            </div>


            {/* installament */}
            <div className="border my-2 px-2 rounded-md">
                <h4 className="text-center my-2">Installament Details</h4>
                <div className="flex  justify-start gap-2 md:justify-between flex-wrap ">
            <div className=" border w-full  md:flex-1 rounded-full flex gap-2 items-center px-2 my-2  ">
            <p>Date : </p>
            <DateTimePicker format="yyyy-MM-dd" onChange={handleChange} onClockOpen={false} disableClock={true}   value={selectDate} maxDate={new Date()}   clearIcon={false} className="custom-picker  cursor-pointer rounded-full" />
            </div>

            <div className=" border  w-full  md:flex-1   rounded-full flex gap-2 items-center justify-start px-2 mb-2  py-2 md:py-0 md:mb-0 md:my-2  ">
                <div className="text-base">Installament :</div> 
                    <select className="outline-none cursor-pointer text-base w-[100px] sm:w-fit" value={installamentNumber} onChange={(e)=>{setInstallamentNumber(e.target.value)}} name="installament" id="installament">
                        {
                            [1,2,3].map((document)=>(
                                <option className="cursor-pointer" key={document} value={document}>
                                    {document+" Installament"}
                                </option>
                            ))
                        }
                    </select>
                </div>

            <div className="flex w-full flex-wrap">
            <div className=" md:flex-1 w-full gap-2 items-center px-0 my-0 md:my-2 md:px-2  ">
                <input onWheel={(e) => e.target.blur()}  onKeyDown={(e)=>{
                     if (e.key === "ArrowUp" || e.key === "ArrowDown") {e.preventDefault();}
                }} value={installamentAmount} onChange={(e)=>{setInstallamentAmount(e.target.value)}}
                 className=" py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none w-full  text-base" maxLength={10}  placeholder="Amount" type="number"   />
                </div>

                <div className=" flex border md:flex-1 w-full rounded-full gap-2 items-center px-2 my-2 py-2  ">
                <div className="text-base px-1">Payment Medium :</div> 
                    <select value={installamentPaymentMode} onChange={(e)=>{setInstallamentPaymentMode(e.target.value)}} className="outline-none cursor-pointer text-base w-[100px] sm:w-fit" name="paymentMedium" id="paymentMedium">
                        {
                            paymentMedium.map((document)=>(
                                <option className="cursor-pointer" key={document} value={document}>
                                    {document}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex justify-end w-full my-2 py-2">
                <button className="bg-blue-900 text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
                onClick={addInstallament}>Add</button>
                </div>
            </div>
            </div>

            <div className="my-2">
               {
                installamentData.length >0 ?  <TableHeader installamentData={installamentData} setInstallamentData={setInstallamentData} /> : <></>
               }
            </div>

            </div>

            <div className="border rounded-full my-2 px-2 py-2">
                <h2 className={`${balance < 0 ? 'text-red-900' : ''}`}>Balance : {balance}</h2>
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
