import  { useContext } from 'react'
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import WhoAddData from '../WhoAddData/WhoAddData';


const Meter = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
    const {MeterTestingCall,SubmitMeter,MeterTestReport,ReleaseLetterMeterInstall,MeterInfromation} = trackSolarData
    return (
    <div>
<WhoAddData date={MeterInfromation?.createdAt} user={MeterInfromation?.createdBy} />
     

       <div className="flex justify-center">
      <div className="p-2  shadow-md border  w-[700px] ">
      <h3 className="text-center text-xl underline">Meter Installation Data</h3>
          
           <div className="mt-2">
            <span className="text-base font-bold">Meter testing call : </span> 
            <span className={`${MeterTestingCall ? "text-blue-800" : "text-red-800"}`}>{MeterTestingCall ? "Done" : "Pending"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">Meter test -&gt; submit meter : </span> 
            <span className={`${SubmitMeter ? "text-blue-800" : "text-red-800"}`}>{SubmitMeter ? "Done" : "Pending"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">Get Meter test report : </span> 
            <span className={`${MeterTestReport ? "text-blue-800" : "text-red-800"}`}>{MeterTestReport ? "Done" : "Pending"}</span>
           </div>

           <div className="mt-2">
            <span className="text-base font-bold">Release leter / Meter Installation : </span> 
            <span className={`${ReleaseLetterMeterInstall ? "text-blue-800" : "text-red-800"}`}>{ReleaseLetterMeterInstall ? "Done" : "Pending"}</span>
           </div>
           
      </div>
    </div>
  </div>
    )
}

export default Meter
