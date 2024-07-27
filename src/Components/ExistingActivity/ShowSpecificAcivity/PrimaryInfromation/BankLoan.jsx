import { useContext } from "react";
import TrackSolarContext from "../../../../Context/TrackSolarContext/TrackSolarContext";


const BankLoan = () => {
    const {trackSolarData} = useContext(TrackSolarContext);
  return (
    <div>
        <h3 className="m-2">Bank Loan </h3>
      <div>
            Bank Loan : {trackSolarData?.BankLoan ? "Yes" : "No"} <br />
           Documents :  {
                trackSolarData?.BankLoan ? 
                trackSolarData?.BankLoanDocuments.map((ele,index)=>(
                    <li className="ml-2" key={ele+index}>{ele}</li>
                ))                
                :<></>
            }
      </div>
    </div>
  )
}

export default BankLoan
