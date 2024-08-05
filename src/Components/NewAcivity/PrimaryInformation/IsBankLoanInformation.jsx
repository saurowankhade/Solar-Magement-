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
      isDone: trackSolarData?.LoadChange ? trackSolarData?.LoadChangeApproved ? true : false : true
  }
  };

  // Update the context state
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

}, [trackSolarData, isBankLoan, bankLoanDocuments, user, setTrackSolarData]);





  return (
    <div className=" flex justify-center items-center">
    <div className="flex flex-col w-[600px] ">
       <div className="w-full  p-3 flex flex-col ">

       <div className=" border  p-2 flex flex-row items-center">
           <span className=" p-2 text-lg">Bank Loan : </span>
           <input className="cursor-pointer" type="radio" name="bankLoan" id="bankLoanYes" checked={isBankLoan} onChange={(e)=>{setIsBankLoan(e.target.checked)}} />
           <label className="p-2 text-lg cursor-pointer" htmlFor="bankLoanYes">Yes</label>
           <input className="cursor-pointer" type="radio" name="bankLoan" id="bankLoanNo" checked={!isBankLoan} onChange={(e)=>{setIsBankLoan(!e.target.checked)}} />
           <label className="p-2 text-xl cursor-pointer" htmlFor="bankLoanNo">No</label>
       </div>

       {
        isBankLoan ? 
        <>
          <div className="mt-2 border flex items-center p-4 justify-between  ">
                Select Documents : 
                    <select className="outline-none cursor-pointer" name="bankDocuments" id="bankDocuments"
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

           { bankLoanDocuments.length !=0 &&   <div className="border mt-2 p-3">
           
         
          <span className="underline ">Documents List : </span>
         
                
       {
        bankLoanDocuments ? <>
          {bankLoanDocuments.map((document,index)=>(
          <div className="flex justify-between m-2 w-[300px]  "  key={`${document}+${index*2}`}>
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
                isLoading ? <Loading type='spinningBubbles' color='blue' height={'15%'} width={'15%'} /> :  <button className="bg-blue-700 text-white rounded-lg hover:bg-blue-600 cursor-pointer p-2 m-2 w-[200px] text-xl" onClick={handleSubmit}>Save</button>
            }

            </div>

   </div>  
  </div>    
  )
}

export default IsBankLoanInformation
