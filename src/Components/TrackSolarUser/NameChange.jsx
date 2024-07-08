import { useContext, useEffect, useState } from "react"
import TrackSolarContext from "../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";

const NameChange = ()=>{
    
    const documentsArray = ["Non","Home tax receipt","Namuna D","7/12","Malmatta patrak","Ghar kharidi","Death certificate"];

    const [isNameChange,setIsNameChange] = useState(false);
    const [isEBill,setIsEBill] = useState(false);
    const [isStampPaper,setIsStampPaper] = useState(false);
    const [isUForm,setIsUForm] = useState(false);
    const [isPaymentRecipt,setIsPaymentRecipt] = useState(false);
    const [isPassPhoto,setIsPassPhoto] = useState(false);
    const [documents,setDocuments] = useState("Non");
    const [shortNote,setShortNote] = useState(" ");

    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);

    useEffect(()=>{
        if(!isNameChange){
            setIsNameChange(false);
            setIsEBill(false);
            setIsStampPaper(false)
            setIsUForm(false);
            setIsPaymentRecipt(false);
            setIsPassPhoto(false)
            setDocuments("Non")
        }
    },[isNameChange])

    useEffect(()=>{
        if(trackSolarData){
            setIsNameChange(trackSolarData?.NameChange);
            setIsEBill(trackSolarData?.NameChangeEBill);
            setIsStampPaper(trackSolarData?.NameChangeStampPaper);
            setIsUForm(trackSolarData?.NameChangeUForm);
            setIsPaymentRecipt(trackSolarData?.NameChangePaymentRecipt);
            setIsPassPhoto(trackSolarData?.NameChagePassPhoto);
            setDocuments(trackSolarData?.NameChangeDocuments);
            setShortNote(trackSolarData?.Note);
        }
    },[trackSolarData])

    const handleSubmit = (e)=>{
        e.preventDefault();
        setTrackSolarData((preObject)=>({
            ...preObject,
            NameChange:isNameChange,
            NameChangeEBill:isEBill ,
            NameChangeStampPaper:isStampPaper,
            NameChangeUForm:isUForm,
            NameChangePaymentRecipt:isPaymentRecipt,
            NameChangePassPhoto:isPassPhoto,
            Note:shortNote === undefined ? "" : shortNote,
            NameChangeDocuments:documents
        }))
        toast.success("Saved! Submit the data")
    }
   
    return (
        <div className="flex flex-col w-[700px] border ">
            <h3 className="text-xl underline ">Name Change Information : </h3>
            <div className="w-full ml-2 p-3 flex flex-col ">

            <div className=" ml-2 p-2 flex flex-row items-center">
                <span className="ml-2 p-2 text-lg">Name Change : </span>
                <input className="cursor-pointer" type="radio" name="nameChange" id="nameChangeYes" checked={isNameChange} onChange={(e)=>{setIsNameChange(e.target.checked)}} />
                <label className="p-2 text-lg cursor-pointer" htmlFor="nameChangeYes">Yes</label>
                <input className="cursor-pointer" type="radio" name="nameChange" id="nameChangeNo" checked={!isNameChange} onChange={(e)=>{setIsNameChange(e.target.checked)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="nameChangeNo">No</label>
            </div>

            {
                isNameChange ? <>
                
                <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="eBill" id="eBill" checked={isEBill} onChange={(e)=>{setIsEBill(e.target.checked)}}  />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="eBill">Electricity Bill</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="stampPaper" id="stampPaper"  checked={isStampPaper} onChange={(e)=>{setIsStampPaper(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="stampPaper">Stamp Paper</label>
                </div> 
               </div>

               <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border flex items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4" type="checkbox" name="uForm" id="uForm"  checked={isUForm} onChange={(e)=>{setIsUForm(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="uForm">U Form</label>
                </div> 

                <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="paymentRecipt" id="paymentRecipt"  checked={isPaymentRecipt} onChange={(e)=>{setIsPaymentRecipt(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="paymentRecipt">Payment Recipt</label>
                </div> 
               </div>

               <div className=" w-full p-2 border  flex flex-row items-center hover:border hover:border-gray-500">
                <input className="cursor-pointer h-4 w-4 " type="checkbox" name="passPhoto" id="passPhoto"  checked={isPassPhoto} onChange={(e)=>{setIsPassPhoto(e.target.checked)}}   />
                <label className="p-2 text-base cursor-pointer text-black" htmlFor="passPhoto">Pass Photo 2 of Consumer</label>
                </div> 

               <div className="flex flex-row gap-2 w-full">
               <div className=" w-full p-2 border  flex flex-row items-center">
                <label className="w-full p-2 text-base" htmlFor="documents">Documents : </label>
                    <select className="p-2 w-full text-base border cursor-pointer" name="documents" id="documents" value={documents} onChange={(e)=>{setDocuments(e.target.value)}} >
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
                <textarea className="border-2 rounded-2xl outline-none w-full p-3 placeholder:text-black border-gray-300" name="note" id="note" rows="4" placeholder="Note" value={shortNote} onChange={(e)=>{setShortNote(e.target.value)}}/>
            </div>

           </div>     
           <div className="w-full flex justify-end p-3 mr-3">
            <button className="bg-blue-500 text-white rounded-lg pl-3 pr-3 pt-2 pb-2 w-fit hover:bg-blue-600 hover:shadow-lg" onClick={handleSubmit}>Save</button>
           </div>
        </div>                                                              
    )
}
export default NameChange