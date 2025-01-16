import { useCallback, useContext, useEffect, useState } from "react"

import { toast } from "react-toastify";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";
import Loading from "react-loading";
import PrimaryInformation from "./PrimaryInformation";

const IsBankLoanInformation = () => {
  
  const documentArray = ["Adhar Card","Pan Card","Sallary Slip","16 No Form","ITR of 3 years","Home tax receipt","Namuna D","7/12","Ghar tax receipt","Kharedi khat","Electricity Bill","Load change payment receipt","Firm Quotation","Stamp Paper"]
  const [isBankLoan,setIsBankLoan] = useState(false);
  const [bankLoanDocuments,setBankLoanDocuments] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
  const {user} = useContext(UserContext);
  useEffect(()=>{
    if(!isBankLoan){
      setBankLoanDocuments([]);
    }
},[isBankLoan])

useEffect(()=>{
  if(trackSolarData){
      setIsBankLoan(trackSolarData?.BankLoan || false);
      setBankLoanDocuments(trackSolarData?.BankLoanDocuments || []);  
  }
},[trackSolarData])


// Adjusted handleSubmit function
const handleSubmit = useCallback((e) => {
  e.preventDefault();
  toast.dismiss()
   if(!(trackSolarData?.ConsumerName && ( trackSolarData?.LoadChange===true || trackSolarData?.LoadChange === false) && (trackSolarData?.NameChange === true || trackSolarData?.NameChange === false))){
    toast.error("Fill all the information",{position:"top-center"});
   } else if(isBankLoan && bankLoanDocuments.length===0){
    toast.error("Select Documents!",{position:'top-right'});
   }
   else {

  setIsLoading(true);
  const updatedTrackSolarData = {
    ...trackSolarData,
    BankLoan: isBankLoan,
    BankLoanDocuments: bankLoanDocuments,
    BankLoanPendingDocuments: documentArray.filter( docs => !docs.includes(bankLoanDocuments)),
    PrimaryInfromation : {
      createdBy:trackSolarData?.PrimaryInfromation?.createdBy || user,
      createdAt:trackSolarData?.PrimaryInfromation?.createdAt || new Date(),
      isMainDone:trackSolarData?.PrimaryInfromation?.isMainDone,
      
      isLoadChangeDone:trackSolarData?.PrimaryInfromation?.isLoadChangeDone || false,
      isNameChangeDone:trackSolarData?.PrimaryInfromation?.isNameChangeDone || false,
      isBankDetailsDone:trackSolarData?.PrimaryInfromation?.isBankDetailsDone || false,
      isBankLoanDone:true,
      isDone: trackSolarData?.PrimaryInfromation?.isMainDone &&
       trackSolarData?.PrimaryInfromation?.isLoadChangeDone && 
       trackSolarData?.PrimaryInfromation?.isNameChangeDone && 
       trackSolarData?.PrimaryInfromation?.isBankDetailsDone ? true : false
  }
  };



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

}, [trackSolarData, isBankLoan, bankLoanDocuments,documentArray, user, setTrackSolarData]);





  return (
    <div className=" container mx-auto  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
         <div className="shadow-md p-2 border rounded-lg ">
            
          <h2 className="text-center font-bold">Bank Loan Information</h2>
       <div className="w-full  p-3 flex flex-col ">

       <div className=" border rounded-full my-2 gap-3 py-2 px-3 flex flex-row items-center">
           <span className="  text-base">Bank Loan : </span>
           <input className="cursor-pointer" type="radio" name="bankLoan" id="bankLoanYes" checked={isBankLoan} onChange={(e)=>{setIsBankLoan(e.target.checked)}} />
           <label className=" text-base cursor-pointer" htmlFor="bankLoanYes">Yes</label>
           <input className="cursor-pointer" type="radio" name="bankLoan" id="bankLoanNo" checked={!isBankLoan} onChange={(e)=>{setIsBankLoan(!e.target.checked)}} />
           <label className=" text-base cursor-pointer" htmlFor="bankLoanNo">No</label>
       </div>

       {
        isBankLoan ? 
        <>
          <div className="mt-2 border rounded-full w-full flex gap-1 my-2 py-2 px-2 justify-between  ">
                Documents : 
                    <select className="outline-none flex justify-center cursor-pointer w-[100px] sm:w-fit" name="bankDocuments" id="bankDocuments"
                    onChange={(e) => {
                      const selectedDoc = e.target.value;
                      setBankLoanDocuments((prev) => {
                        // console.log("Prevs",prev);
                        if (Array.isArray(prev) && !prev.includes(selectedDoc)) {
                          return [...prev, selectedDoc];
                        }
                        return prev;
                      });
                    }}
                     >
                        
                        {
                            documentArray.map((document,index)=>(
                                <option className="cursor-pointer" key={document+index} value={document}>
                                    {document}
                                </option>
                            ))
                        }
                    </select>
                    
                </div>

           { bankLoanDocuments.length !=0 &&   
           <div className="border rounded-md mt-2 p-3">

         
          <span className="underline ">Documents List : </span>
         
                
       {
        bankLoanDocuments ? <>
          {bankLoanDocuments.map((document,index)=>(
          <div className="flex justify-between mx-2 my-3 w-full border-b-2"  key={`${document}+${index*2}`}>
          <li className="list-none" key={document} value={document}>
              {index+1}.{document}
          </li>
          <button  onClick={()=>{
            setBankLoanDocuments((pre)=>pre.filter(ele=>ele !==document))
          }}>❌</button>
 
          </div>
          
      ))}
      
        </> : <></>
       }
              </div>
          }


        </> 
        : <></>
       }

     
       

      </div>    

      <div className="flex w-full justify-center gap-3 mt-5">
      {
                isLoading ? <Loading type='spinningBubbles' color='#3b82f6' height={'10%'} width={'10%'} /> :  
                <button className="bg-blue-500 text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
                onClick={handleSubmit}>Save</button>
            }
            </div>

   </div>  
  </div>    
  )
}

export default IsBankLoanInformation
