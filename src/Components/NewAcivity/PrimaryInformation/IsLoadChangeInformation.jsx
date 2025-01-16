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
            isMainDone:trackSolarData?.PrimaryInfromation?.isMainDone, 
            isLoadChangeDone:isLoadChange ? (isAppliactionStatusDone && isPaymentRecipt && isApproved && documents? true: false) : true,
            isNameChangeDone:trackSolarData?.PrimaryInfromation?.isNameChangeDone || false,
            isBankDetailsDone:trackSolarData?.PrimaryInfromation?.isBankDetailsDone || false,
            isBankLoanDone:trackSolarData?.PrimaryInfromation?.isBankLoanDone || false,
            isDone: (trackSolarData?.PrimaryInfromation?.isMainDone) && 
           ( isLoadChange ? (isAppliactionStatusDone && isPaymentRecipt && isApproved && documents ? true: false) : true )&&
            trackSolarData?.PrimaryInfromation?.isNameChangeDone && 
            trackSolarData?.PrimaryInfromation?.isBankDetailsDone ? true : false,
        }
       }
        const companyID = user?.activeID;
        firestore.addData(companyID + "TrackSolarData", {"data":updatedTrackSolarData}, trackSolarData?.Id)
        .then((getStatus)=>{
            if(getStatus.status === 200){
                setIsLoading(false);
                  // Update the context state
                setTrackSolarData(updatedTrackSolarData);
              
                
                toast.success("Data saved!Go next",{position:'top-right'});
            } else{
                setIsLoading(false);
                toast.error(getStatus?.message?.message || "Failed to add" ,{position:'top-right'})
            }
        });
    }
    return (
        <div className="container mx-auto  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
            
          <div className="shadow-md p-2 border rounded-lg">
          <h2 className="text-center font-bold">Load Change Information</h2>
           <div className=" flex  border rounded-full gap-2 my-2 py-2 px-2">
                <span className="text-base ">Load Change : </span>
                <input className="cursor-pointer" type="radio" name="loadChange" id="loadChangeYes" checked={isLoadChange} onChange={()=>{setIsLoadChange(true)}} />
                <label className=" text-base  cursor-pointer" htmlFor="loadChangeYes">Yes</label>
                <input className="cursor-pointer" type="radio" name="loadChange" id="loadChangeNo" checked={!isLoadChange} onChange={()=>{setIsLoadChange(false)}} />
                <label className=" text-base  cursor-pointer" htmlFor="loadChangeNo">No</label>
            </div>

            {
                isLoadChange ? 
                <div className="w-full">
                    
                    <div className=" p-2 flex flex-row items-center rounded-full border gap-2 my-2 py-1 px-2 ">
                    <label className="p-2 text-base" htmlFor="documents">Documents : </label>
                    <select className="p-2 text-base border cursor-pointer w-[100px] sm:w-fit" name="loadDocuments" id="loadDocuments" value={documents} onChange={(e)=>{setDocuments(e.target.value)}}>
                        
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
                   <div className="  p-2 flex flex-row items-center rounded-full   border my-2 py-1 px-3 ">
                <span className=" p-2 text-base">Application Status : </span>
                <input className="cursor-pointer" type="radio" name="applicationStatus" id="applicationStatusDone" checked={isAppliactionStatusDone}  onChange={()=>{setIsAppliactionStatusDone(true)}} />
                <label className="p-2 text-base cursor-pointer" htmlFor="applicationStatusDone">Done</label>
                <input className="cursor-pointer" type="radio" name="applicationStatus" id="applicationStatusPending" checked={!isAppliactionStatusDone} onChange={()=>{setIsAppliactionStatusDone(false)}} />
                <label className="p-2 text-base cursor-pointer" htmlFor="applicationStatusPending">Pending</label>
            </div>
            {
                isAppliactionStatusDone ? 
                <div>
                    <div className="flex flex-row items-center rounded-full  border gap-2 my-2 py-1 px-3">
                <span className=" p-2 text-base">Payment Recipt : </span>
                <input className="cursor-pointer"  type="radio" checked={isPaymentRecipt} name="paymentReciptLoadChange" id="paymentReciptYes" onChange={()=>{setIsPaymentRecipt(true)}} />
                <label className="p-2 text-base cursor-pointer" htmlFor="paymentReciptLoadChangeYes">Yes</label>
                <input className="cursor-pointer" type="radio" checked={!isPaymentRecipt} name="paymentReciptLoadChange" id="paymentReciptNo" onChange={()=>{setIsPaymentRecipt(false)}}  />
                <label className="p-2 text-base cursor-pointer" htmlFor="paymentReciptLoadChangeNo">No</label>
            </div>

            
            <div className=" flex flex-row items-center rounded-full  border gap-1 my-2 py-1 px-3 ">
                <span className=" p-2 text-base">Approved (Send to bill ) : </span>
                <input className="cursor-pointer"  type="radio" name="approved" id="approvedYes" checked={isApproved} onChange={()=>{setIsApproved(true)}}  />
                <label className="p-2 text-base cursor-pointer" htmlFor="approvedYes">Yes</label>
                <input className="cursor-pointer" type="radio" name="approved" id="approvedNo" checked={!isApproved} onChange={()=>{setIsApproved(false)}} />
                <label className="p-2 text-base cursor-pointer" htmlFor="approvedNo">No</label>
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
                isLoading ? <ReactLoading type='spinningBubbles' color='#3b82f6' height={'10%'} width={'10%'} /> :  
                <button className="bg-blue-500 text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
                onClick={handleSubmit}>Save</button>
            }

            </div>
        </div>     
        </div>                                                           
    )
}
export default IsLoadChangeInformation