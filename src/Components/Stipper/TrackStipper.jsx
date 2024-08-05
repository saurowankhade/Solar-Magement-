import { useContext } from "react";
import TrackSolarContext from "../../Context/TrackSolarContext/TrackSolarContext";

const TrackStipper = ({setShowPage}) => {
    const processArray = ["Primary","Application","Site Work","Inspection","Meter Installation","Net Meter Aggrement","Subsidy"]
    const keyArray = ["PrimaryInfromation","ApplicationInfromation","SiteWorkInfromation","InspectionInfromation","MeterInfromation","NetMeteringInfromation","SubsidyInfromation"]

    const {trackSolarData} = useContext(TrackSolarContext);

  return (
    <ol className="flex items-center justify-center w-fit p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm  sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse ">
      {
       
        processArray.map((element,index)=>(
          <li onClick={()=>{setShowPage(index)}} key={element} className={`flex items-center cursor-pointer ${trackSolarData?.[keyArray[index]]?.isDone ? " text-green-500" : trackSolarData?.[keyArray[index]]?.isDone === false ? "text-blue-500" : " text-red-500"}`}>
    <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border  rounded-full shrink-0 ">
            {index+1}
        </span>
        {element}  <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        {
            processArray.length-1 !=index ? 
            <svg className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
        </svg> : <></>
        }
</li>
        ))
      }
</ol>
  )
}

export default TrackStipper
