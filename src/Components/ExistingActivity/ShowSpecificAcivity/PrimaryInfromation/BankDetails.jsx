import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";

const BankDetails = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {BankName,ConsumerAccountNumber,IFSCCode,CheckORPassbookPhoto} = trackSolarData;
  return (
    <div className="flex justify-center">
      <div className="p-2  shadow-md border  w-[700px] ">
      <h3 className="text-center text-xl underline">Bank Details</h3>
          
           <div className="mt-2">
            <span className="text-base font-bold">Bank Name : </span> 
            <span className="text-blue-800">{BankName}</span>
           </div>
           <div className="mt-2">
              <span className="text-base font-bold">Consumer Account Number : </span>
             <span className="text-blue-800">{ConsumerAccountNumber}</span>
           </div>
           <div className="mt-2">
              <span className="text-base font-bold">IFSC Code : </span>
             <span className="text-blue-800">{IFSCCode}</span>
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
