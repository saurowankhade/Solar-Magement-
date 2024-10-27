import { useContext, useEffect, useRef, useState } from "react"
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";
import TableHeader from "../Table/TableHeader";
import TableBody from "../Table/TableBody";
import TableBodyShimmerUI from "../Table/TableBodyShimmerUI";
import AllTrackContext from "../../../Context/AllTrackData/AllTrackContext";

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Import xlsx
import { useFirestoreDocuments } from "../../../useFirestoreDocuments/useFirestoreDocuments";
import { useLocation } from "react-router-dom";

import exportExcel from '../../../assets/export-excel.svg'


const ShowAcivity = () => {
    const [trackData,setTrackData] = useState([]);
    const [trackDataDoublicate,setTrackDataDoublicate] = useState([]);

    const [searchQuery,setSearchQuery] = useState("");

    // const featchedLastData = useRef([]);
    const [isLoading,setIsLoading] = useState(true);
    const {user} = useContext(UserContext);

    const {allTrack} = useContext(AllTrackContext);
    
    const tableRef = useRef(null);

    const [enable,setEnable] = useState(false);


    const navigateFilter = useLocation();
    const {name,index} = navigateFilter.state || {}

    // useEffect(()=>{
    //   if(user?.companyID){
    //     firestore.getAllDocuments(user?.companyID+"TrackSolarData")
    //     .then((status)=>{
    //       setIsLoading(false)
    //       if(status?.status === 200){
    //         setTrackData(status?.data)
    //         setTrackDataDoublicate(status?.data)
    //       }
    //     })
    //   }
    // },[user])
    const { data } = useFirestoreDocuments("SolarData");
    useEffect(()=>{       
        if(user?.companyID && data){
            setTrackData(data)
            setTrackDataDoublicate(data)
        }
    },[user,allTrack,data])

    useEffect(()=>{
        trackData[0]?.data && setIsLoading(false) ;
    },[trackData])
    
    // for search
    useEffect(()=>{
        setTrackDataDoublicate(
            trackData.filter(item =>
                item?.data?.ConsumerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.data?.ConsumerNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.data?.ConsumerMobileNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.data?.MNREApplicationNumber?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item?.data?.PVApplicationNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.data?.BillUnit?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                firestore.formatTimestamp(item?.data?.CreatedAt).toLowerCase().includes(searchQuery.toLowerCase())
            )    
          );  

    },[searchQuery,setSearchQuery,trackData])  
    
    const exportToExcel = () => {
      if (trackDataDoublicate) {
        setEnable(true);
        setTimeout(() => {
          setEnable(false);
        }, 2000);
    
        const allFields = ["CreatedAt", "ConsumerName", "ConsumerMobileNumber", "RequiredSystemKW", "ConsumerAddress", "BillUnit", "ConsumerNumber", "MNREApplicationNumber", "PVApplicationNumber", "BankName", "ConsumerAccountNumber", "IFSCCode", "LoadChange", "NameChange", "BankLoan"];
        
        // const paymentFields = ["ConsumerName", "BankName", "ConsumerAccountNumber", "IFSCCode", "SubsidyCheque", "SubsidyChequeAmount", "Installament"];
    
        const allHeaders = ["Created At", "Consumer Name", "Consumer Mobile Number", "Required System in KW", "Consumer Address", "Bill Unit", "Consumer Number", "MNRE Number", "PV Number", "Bank Name", "Bank Account Number", "ISFC Code", "Is Load Change", "Is Name Change", "Is Bank Loan"];
    
        // Find the maximum number of installments
        const maxInstallments = Math.max(...trackDataDoublicate.map(item => item?.data?.Installament?.length || 0));
    
        // Generate headers for installments dynamically
        let paymentHeaders = ["Consumer Name","Bank Holder Name", "Bank Name", "Bank Account Number", "IFSC Code","Total Amount", "Is Subsidy Cheque", "Subsidy Cheque Amount"];
        for (let i = 1; i <= maxInstallments; i++) {
          paymentHeaders.push(`Installment ${i} Date`, `Installment ${i} Amount`, `Installment ${i} Medium`);
        }
        paymentHeaders.push('Balance');
        paymentHeaders.push('Remark');
    
        const formatBoolean = (value) => {
          return value ? "Yes" : "No";
        };
    
        const allRows = trackDataDoublicate.map(item =>
          allFields.map(field => {
            const value = item?.data?.[field];
            if (field === "CreatedAt") {
              return firestore.formatTimestamp(value); // Format timestamp
            } else if (["LoadChange", "NameChange", "BankLoan"].includes(field)) {
              return formatBoolean(value); // Format boolean
            } else {
              return value; // Convert other values to string
            }
          })
        );
    
        const paymentRows = trackDataDoublicate.map(item => {
          const row = [
            item?.data?.ConsumerName,
            item?.data?.BankHolderName,
            item?.data?.BankName,
            item?.data?.ConsumerAccountNumber,
            item?.data?.IFSCCode,
            item?.data?.TotalAmount,
            formatBoolean(item?.data?.SubsidyCheque),
            item?.data?.SubsidyChequeAmount,
          ];
    
          const installments = item?.data?.Installament || [];
          for (let i = 0; i < maxInstallments; i++) {
            if (installments[i]) {
              row.push(firestore.formatTimestamp(installments[i].Date), installments[i].Amount,installments[i].PaymentMedium);
            } else {
              row.push('', '', ''); // Empty columns if there are fewer installments
            }
          }
          row.push(item?.data?.BalanceAmount)
          row.push(item?.data?.Remark)
          return row;
        });
    
        const allDataArray = [allHeaders, ...allRows];
        const paymentDataArray = [paymentHeaders, ...paymentRows];
    
        const allWs = XLSX.utils.aoa_to_sheet(allDataArray);
        let paymentWs = ''
        if(user?.jobProfile === "Admin" && user?.verified){
          paymentWs = XLSX.utils.aoa_to_sheet(paymentDataArray);
        }
    
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, allWs, 'All Information');
        if(user?.jobProfile === "Admin" && user?.verified){
          XLSX.utils.book_append_sheet(wb, paymentWs, 'Payment Information');
        }
    
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const reader = new FileReader();
        reader.onloadend = function () {
          const base64data = reader.result.split(',')[1]; // Get only the base64 data
          const fileName = `Solar_Consumer_List_${new Date().toISOString()}.xlsx`;
          if (window.AndroidDownloader) {
            window.AndroidDownloader.downloadFile(base64data, fileName);
          } else {
            saveAs(blob, fileName);
          }
        };
        reader.readAsDataURL(blob);
      }
    };

    useEffect(()=>{     
      if(name === "Enquiry No" && index === 0){
        setTrackDataDoublicate(
          trackData.filter(item => 
            item?.data?.ConsumerName
          )
        )
      }
      if(name === "Site Work Done" && index === 1){
        setTrackDataDoublicate(
          trackData.filter(item => 
            item?.data?.SiteWorkInfromation?.isDone === true
          )
        )
      } 
      if(name === "Inspection No" && index === 2){
        setTrackDataDoublicate(
          trackData.filter(item => 
            item?.data?.InspectionInfromation?.isDone === true
          )
        )
      } 
      if(name === "Meter Installation" && index === 3){
        setTrackDataDoublicate(
          trackData.filter(item => 
            item?.data?.MeterInfromation?.isDone === true
          )
        )
      } 
      if(name === "NSC Approved" && index === 4){
        setTrackDataDoublicate(
          trackData.filter(item => 
            item?.data?.NetMeteringInfromation?.isDone === true
          )
        )
      } 
      if(name === "Subsidy" && index === 5){
        setTrackDataDoublicate(
          trackData.filter(item => 
            item?.data?.SubsidyInfromation?.isDone === true
          )
        )
      } 
    },[name,index,trackData])

  return (
    <div className="w-full">
        <div className=" bg-white flex m-3 ">
            
           <div className="w-full">
           <input
        className="border border-[#111111] rounded-full p-4 w-full placeholder:text-gray-950 "
        type="text"
        placeholder="Search here.."
        value={searchQuery}
        onChange={(e)=>{setSearchQuery(e.target.value)}} />
           </div>

          <div className="flex justify-end w-full">
          <button className="rounded-lg bg-green-800 px-4 text-white text-base" disabled={enable} onClick={exportToExcel}>
            Excel 
          </button>
          </div>
            
            </div>

            <div className=" max-h-screen h-screen overflow-y-auto ">

            {
                isLoading ?
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 border ">
                <TableHeader />
               <TableBodyShimmerUI />
               </table>
               :

               
               <table ref={tableRef} className="w-full text-sm text-left rtl:text-right text-gray-500 border h-[100px]  overflow-y-scroll ">
               
               <TableHeader />
               {
                console.log("Data : ",trackDataDoublicate )
                
               }
               {
           trackDataDoublicate.length > 0 ?
         
           trackDataDoublicate.map((map,index)=>(
               <TableBody key={map?.id} getData={map?.data} index={index+1}  collectionId={user?.companyID+"TrackSolarData"}/>
           ))
           : 
           <tbody className="w-full border-b">
           <tr className="bg-gray-50 mt-2 cursor-pointer">
           <th scope="row" colSpan="7" className="px-6 py-4 border text-center">
                  Oops !!! Data not found
               </th>   
           </tr>  
       </tbody>
       
       }
                 </table>
       
            }
            </div>
            
      
       
    </div>
  )
}

export default ShowAcivity
