import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';

const LoadChange = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
  return (
    <div>
        <h3 className='ms-2 '>Load change info.</h3>
      <div>
            Is Load Change : {trackSolarData?.LoadChange ? "Yes" : "No"} <br />

            {
                trackSolarData?.LoadChange ?
                <>
                    E-Bill : {trackSolarData?.LoadChangeDocuments} <br />
                    Application Status : {trackSolarData?.LoadChangeAppliactionStatus ? "Done" : "Pending"} <br />
                    Payment Recipt : {trackSolarData?.LoadChangePaymentRecipt ? "Yes":"No"} <br />
                    Approved : {trackSolarData?.LoadChangeApproved ? "Yes":"No"} <br />
                </>
                : <></>
            }
      </div>
    </div>
  )
}

export default LoadChange
