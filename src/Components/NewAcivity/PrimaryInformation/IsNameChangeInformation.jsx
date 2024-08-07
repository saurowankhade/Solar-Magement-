import { useContext, useEffect, useState } from "react"
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import Loading from "react-loading";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";
import NameChange from "../../ExistingActivity/ShowSpecificAcivity/PrimaryInfromation/NameChange";

const IsNameChangeInformation = ()=>{
    
    const documentsArray = ["Non","Home tax receipt","Namuna D","7/12","Malmatta patrak","Ghar kharidi","Death certificate"];

    const [isNameChange,setIsNameChange] = useState(false);
    const [isEBill,setIsEBill] = useState(false);
    const [isStampPaper,setIsStampPaper] = useState(false);
    const [isUForm,setIsUForm] = useState(false);
    const [isPaymentRecipt,setIsPaymentRecipt] = useState(false);
    const [isPassPhoto,setIsPassPhoto] = useState(false);
    const [isDeathCertificate,setIsDeathCertificate] = useState(false);
    const [documents,setDocuments] = useState("Non");
    const [shortNote,setShortNote] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);

    useEffect(()=>{
        if(!isNameChange){
            setIsNameChange(false);
            setIsEBill(false);
            setIsStampPaper(false)
            setIsUForm(false);
            setIsPaymentRecipt(false);
            setIsPassPhoto(false)
            setIsDeathCertificate(false)
            setDocuments("Non")
        }
    },[isNameChange])

    useEffect(()=>{
        if(trackSolarData){
            setIsNameChange(trackSolarData?.NameChange || false);
            setIsEBill(trackSolarData?.NameChangeEBill || false);
            setIsStampPaper(trackSolarData?.NameChangeStampPaper || false);
            setIsUForm(trackSolarData?.NameChangeUForm || false);
            setIsPaymentRecipt(trackSolarData?.NameChangePaymentRecipt || false);
            setIsPassPhoto(trackSolarData?.NameChangePassPhoto || false);
            setIsDeathCertificate(trackSolarData?.NameChangeDeathCertificate || false);
            setDocuments(trackSolarData?.NameChangeDocuments || "");
            setShortNote(trackSolarData?.Note || "");
        }
    },[trackSolarData])

    const handleSubmit = (e)=>{
        e.preventDefault();
        toast.dismiss()
        if(!(trackSolarData?.ConsumerName && ( trackSolarData?.LoadChange===true || trackSolarData?.LoadChange === false) )){
            toast.error("Fill all the information",{position:"top-center"});
            return;
        }

        setIsLoading(true);

        const updatedTrackSolarData = {
            ...trackSolarData,
            NameChange:isNameChange,
            NameChangeEBill:isEBill ,
            NameChangeStampPaper:isStampPaper,
            NameChangeUForm:isUForm,
            NameChangePaymentRecipt:isPaymentRecipt,
            NameChangePassPhoto:isPassPhoto,
            NameChangeDeathCertificate:isDeathCertificate,
            Note:shortNote === undefined ? "" : shortNote,
            NameChangeDocuments:documents,
            PrimaryInfromation : {
                createdBy:trackSolarData?.PrimaryInfromation?.createdBy || user,
                createdAt:trackSolarData?.PrimaryInfromation?.createdAt || new Date(),
                isDone:(isNameChange ? 
                    ( (isEBill && isStampPaper && isUForm && isPaymentRecipt && isPassPhoto && documents) ? true: false)
                :   ( (trackSolarData?.BankLoan === true || trackSolarData?.BankLoan===false) ? true : false)),
                isMainDone:(trackSolarData?.Visit ? true : false)
            }
        }
        setTrackSolarData(updatedTrackSolarData)


        
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




       
    }
   
    return (
       <div className=" flex justify-center items-center">
         <div className="flex flex-col w-[600px] ">
            <div className="w-full  p-3 flex flex-col ">

            <div className=" p-2 flex flex-row border m-2">
                <span className=" p-2 text-xl">Name Change : </span>
                <input className="cursor-pointer" type="radio" name="nameChange" id="nameChangeYes" checked={isNameChange} onChange={(e)=>{setIsNameChange(e.target.checked)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="nameChangeYes">Yes</label>
                <input className="cursor-pointer" type="radio" name="nameChange" id="nameChangeNo" checked={!isNameChange} onChange={(e)=>{setIsNameChange(!e.target.checked)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="nameChangeNo">No</label>
            </div>

            {
                isNameChange ? <>
                
                <div className="flex flex-row gap-1 w-full m-2">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="eBill" id="eBill" checked={isEBill} onChange={(e)=>{setIsEBill(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="eBill">Electricity Bill</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="stampPaper" id="stampPaper"  checked={isStampPaper} onChange={(e)=>{setIsStampPaper(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="stampPaper">Stamp Paper</label>
                </div> 
               </div>

               <div className="flex flex-row gap-1 w-full m-2">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="uForm" id="uForm"  checked={isUForm} onChange={(e)=>{setIsUForm(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="uForm">U Form</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="paymentRecipt" id="paymentRecipt"  checked={isPaymentRecipt} onChange={(e)=>{setIsPaymentRecipt(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="paymentRecipt">Payment Recipt</label>
                </div> 
               </div>
               <div className="flex flex-row gap-1 w-full m-2">
               <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="passPhoto" id="passPhoto"  checked={isPassPhoto} onChange={(e)=>{setIsPassPhoto(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="passPhoto">Pass Photo 2 of Consumer</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="deathCertificate" id="deathCertificate"  checked={isDeathCertificate} onChange={(e)=>{setIsDeathCertificate(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="deathCertificate">Death Certificate</label>
                </div> 

                </div>

               <div className="flex flex-row gap-1 w-full m-2">
               <div className=" w-full p-2 border  flex flex-row items-center">
                <label className="w-full p-2 text-base" htmlFor="documents">Documents : </label>
                    <select className="p-2 w-full text-base border cursor-pointer" name="nameChangeDocuments" id="nameChangeDocuments" value={documents} onChange={(e)=>{setDocuments(e.target.value)}} >
                        {
                            
                                !documentsArray.includes(documents) && (
                                    <option className="cursor-pointer" key={documents} value={documents}>
                                        {documents}
                                    </option>
                                )
                            
                        }
                        {
                            documentsArray.map((document)=>(
                                <option className="cursor-pointer" key={document} value={document}>
                                    {document}
                                </option>
                            ))
                        }
                    </select>

              
                    
                </div> 
                
                </div>
                
                </> : <></>
            }

            <div className="mt-2 flex flex-row items-center">
                <textarea className="border-2 rounded-2xl outline-none w-full p-3  border-gray-300" name="note" id="note" rows="4" placeholder="Note" value={shortNote} onChange={(e)=>{setShortNote(e.target.value)}}/>
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
export default IsNameChangeInformation