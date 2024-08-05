import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';

const NameChange = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {NameChange,NameChangeEBill,NameChangeStampPaper,NameChangeDeathCertificate,NameChangePassPhoto,NameChangeUForm,NameChangeDocuments,NameChangePaymentRecipt} = trackSolarData;
  return (
    <div className="flex justify-center">
      <div className="p-2  shadow-md border  w-[700px]  ">
      <h3 className="text-center text-xl underline">Name Change Data</h3>
          <div className="mt-2">
            <span className="text-base font-bold">Name Change : </span>
            <span className="text-blue-800">{NameChange ? "Yes" : "No"}</span>
          </div>
          
          {
            NameChange ? <div>
              <div className="mt-2">
            <span className="text-base font-bold">E-Bill : </span> 
            <span className={`${NameChangeEBill ? " text-blue-800" : " text-red-800"}`}>{NameChangeEBill ? "Yes" : "No"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">Stamp Paper : </span> 
            <span className={`${NameChangeStampPaper ? " text-blue-800" : " text-red-800"}`}>{NameChangeStampPaper ? "Yes" : "No"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">Dead Certificate : </span> 
            <span className={`${NameChangeDeathCertificate ? " text-blue-800" : " text-red-800"}`}>{NameChangeDeathCertificate ? "Yes" : "No"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">Pass Photo 2 : </span> 
            <span className={`${NameChangePassPhoto ? " text-blue-800" : " text-red-800"}`}>{NameChangePassPhoto ? "Yes" : "No"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">U-Form : </span> 
            <span className={`${NameChangeUForm ? " text-blue-800" : " text-red-800"}`}>{NameChangeUForm ? "Yes" : "No"}</span>
           </div>


           <div className="mt-2">
            <span className="text-base font-bold">Documents : </span> 
            <span className={`${NameChangeDocuments ? " text-blue-800" : " text-red-800"}`}>{NameChangeDocuments}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">Payment Recipt : </span> 
            <span className={`${NameChangePaymentRecipt ? " text-blue-800" : " text-red-800"}`}>{NameChangePaymentRecipt ? "Yes" : "No"}</span>
           </div>
            </div>
            : <></>
          }
           
      </div>
    </div>
  )
}

export default NameChange
