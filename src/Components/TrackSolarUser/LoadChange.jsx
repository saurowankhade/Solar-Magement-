import { useContext, useEffect, useState } from "react"
import TrackSolarContext from "../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";

const LoadChange = ()=>{
    const documentsArray = ["Non","Electricity Bill"];
    
    const [isLoadChange , setIsLoadChange] = useState(false);
    const [isAppliactionStatusDone , setIsAppliactionStatusDone] = useState(false);
    const [isPaymentRecipt , setIsPaymentRecipt] = useState(false);
    const [isApproved , setIsApproved] = useState(false);
    const [documents , setDocuments] = useState("Non");

    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);

    useEffect(()=>{
        if(!isLoadChange) {
            setIsLoadChange(false)
            setDocuments("Non");
            setIsAppliactionStatusDone(false);
            setIsPaymentRecipt(false);
            setIsApproved(false);
        } else if(!isAppliactionStatusDone){
            setIsAppliactionStatusDone(false);
            setIsPaymentRecipt(false); 
            setIsApproved(false);
        }
    },[isLoadChange,isAppliactionStatusDone])

    useEffect(()=>{
        if(trackSolarData){
            setIsLoadChange(trackSolarData?.LoadChange);
            setIsAppliactionStatusDone(trackSolarData?.LoadChangeAppliactionStatus);
            setIsPaymentRecipt(trackSolarData?.LoadChangePaymentRecipt);
            setIsApproved(trackSolarData?.LoadChangeApproved);
            setDocuments(trackSolarData?.LoadChangeDocuments);
        }
    },[trackSolarData])


    const handleSubmit = ()=>{
       
        setTrackSolarData((prevObject) => ({
            ...prevObject,
            LoadChange: isLoadChange,
            LoadChangeAppliactionStatus: isAppliactionStatusDone,
            LoadChangePaymentRecipt: isPaymentRecipt,
            LoadChangeApproved: isApproved,
            LoadChangeDocuments: documents
        }));

        toast.success("Saved! Go Next ➡️ ")


    }
    return (
        <div className="flex flex-col w-[700px] border ">
            <h3 className="text-xl underline ">Load Change Information : </h3>
            <div className=" ml-2 p-2 flex flex-row items-center">
                <span className="ml-2 p-2 text-lg">Load Change : </span>
                <input className="cursor-pointer" type="radio" name="loadChange" id="loadChangeYes" checked={isLoadChange} onChange={()=>{setIsLoadChange(true)}} />
                <label className="p-2 text-lg cursor-pointer" htmlFor="loadChangeYes">Yes</label>
                <input className="cursor-pointer" type="radio" name="loadChange" id="loadChangeNo" checked={!isLoadChange} onChange={()=>{setIsLoadChange(false)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="loadChangeNo">No</label>
            </div>
            {console.log("Is loading : "+isLoadChange)}
            {
                isLoadChange ? 
                <div>
                    
                    <div className=" ml-2 p-2 flex flex-row items-center">
                    <label className="ml-2 p-2 text-xl" htmlFor="documents">Documents : </label>
                    <select className="ml-2 p-2 text-xl border cursor-pointer" name="documents" id="documents" value={documents} onChange={(e)=>{setDocuments(e.target.value)}}>
                        
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

                   <div>
                   <div className=" ml-2 p-2 flex flex-row items-center">
                <span className="ml-2 p-2 text-xl">Application Status : </span>
                <input className="cursor-pointer" type="radio" name="applicationStatus" id="applicationStatusDone" checked={isAppliactionStatusDone}  onChange={()=>{setIsAppliactionStatusDone(true)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="applicationStatusDone">Done</label>
                <input className="cursor-pointer" type="radio" name="applicationStatus" id="applicationStatusPending" checked={!isAppliactionStatusDone} onChange={()=>{setIsAppliactionStatusDone(false)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="applicationStatusPending">Pending</label>
            </div>
            {
                isAppliactionStatusDone ? 
                <div>
                    <div className=" ml-2 p-2 flex flex-row items-center">
                <span className="ml-2 p-2 text-xl">Payment Recipt : </span>
                <input className="cursor-pointer"  type="radio" checked={isPaymentRecipt} name="paymentRecipt" id="paymentReciptYes" onChange={()=>{setIsPaymentRecipt(true)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="paymentReciptYes">Yes</label>
                <input className="cursor-pointer" type="radio" checked={!isPaymentRecipt} name="paymentRecipt" id="paymentReciptNo" onChange={()=>{setIsPaymentRecipt(false)}}  />
                <label className="p-2 text-xl cursor-pointer" htmlFor="paymentReciptNo">No</label>
            </div>

            
            <div className=" ml-2 p-2 flex flex-row items-center">
                <span className="ml-2 p-2 text-xl">Approved (Send to bill ) : </span>
                <input className="cursor-pointer"  type="radio" name="approved" id="approvedYes" checked={isApproved} onChange={()=>{setIsApproved(true)}}  />
                <label className="p-2 text-xl cursor-pointer" htmlFor="approvedYes">Yes</label>
                <input className="cursor-pointer" type="radio" name="approved" id="approvedNo" checked={!isApproved} onChange={()=>{setIsApproved(false)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="approvedNo">No</label>
            </div>


                </div>
                : <></>
            }
                   </div>



                </div> 
                
                : <></>
            }
            <div className="w-full flex justify-end p-3 mr-3">
            <button className="bg-blue-500 text-white rounded-lg pl-3 pr-3 pt-2 pb-2 w-fit hover:bg-blue-600 hover:shadow-lg" onClick={handleSubmit}>Save</button>
           </div>
        </div>                                                                
    )
}
export default LoadChange