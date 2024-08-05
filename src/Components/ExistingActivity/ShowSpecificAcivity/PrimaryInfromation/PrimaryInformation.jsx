
import MainData from "./MainData";
import LoadChange from "./LoadChange";
import NameChange from "./NameChange";
import BankLoan from "./BankLoan";
import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";
import firestore from "../../../../Firebase/Firestore";
import WhoAddData from "../WhoAddData/WhoAddData";

const PrimaryInformation = () => {
  
  const {trackSolarData} = useContext(TrackSolarContext);
  const {PrimaryInfromation} = trackSolarData
  return (
    <div>
      {/* <div className="flex justify-center">
      <div className="p-2  shadow-md border  w-[700px]  ">
      <h3 className="text-center text-xl underline">Who added this</h3>
          <div className="mt-2">
            <span className="text-base font-bold">Date : </span>
            <span className="text-blue-800">{firestore.formatTimestamp(PrimaryInfromation?.createdAt)}</span>
          </div>
           <div className="mt-2">
            <span className="text-base font-bold">Created By : </span> 
            <span className="text-blue-800">{PrimaryInfromation?.createdBy?.name}</span>
           </div>
      </div>
    </div> */}
      <WhoAddData date={PrimaryInfromation?.createdAt} user={PrimaryInfromation?.createdBy} />
      <MainData />
      <LoadChange />
      <NameChange />
      <BankLoan />
    </div>
  )
}

export default PrimaryInformation
