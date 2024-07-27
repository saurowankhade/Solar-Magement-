import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';

const NameChange = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
  return (
    <div>
        <h3 className='m-2 p-2'>Name change </h3>
      <div>
        Name Change : {trackSolarData?.NameChange ? "Yes":"No"} <br />
        {
            trackSolarData?.NameChange ?
             <>
                E-Bill : {trackSolarData?.NameChangeEBill ? "Yes" : "No"} <br />
                Stamp 1 : {trackSolarData?.NameChangeStampPaper ? "Yes":"No"} <br />
                Death Certificate : {trackSolarData?.NameChangeDeathCertificate ? "Yes" : "No"} <br />
                Pass photo 2 : {trackSolarData?.NameChangePassPhoto ? "Yes" : "No"} <br />
                U-Form : {trackSolarData?.NameChangeUForm ? "Yes" : "No"} <br />
                Document : {trackSolarData?.NameChangeDocuments ? "Yes" : "No"} <br />
                Payment Receipt : {trackSolarData?.NameChangePaymentRecipt ? "Yes" : "No"} <br />
            </> : <></>
        }
      </div>
    </div>
  )
}

export default NameChange
