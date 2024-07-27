import { useCallback, useContext, useEffect, useState } from "react"

import { toast } from "react-toastify";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";

const IsBankLoanInformation = () => {
  
  const documentArray = ["Adhar Card","Pan Card","Sallary Slip","16 No Form","ITR of 3 years","Home tax receipt","Namuna D","7/12","Ghar tax receipt","Kharedi khat","Electricity Bill","Load chnage payment receipt","Firm Quotation","Stamp Paper"]
  const [isBankLoan,setIsBankLoan] = useState(false);
  const [bankLoanDocuments,setBankLoanDocuments] = useState([]);

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

   if(!(trackSolarData?.ConsumerName && ( trackSolarData?.LoadChange===true || trackSolarData?.LoadChange === false) && (trackSolarData?.NameChange === true || trackSolarData?.NameChange === false))){
    toast.error("Fill all the information",{position:"top-center"});
   } else{

  const updatedTrackSolarData = {
    ...trackSolarData,
    BankLoan: isBankLoan,
    BankLoanDocuments: bankLoanDocuments,
    UserDetails: user?.userID,
    PrimaryInfromationDate: trackSolarData?.PrimaryInfromationDate || new Date()
  };

  // Update the context state
  setTrackSolarData(updatedTrackSolarData);

  const companyID = user?.companyID;
  firestore.addData(companyID + "TrackSolarData", updatedTrackSolarData, trackSolarData?.Id)
    .then((message) => {
      toast.success(message);
      toast.success("Saved! Submit the data");
    })
    .catch((error) => {
      toast.error("Error saving data: " + error.message);
    });

  }

}, [trackSolarData, isBankLoan, bankLoanDocuments, user, setTrackSolarData]);





  return (
    <div className=" flex justify-center items-center">
    <div className="flex flex-col w-[600px] ">
       <h3 className="text-xl underline ">Bank Loan Information : </h3>
       <div className="w-full ml-2 p-3 flex flex-col ">

       <div className=" ml-2 p-2 flex flex-row items-center">
           <span className="ml-2 p-2 text-lg">Bank Loan : </span>
           <input className="cursor-pointer" type="radio" name="bankLoan" id="bankLoanYes" checked={isBankLoan} onChange={(e)=>{setIsBankLoan(e.target.checked)}} />
           <label className="p-2 text-lg cursor-pointer" htmlFor="bankLoanYes">Yes</label>
           <input className="cursor-pointer" type="radio" name="bankLoan" id="bankLoanNo" checked={!isBankLoan} onChange={(e)=>{setIsBankLoan(!e.target.checked)}} />
           <label className="p-2 text-xl cursor-pointer" htmlFor="bankLoanNo">No</label>
       </div>

       {
        isBankLoan ? 
        <>
          <div className="w-[600px] m-2 border flex items-center p-2 justify-between  ">
                Select Documents : 
                    <select className="outline-none cursor-pointer" name="bankDocuments" id="bankDocuments"
                    onChange={(e) => {
                      const selectedDoc = e.target.value;
                      setBankLoanDocuments((prev) => {
                        console.log("Prevs",prev);
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

                <span>Documents List : </span>
       {
        bankLoanDocuments ? <>
          {bankLoanDocuments.map((document,index)=>(
          <div className="flex justify-between m-2 w-[300px]  "  key={document+index+1}>
          <li className="list-none" key={document} value={document}>
              {document}
          </li>
          <button key={document} onClick={()=>{
            setBankLoanDocuments((pre)=>pre.filter(ele=>ele !==document))
          }}>❌</button>

          </div>
          
      ))}
        </> : <></>
       }


        </> 
        : <></>
       }

     
       

      </div>     
      <div className="w-full flex justify-end p-3 mr-3">
       <button className="bg-blue-500 text-white rounded-lg pl-3 pr-3 pt-2 pb-2 w-fit hover:bg-blue-600 hover:shadow-lg" onClick={handleSubmit}>Save</button>
      </div>
   </div>  
  </div>    
  )
}

export default IsBankLoanInformation
