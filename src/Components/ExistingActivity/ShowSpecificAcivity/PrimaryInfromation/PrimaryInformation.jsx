import { useContext } from "react";
// import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";
import MainData from "./MainData";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";
import LoadChange from "./LoadChange";
import NameChange from "./NameChange";
import BankLoan from "./BankLoan";
import firestore from "../../../../Firebase/Firestore";

const PrimaryInformation = () => {
    const {trackSolarData} = useContext(TrackSolarContext);

 
  return (
    <div>
      Primary information
      Date : {firestore.formatTimestamp(trackSolarData?.PrimaryInfromationDate)}
      <MainData />
      <LoadChange />
      <NameChange />
      <BankLoan />
    </div>
  )
}

export default PrimaryInformation
