import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";
import WhoAddData from "../WhoAddData/WhoAddData";
import TableHeader from "../../../NewAcivity/Payment/TableHeader";

const Payment = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const{BalanceAmount,Installament ,PaymentInfromation
,        SubsidyCheque , SubsidyChequeAmount , TotalAmount } = trackSolarData;

  return (
    <div className="">
    <WhoAddData date={PaymentInfromation?.createdAt} user={PaymentInfromation?.createdBy} />

    
           <div className="flex justify-center">
          <div className="p-2 w-full  shadow-md border  md:w-[700px] ">
          <h3 className="text-center text-xl underline">Payment Data</h3>
              
               <div className="mt-2">
                <span className="text-base font-bold">Total Amount : </span> 
                <span className={`${TotalAmount ? "text-blue-800" : "text-red-800"}`}>{TotalAmount || "Not yet"}</span>
               </div>
               <div className="mt-2">
                <span className="text-base font-bold">Is Subsidy cheque : </span> 
                <span className={` ${SubsidyCheque === true || SubsidyCheque === false ? "text-blue-800" : "text-red-800"} `}>{SubsidyCheque ? "Yes" : "No"}</span>
               </div>
               {
                SubsidyCheque ? <div className="mt-2">
                <span className="text-base font-bold">Subsidy cheque Amount : </span> 
                <span className={` ${SubsidyChequeAmount ? "text-blue-800" : "text-red-800"}`}>{SubsidyChequeAmount }</span>
               </div> : <></>
               }
    
               <div className="mt-2">
                <span className="text-base font-bold">Balance Amount : </span> 
                <span className={`${BalanceAmount === 0 ? "text-green-800" : "text-red-800"}`}>{TotalAmount ? BalanceAmount :  "Not yet"}</span>
               </div>
               {
                Installament  ? <div className="mt-2 ">
                <h2 className="text-center p-2">Installament Details  : </h2>
                <TableHeader installamentData={Installament || []} isShow={true} />
               </div> : 
               <div className="mt-2">
               <h2 className="text-center p-2">No Installament Details yet</h2>
                </div>

               }
             
    
               
          </div>
          
        </div>
        
        </div>
  )
}

export default Payment
