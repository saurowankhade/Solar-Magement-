import { useContext, useEffect, useState } from "react"
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import { toast } from "react-toastify";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";
import ReactLoading from "react-loading";

const IsLoadChangeInformation = ()=>{
    const documentsArray = ["Non","Electricity Bill"];
    
    const [isLoadChange , setIsLoadChange] = useState(false);
    const [isAppliactionStatusDone , setIsAppliactionStatusDone] = useState(false);
    const [isPaymentRecipt , setIsPaymentRecipt] = useState(false);
    const [isApproved , setIsApproved] = useState(false);
    const [documents , setDocuments] = useState("Non");
    const [isLoading,setIsLoading] = useState(false);
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);

    const {user} = useContext(UserContext);

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
            setIsLoadChange(trackSolarData?.LoadChange || false);
            setIsAppliactionStatusDone(trackSolarData?.LoadChangeAppliactionStatus || false);
            setIsPaymentRecipt(trackSolarData?.LoadChangePaymentRecipt || false);
            setIsApproved(trackSolarData?.LoadChangeApproved || false);
            setDocuments(trackSolarData?.LoadChangeDocuments || "");
        }
    },[trackSolarData])


    const handleSubmit = ()=>{
        toast.dismiss()
        if(!(trackSolarData?.ConsumerName )){
            toast.error("Fill all the information",{position:"top-center"});
            return;
        }
        setIsLoading(true);
       const updatedTrackSolarData = {
        ...trackSolarData,
        LoadChange: isLoadChange,
        LoadChangeAppliactionStatus: isAppliactionStatusDone,
        LoadChangePaymentRecipt: isPaymentRecipt,
        LoadChangeApproved: isApproved,
        LoadChangeDocuments: documents,
        PrimaryInfromation : {
            createdBy:trackSolarData?.PrimaryInfromation?.createdBy || user,
            createdAt:trackSolarData?.PrimaryInfromation?.createdAt || new Date(),
            isDone:(isLoadChange ? 
                ( (isAppliactionStatusDone && isPaymentRecipt && isApproved && documents) ? true: false)
            :   ( (trackSolarData?.BankLoan === true || trackSolarData?.BankLoan===false) ? true : false)
        ),
        isMainDone:(trackSolarData?.Visit ? true : false)
        }
       }
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
    }
    return (
        <div className="w-full  flex justify-center ">
          <div className=" w-[600px] ">
           
           <div className=" flex  border gap-2 m-2 p-2">
                <span className="ml-2 p-2 text-xl">Load Change : </span>
                <input className="cursor-pointer" type="radio" name="loadChange" id="loadChangeYes" checked={isLoadChange} onChange={()=>{setIsLoadChange(true)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="loadChangeYes">Yes</label>
                <input className="cursor-pointer" type="radio" name="loadChange" id="loadChangeNo" checked={!isLoadChange} onChange={()=>{setIsLoadChange(false)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="loadChangeNo">No</label>
            </div>

            {
                isLoadChange ? 
                <div className="w-full">
                    
                    <div className=" p-2 flex flex-row items-center  border gap-2 m-2 ">
                    <label className="p-2 text-xl" htmlFor="documents">Documents : </label>
                    <select className="p-2 text-xl border cursor-pointer" name="loadDocuments" id="loadDocuments" value={documents} onChange={(e)=>{setDocuments(e.target.value)}}>
                        
                    {
                            
                            !documentsArray.includes(documents) && (
                                <option className="cursor-pointer outline-none" key={documents} value={documents}>
                                    {documents}
                                </option>
                            )
                        
                    }
                        
                        {
                            documentsArray.map((document,index)=>(
                                <option className="cursor-pointer outline-none" key={document+index+2} value={document}>
                                    {document}
                                </option>
                            ))
                        }
                    </select>
                    </div>

                   <div>
                   <div className="  p-2 flex flex-row items-center   border m-2 ">
                <span className=" p-2 text-xl">Application Status : </span>
                <input className="cursor-pointer" type="radio" name="applicationStatus" id="applicationStatusDone" checked={isAppliactionStatusDone}  onChange={()=>{setIsAppliactionStatusDone(true)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="applicationStatusDone">Done</label>
                <input className="cursor-pointer" type="radio" name="applicationStatus" id="applicationStatusPending" checked={!isAppliactionStatusDone} onChange={()=>{setIsAppliactionStatusDone(false)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="applicationStatusPending">Pending</label>
            </div>
            {
                isAppliactionStatusDone ? 
                <div>
                    <div className="  p-2 flex flex-row items-center  border gap-2 m-2">
                <span className=" p-2 text-xl">Payment Recipt : </span>
                <input className="cursor-pointer"  type="radio" checked={isPaymentRecipt} name="paymentReciptLoadChange" id="paymentReciptYes" onChange={()=>{setIsPaymentRecipt(true)}} />
                <label className="p-2 text-xl cursor-pointer" htmlFor="paymentReciptLoadChangeYes">Yes</label>
                <input className="cursor-pointer" type="radio" checked={!isPaymentRecipt} name="paymentReciptLoadChange" id="paymentReciptNo" onChange={()=>{setIsPaymentRecipt(false)}}  />
                <label className="p-2 text-xl cursor-pointer" htmlFor="paymentReciptLoadChangeNo">No</label>
            </div>

            
            <div className="  p-2 flex flex-row items-center  border gap-1 m-2 ">
                <span className=" p-2 text-xl">Approved (Send to bill ) : </span>
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
            <div className="flex w-full justify-center gap-3 mt-5">
            {
                isLoading ? <ReactLoading type='spinningBubbles' color='blue' height={'15%'} width={'15%'} /> :  <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2 m-2 w-[200px] text-xl" onClick={handleSubmit}>Save</button>
            }

            </div>
        </div>     
        </div>                                                           
    )
}
export default IsLoadChangeInformation