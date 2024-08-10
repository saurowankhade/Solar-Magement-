import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";
import TableHeader from "../Table/TableHeader";
import TableBody from "../Table/TableBody";
import { Timestamp } from "firebase/firestore";
import TableBodyShimmerUI from "../Table/TableBodyShimmerUI";
import AllTrackContext from "../../../Context/AllTrackData/AllTrackContext";

import { DownloadTableExcel } from 'react-export-table-to-excel';


import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'; // Import xlsx


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

    useEffect(()=>{        
        if(user?.companyID && allTrack){
          
            setTrackData(allTrack)
            setTrackDataDoublicate(allTrack)
        }
    },[user,allTrack])

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
                firestore.formatTimestamp(item?.data?.CreatedAt).toLowerCase().includes(searchQuery.toLowerCase())
            )    
          );  

    },[searchQuery,setSearchQuery,trackData])      

    const exportToExcel = () => {
           if(trackDataDoublicate){
            setEnable(true)
            setTimeout(()=>{
                setEnable(false)
            },2000)
            const fields = ["CreatedAt", "ConsumerName", "ConsumerMobileNumber","RequiredSystemKW","ConsumerAddress","BillUnit", "ConsumerNumber","MNREApplicationNumber", "PVApplicationNumber", "LoadChange", "NameChange", "BankLoan"];

            // Convert data to 2D array with only specified fields
            const headers = fields;
            const formatBoolean = (value) => {
                return value ? "Yes" : "No";
              };
          
              // Convert data to 2D array with only specified fields and format data
              const rows = trackDataDoublicate.map(item => 
                fields.map(field => {
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
          
            // Add headers as the first row
            const dataArray = [headers, ...rows];
        
            // Convert array to worksheet
            const ws = XLSX.utils.aoa_to_sheet(dataArray);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Consumer Data');
    
          // Create a binary Excel file and trigger download
          const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const reader = new FileReader();
        reader.onloadend = function () {
            const base64data = reader.result.split(',')[1]; // Get only the base64 data
            const fileName = `Solar_Consumer_List_${new Date().toISOString()}.xlsx`;
            if (window.AndroidDownloader) {
                window.AndroidDownloader.downloadFile(base64data, fileName);
            } else{
                saveAs(blob,fileName)
            }
        };
        reader.readAsDataURL(blob);
        //   saveAs(blob, `Solar Consumer List ${new Date().toISOString()}.xlsx`); // Use .xlsx extension for Excel files
        
        }
      };

  return (
    <div className="fixed w-full">
        <div className=" flex flex-wrap justify-between m-3">
            
            <input
        className="border p-3 w-fit"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e)=>{setSearchQuery(e.target.value)}} />

                <button className="border rounded-full bg-green-800 px-5 text-white" disabled={enable} onClick={exportToExcel}> Export excel </button>
            
            </div>

            <div className=" max-h-screen overflow-y-auto ">

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
           trackDataDoublicate.length > 0 ?
         
           trackDataDoublicate.map((map)=>(
               <TableBody key={map?.id} getData={map?.data} collectionId={user?.companyID+"TrackSolarData"}/>
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
