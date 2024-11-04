import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";


const BankLoan = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {BankLoan,BankLoanDocuments,BankLoanPendingDocuments} = trackSolarData;
  return (
    <div className="flex justify-center">
    <div className={`p-2  shadow-md border  w-full ${trackSolarData?.PrimaryInfromation?.isBankLoanDone ? " bg-white" : " bg-red-100"} `}>
    <h3 className="text-center text-xl underline">Bank Loan Data</h3>
        <div className="mt-2">
          <span className="text-base font-bold">Bank Loan : </span>
          <span className="text-blue-800">{BankLoan ? "Yes" : "No"}</span>
        </div>
        {
          BankLoan ? 
          <div className="flex justify-between">
         <div className="mt-2">
          <span className="text-base font-bold text-center">Documents : </span> 
          {
            BankLoanDocuments.map((element,index)=>(
              <li key={`${element+index}`} className="text-blue-800 list-decimal">{element}</li>
            ))
          }
         </div>
         <div className="mt-2">
          <span className="text-base font-bold text-center">Pending Documents : </span> 
          {
            BankLoanPendingDocuments.map((element,index)=>(
              <li key={`${element+index}`} className="text-red-800 list-decimal">{element}</li>
            ))
          }
         </div>
         
        </div> : <></>
        }
    </div>
  </div>
  )
}

export default BankLoan
