import {  useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { v4 as docID } from 'uuid';
import ReactLoading from 'react-loading';
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";

const BankDetails = () => {
    
    const [bankName,setBankName] = useState("");
    const [consumerAccountNumber,setConsumerAccountNumber] = useState("");
    const [IFSCCode,setIFSCCode] = useState("");
    const [checkORPassbookPhoto,setCheckORPassbookPhoto] = useState(false);
   
    const [isLoading,setIsLoading] = useState(false);
        

    //Context 
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(trackSolarData){
            setBankName(trackSolarData?.BankName || "");
            setConsumerAccountNumber(trackSolarData?.ConsumerAccountNumber || "");
            setIFSCCode(trackSolarData?.IFSCCode || "")
            setCheckORPassbookPhoto(trackSolarData?.CheckORPassbookPhoto || false)
        }

    },[trackSolarData])

    const handleSubmit = ()=>{
        toast.dismiss();
           if(bankName.length <=0){
            toast.error("Enter Bank name")
           } else if(consumerAccountNumber.length <=0){
            toast.error("Enter Consumer account no")
           } else if(IFSCCode.length <=0){
            toast.error("Enter IFSC Code")
           } else{
            setIsLoading(true);
            const updatedTrackSolarData = {
                ...trackSolarData,
                Id:trackSolarData?.Id || docID(),
                BankName:bankName,
                ConsumerAccountNumber:consumerAccountNumber,
                IFSCCode:IFSCCode,
                CheckORPassbookPhoto:checkORPassbookPhoto,
                CreatedAt:trackSolarData?.CreatedAt || new Date(),
                PrimaryInfromation : {
                    createdBy:trackSolarData?.PrimaryInfromation?.createdBy || user,
                    createdAt:trackSolarData?.PrimaryInfromation?.createdAt || new Date(),
                    isDone:(trackSolarData?.BankLoan === true || trackSolarData?.BankLoan===false ? true : false),
                    isMainDone:trackSolarData?.PrimaryInfromation?.isMainDone || false,
                    isLoadChangeDone:trackSolarData?.PrimaryInfromation?.isLoadChangeDone || false,
                    isNameChangeDone:trackSolarData?.PrimaryInfromation?.isNameChangeDone || false,
                    isBankDetailsDone:(bankName && consumerAccountNumber && IFSCCode && checkORPassbookPhoto ? true : false),
                    isBankLoanDone:trackSolarData?.PrimaryInfromation?.isBankLoanDone || false
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
    }
  return (
    <div className="primaryInformation  container mx-auto  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
        <div id="mainInformation" className="shadow-md p-2 border rounded-lg">
            <h2 className="text-center font-bold">Bank Details</h2>
            <div className=" flex flex-col ">
                <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none   text-lg" placeholder="Bank Name" type="text" value={bankName} onChange={(e)=>{setBankName(e.target.value)}}  />

                <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base" maxLength={10}  placeholder="Consumer Account no" type="text" value={consumerAccountNumber} onChange={(e)=>{setConsumerAccountNumber(e.target.value)}}  />
            <input className=" my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base"  placeholder="IFSC Code" type="text" value={IFSCCode} onChange={(e)=>{setIFSCCode(e.target.value)}}  />

            </div>

            <div className="w-full justify-center">
            <div className=" w-full px-2 border rounded-md sm:rounded-full flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="checkORPassbookPhoto" id="checkORPassbookPhoto" checked={checkORPassbookPhoto} onChange={(e)=>{setCheckORPassbookPhoto(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="checkORPassbookPhoto">Check / Passbook Photo</label>
                </div> 
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

export default BankDetails
