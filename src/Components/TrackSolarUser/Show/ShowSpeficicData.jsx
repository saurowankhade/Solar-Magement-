import { useLocation } from "react-router-dom";

const ShowSpeficicData = ()=>{
    const location = useLocation();
  const { Id,ConsumerName,ConsumerNumber,ConsumerMobileNumber,
    AreaOfAddress,MNRERegistrationNumber , PVApplicationNumber,
    LoadChange,LoadChangeDocuments,LoadChangeApplicationStatus,LoadChangePaymentRecipt,LoadChangeApproved,
    NameChange,NameChangeDocuments,NameChangeEBill,NameChangePaymentRecipt,NameChangeStampPaper,NameChangeUForm,NameChangePassPhoto,
    Note
   } = location.state || { };


   const retunYesOrNo = (data)=>{
    return data ? "YES" : "NO";
   }

    return(
        <div className="w-fit">
           <div className="border mt-2 p-2 shadow-md">
            <h3 >Consumer Information</h3>
            <div className="ml-2 p-2 ">
            <p>Consumer Name : {ConsumerName}</p>
            <p>Consumer Number : {ConsumerNumber}</p>
            <p>Consumer Mobile Number : {ConsumerMobileNumber}</p>
            <p>Area of address : {AreaOfAddress}</p>
            <p>PV Application No : {PVApplicationNumber}</p>
            <p>MNRE Registration : {MNRERegistrationNumber}</p>
            </div>
           </div>


           <div className="border mt-2 p-2 shadow-md">
            <h3>Load Change Information</h3>
            <div className="ml-2 p-2">
            <p>Load Change :  {retunYesOrNo(LoadChange)}</p>
            {
               LoadChange ? <>
                    <p>Document : {LoadChangeDocuments}</p>
                    <p>Application Status : {retunYesOrNo(LoadChangeApplicationStatus)}</p>
                    {
                      LoadChangeApplicationStatus ?  <p>Payment Recipt : {retunYesOrNo(LoadChangePaymentRecipt)}</p> : <></>
                    }
                    <p>Approved : {retunYesOrNo(LoadChangeApproved)}</p>
                </> :<></>
            }
            </div>
           </div>




           <div className="border mt-2 p-2 shadow-md">
            <h3>Name Change Information</h3>
            <div className="ml-2 p-2">
            <p>Name Change : {retunYesOrNo(NameChange)}</p>
            {
                NameChange ? 
                <>
                    <p>Documents : {NameChangeDocuments}</p>
                    <p>Stamp Paper : {retunYesOrNo(NameChangeStampPaper)}</p>
                    <p>U Form : {retunYesOrNo(NameChangeUForm)}</p>
                    <p>Pass Photo 2 of Consumer : {retunYesOrNo(NameChangePassPhoto)}</p>
                    <p>Electricity Bill : {retunYesOrNo(NameChangeEBill)}</p>
                    <p>Payment Recipt : {retunYesOrNo(NameChangePaymentRecipt)}</p>
                </> : <></>
            }
            </div>
           </div>

           {
            Note ? 
            <div className="border mt-2 p-2 shadow-md">
            <h3 >Addtional  Information</h3>
            <div className="ml-2 p-2 ">
                <p>Note : {Note}</p>
            </div>
           </div> : <></>
           }



           <div>
            Track User : -&gt;
           </div>


        </div>
    )
}

export default ShowSpeficicData