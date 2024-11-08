import { useContext, useEffect, useMemo, useState } from "react";
import TrackSolarContext from "../../Context/TrackSolarContext/TrackSolarContext";
import UserContext from "../../Context/UserContext/UserContext";

const TrackStipper = ({setShowPage}) => {
    const [processArray,setProcessArray] = useState(["Primary","Application","Site Work","Inspection","Meter Installation","Net Meter ","Subsidy"]);


    const [keyArray,setkeyArray] = useState(["PrimaryInfromation","ApplicationInfromation","SiteWorkInfromation","InspectionInfromation","MeterInfromation","NetMeteringInfromation","SubsidyInfromation"])

    const {trackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);

    useEffect(()=>{
      if((user?.jobProfile === "Admin") && (user?.verified === true)){
        setProcessArray(()=>[...processArray,["Payment"]])
        setkeyArray(()=>[...keyArray,["PaymentInfromation"]])
      }
    },[user])

  return (
    <div className="sticky z-0  inset-0  top-0  w-full overflow-x-scroll xl:overflow-x-hidden scrollbar-hide">
      <ol className="py-4 px-2 flex items-center justify-center w-fit xl:w-full  space-x-2 text-sm font-medium text-center text-gray-500 bg-white  shadow-sm  sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse ">
      {
       
        processArray.map((element,index)=>(
          
          <li key={element} onClick={()=>{setShowPage(index)}} className={`flex items-center cursor-pointer hover:cursor-pointer ${trackSolarData?.[keyArray[index]]?.isDone ? " text-green-500"  : trackSolarData?.[keyArray[index]]?.isDone === false ? "text-blue-500" : " text-red-500"}`}>
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

       {/* <div className=" hidden sm:flex sm:gap-2 sm:border p-2 w-fit">
        <p className="text-gray-500 font-bold">Status : </p>
       <p className="text-green-500">Done</p>
        <p className="text-blue-500">Pending</p>
        <p className="text-red-500">Not fill Yet</p>
       </div> */}

    </div>
  )
}

export default TrackStipper