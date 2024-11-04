import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";

const BankDetails = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {BankHolderName,BankName,ConsumerAccountNumber,IFSCCode,CheckORPassbookPhoto} = trackSolarData;
  return (
    <div className="flex justify-center">
     <div className={`p-2  shadow-md border  w-full ${trackSolarData?.PrimaryInfromation?.isBankDetailsDone ? " bg-white" : " bg-red-100"} `}>
      <h3 className="text-center text-xl underline">Bank Details</h3>
           <div className="mt-2">
            <span className="text-base font-bold">Bank Holder Name : </span> 
            <span className={`${BankHolderName ? "text-blue-800" : "text-red-800"}`}>{BankHolderName || "Not fill yet"}</span>
           </div>
           <div className="mt-2">
            <span className="text-base font-bold">Bank Name : </span> 
            <span className={`${BankName ? "text-blue-800" : "text-red-800"}`}>{BankName || "Not fill yet"}</span>
           </div>
           <div className="mt-2">
              <span className="text-base font-bold">Consumer Account Number : </span>
             <span className={`${ConsumerAccountNumber ? "text-blue-800" : "text-red-800"}`}>{ConsumerAccountNumber || "Not fill yet"}</span>
           </div>
           <div className="mt-2">
              <span className="text-base font-bold">IFSC Code : </span>
             <span className={`${IFSCCode ? "text-blue-800" : "text-red-800"}`}>{IFSCCode || "Not fill yet"}</span>
           </div>
           <div className="mt-2">
             <span className="text-base font-bold">Check  Passbook Photo : </span>
             <span className={`${CheckORPassbookPhoto ? "text-blue-800" : "text-red-800"}`}>{CheckORPassbookPhoto ? "Yes" : "No"}</span>
           </div>
           
      </div>
    </div>
  )
}

export default BankDetails
