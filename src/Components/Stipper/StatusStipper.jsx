import { useContext } from "react";
import { useEffect, useState } from "react";
import TrackSolarContext from "../../Context/TrackSolarContext/TrackSolarContext";
import UserContext from "../../Context/UserContext/UserContext";

const StatusStipper = ({setShowPage,showPage}) => {
    const [processArray,setProcessArray] = useState(["Primary","Application","Site Work","Inspection","Meter Install","NSC","Subsidy"]);

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
        <div className={`sticky text-black bg-white  top-0 bottom-0 flex md:justify-center items-start md:flex-col bg-[rgba(217, 217, 217, 0.27)]  shadow-sm md:w-[250px]   rounded-sm h-fit overflow-x-scroll xl:overflow-x-hidden scrollbar-hide md:ml-10  w-full`}>
            {
                processArray.map((title,index)=>(
                    <div key={`${title+index}`} onClick={()=>{setShowPage(index)}} 
                     className={` flex justify-center text-center items-center gap-4 p-6  cursor-pointer group text-black 
                    `}>
                    <svg width="30" height="30" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.003 17.4667V19C37.0009 22.594 35.805 26.0911 33.5935 28.9697C31.3821 31.8483 28.2736 33.9541 24.7318 34.9732C21.19 35.9922 17.4045 35.8698 13.94 34.6243C10.4754 33.3788 7.51746 31.0768 5.50722 28.0618C3.49697 25.0467 2.54216 21.4801 2.78517 17.8939C3.02819 14.3076 4.45601 10.8939 6.8557 8.16179C9.25539 5.4297 12.4984 3.52564 16.101 2.73357C19.7036 1.94151 23.4728 2.30389 26.8464 3.76667M37.003 5.66667L19.8756 22.35L14.7373 17.35" stroke={`${trackSolarData?.[keyArray[index]]?.isDone ? " #48F504"  : trackSolarData?.[keyArray[index]]?.isDone === false ? "rgba(89, 248, 26, 0.38)" : " #A9A8A8"}`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Stroke color green : #48F504 , lightgreen :rgba(89, 248, 26, 0.38)
                         gray: #A9A8A8 */}
                    </svg>
    
                    <span className={`text-sm md:text-base group-hover:translate-x-2 transform transition-transform duration-300 ease-in-out `}>{title}</span>
                </div>
                ))
            }
        </div>
    )
}

export default StatusStipper
