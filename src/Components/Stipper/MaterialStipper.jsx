import { useContext,} from "react";
import TrackSolarContext from "../../Context/TrackSolarContext/TrackSolarContext";

const MaterialStipper = ({setShowPage}) => {
    const processArray = ["Basic ","Structure ","Electric Fitting ","Concrete "]

    const keyArray = ["isBasicDone","isStructureMaterialDone","isElectric FittingMaterialDone","isConcreteMaterialDone"]

    const {trackSolarData} = useContext(TrackSolarContext);
    console.log("Progress ",trackSolarData);
    

  return (
    <div className="sticky z-0  inset-0  top-0  w-full overflow-x-scroll xl:overflow-x-hidden scrollbar-hide mt-24">
      <ol className="py-4 px-2 flex items-center justify-center w-fit xl:w-full  space-x-2 text-sm font-medium text-center text-gray-500 bg-white   shadow-sm  sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse ">
      {
       
        processArray.map((element,index)=>(
          
          <li key={element} onClick={()=>{setShowPage(index)}}  className={`flex items-center cursor-pointer hover:cursor-pointer 
          ${
            (trackSolarData?.[element.trim()]?.[keyArray[index]] === true) ? " text-green-500"  : " text-black"
           }`}>
            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border  rounded-full shrink-0 ">
            {index+1}
        </span>
        {element}  
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

    </div>
  )
}

export default MaterialStipper
