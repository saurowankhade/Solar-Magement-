import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';

const LoadChange = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {LoadChange,LoadChangeAppliactionStatus,LoadChangePaymentRecipt,LoadChangeApproved,LoadChangeDocuments} = trackSolarData;
  return (
    <div className="flex justify-center"> 
    <div className={`p-2  shadow-md border  w-full ${trackSolarData?.PrimaryInfromation?.isLoadChangeDone ? " bg-white" : " bg-red-100"} `}>
      <h3 className="text-center text-xl underline">Load Change Data</h3>
          <div className="mt-2">
            <span className="text-base font-bold">Load Change : </span>
            <span className="text-blue-800">{LoadChange ? "Yes" : "No"}</span>
          </div>
           {
            LoadChange ? <>
                <div className="mt-2">
            <span className="text-base font-bold">Documents : </span> 
            <span className={`${LoadChangeDocuments ? " text-blue-800" : " text-red-800"}`}>{LoadChangeDocuments || "Non"}</span>
           </div>
           <div className="mt-2">
              <span className="text-base font-bold">Application Status : </span>
             <span className={`${LoadChangeAppliactionStatus ? " text-blue-800" : " text-red-800"}`}>{LoadChangeAppliactionStatus ? "Done" : "Pending"}</span>
           </div>
           <div className="mt-2">
             <span className="text-base font-bold">Payment Recipt : </span>
             <span className={`${LoadChangePaymentRecipt ? " text-blue-800" : " text-red-800"}`}>{LoadChangePaymentRecipt ? "Done" : "Pending"}</span>
           </div>
           <div className="mt-2">
            <span className="text-base font-bold">Approved (Send to bill) : </span> 
            <span className={`${LoadChangeApproved ? " text-blue-800" : " text-red-800"}`}>{LoadChangeApproved ? "Done" : "Pending"}</span>
           </div>
            </> : <></>
           }
      </div>
    </div>
  )
}

export default LoadChange
