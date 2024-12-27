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
import { useLocation, useSearchParams } from "react-router-dom";



const ShowAcivity = () => {
  const headerData = ["Sr.No","Date","Consumer Name","Consumer Mobile No","Bill Unit","Consumer Number","PV Number","MNRE Number","Option"]

  const [trackData, setTrackData] = useState([]);
  const [trackDataDoublicate, setTrackDataDoublicate] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  // const featchedLastData = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  const { allTrack } = useContext(AllTrackContext);

  const tableRef = useRef(null);

  const [enable, setEnable] = useState(false);


  const [searchParams, setSearchParam] = useSearchParams();

  // Retrieve values from query parameters
  const sortBy = searchParams.get('sortby');
  const isDone = searchParams.get('isdone') === 'true';
  const [selectedValue, setSelectedValue] = useState(''); // Track selected value
  const [selectedOptgroupLabel, setSelectedOptgroupLabel] = useState(''); // Track selected optgroup label

  useEffect(() => {
    
    if (sortBy && isDone) {
      setSelectedOptgroupLabel(sortBy);  // Set the label of the optgroup
      setSelectedValue(isDone);  // Set the selected value (true/false)
    }
  }, [isDone, searchParams, sortBy]); 

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
  useEffect(() => {
    if (user?.companyID && data) {
      setTrackData(data)
      setTrackDataDoublicate(data)
    }
  }, [user, allTrack, data])

  useEffect(() => {
    trackData[0]?.data && setIsLoading(false);
  }, [trackData])

  // for search
  useEffect(() => {
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

  }, [searchQuery, setSearchQuery, trackData])

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
      let paymentHeaders = ["Consumer Name", "Bank Holder Name", "Bank Name", "Bank Account Number", "IFSC Code", "Total Amount", "Is Subsidy Cheque", "Subsidy Cheque Amount"];
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
            row.push(firestore.formatTimestamp(installments[i].Date), installments[i].Amount, installments[i].PaymentMedium);
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
      if (user?.jobProfile === "Admin" && user?.verified) {
        paymentWs = XLSX.utils.aoa_to_sheet(paymentDataArray);
      }

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, allWs, 'All Information');
      if (user?.jobProfile === "Admin" && user?.verified) {
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

  useEffect(() => {
    console.log("Name : ", searchParams.size);
    if(searchParams.size === 0){
      setTrackDataDoublicate(
        trackData.filter(item =>
          item?.data?.ConsumerName
        )
      )
    }
    if (sortBy === "Enquiry No") {
    if(isDone){
      setTrackDataDoublicate(
        trackData.filter(item =>
          item?.data?.ConsumerName
        )
      )
    } else{
      setTrackDataDoublicate(
        trackData.filter(item =>
          item?.data?.PrimaryInfromation?.isDone === false
        )
      )
    }
    }

    if (sortBy === "Site work") {
      if(isDone){
        setTrackDataDoublicate(
          trackData.filter(item =>
            item?.data?.SiteWorkInfromation?.isDone === true
          )
        )
      } else{
        setTrackDataDoublicate(
          trackData.filter(item =>
            item?.data?.SiteWorkInfromation?.isDone === false
          )
        )
      }
    }

    if (sortBy === "Inspection" ) {
     if(isDone){
      setTrackDataDoublicate(
        trackData.filter(item =>
          item?.data?.InspectionInfromation?.isDone === true
        )
      )
     } else{
      setTrackDataDoublicate(
        trackData.filter(item =>
          item?.data?.InspectionInfromation?.isDone === false
        )
      )
     }
    }

    if (sortBy === "Meter Installation" ) {
      if(isDone){
        setTrackDataDoublicate(
          trackData.filter(item =>
            item?.data?.MeterInfromation?.isDone === true
          )
        )
      } else{
        setTrackDataDoublicate(
          trackData.filter(item =>
            item?.data?.MeterInfromation?.isDone === false
          )
        )
      }
    }

    if (sortBy === "NSC Approved" ) {
      if(isDone){
        setTrackDataDoublicate(
          trackData.filter(item =>
            item?.data?.NetMeteringInfromation?.isDone === true
          )
        )
      } else{
        setTrackDataDoublicate(
          trackData.filter(item =>
            item?.data?.NetMeteringInfromation?.isDone === false
          )
        )
      }
    }

    if (sortBy === "Subsidy" ) {
      if(isDone){
        setTrackDataDoublicate(
          trackData.filter(item =>
            item?.data?.SubsidyInfromation?.isDone === true
          )
        )
      } else{
        setTrackDataDoublicate(
          trackData.filter(item =>
            item?.data?.SubsidyInfromation?.isDone === false
          )
        )
      }
    }
  }, [sortBy, isDone, trackData, searchParams.size])

  return (
    <div className="w-full mt-20">
      <div className=" bg-white sm:flex m-3  justify-between items-center">

        <div className="w-full">
          <input
            className="border border-[#111111] rounded-full p-2 w-full sm:w-[300px] placeholder:text-gray-950 "
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value) }} />
        </div>

        {/* Iner */}
        <div className="flex">

          <div className="flex  gap-2 w-[800px] justify-center items-center  p-1">
            <p>Sort by : {
              selectedOptgroupLabel ? selectedOptgroupLabel+" "+`${selectedValue === true ? 'Done' : 'Pending'}` : ''
              }</p>
            <select className="border text-base rounded-md p-1 gap-3" 
            onChange={(e) => {
              const selectedValue = e.target.value; // Get the value of the selected option
              const optgroupLabel = e.target.options[e.target.selectedIndex].parentNode.label; // Get the label of the parent <optgroup>
              const newParams = new URLSearchParams(searchParams);
              if (selectedValue === undefined || selectedValue === '' ||
                optgroupLabel === undefined || optgroupLabel === ''
              ) {
                // Clear the search parameters if selectedValue is undefined or empty
                setSearchParam({});
              } else {
                newParams.set('sortby', `${optgroupLabel}`);
                newParams.set('isdone', `${selectedValue}`);
                setSearchParam(newParams)
              }
              setSelectedOptgroupLabel(optgroupLabel);  // Update the optgroup label
              setSelectedValue(selectedValue);
            }} name="Filter" id="filter" >
              <option value="Select">Select...</option>
              <optgroup label="Enquiry No">
                <option value="true">Done</option>
                <option value="false">Pending</option>
              </optgroup>
              <optgroup label="Site work">
                <option value="true">Done</option>
                <option value="false">Pending</option>
              </optgroup>
              <optgroup label="Site work">
                <option value="true">Done</option>
                <option value="false">Pending</option>
              </optgroup>
              <optgroup label="Inspection">
                <option value="true">Done</option>
                <option value="false">Pending</option>
              </optgroup>
              <optgroup label="Meter Installation">
                <option value="true">Done</option>
                <option value="false">Pending</option>
              </optgroup>
              <optgroup label="NSC Approved">
                <option value="true">Done</option>
                <option value="false">Pending</option>
              </optgroup>
              <optgroup label="Subsidy">
                <option value="true">Done</option>
                <option value="false">Pending</option>
              </optgroup>
            </select>
          </div>

          <div className="flex justify-end w-full items-center">
            <div className="cursor-pointer rounded-md bg-black px-2 py-2 flex gap-2 items-center justify-center font-bold text-white text-base" disabled={enable} onClick={exportToExcel}>
              <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em"  >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M7.5 1.05a.45.45 0 01.45.45v6.914l2.232-2.232a.45.45 0 11.636.636l-3 3a.45.45 0 01-.636 0l-3-3a.45.45 0 11.636-.636L7.05 8.414V1.5a.45.45 0 01.45-.45zM2.5 10a.5.5 0 01.5.5V12c0 .554.446 1 .996 1h7.005A.999.999 0 0012 12v-1.5a.5.5 0 011 0V12c0 1.104-.894 2-1.999 2H3.996A1.997 1.997 0 012 12v-1.5a.5.5 0 01.5-.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Excel</span>
            </div>
          </div>




        </div>

      </div>

      <div className=" max-h-screen h-screen overflow-y-auto ">

        {
          isLoading ?
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 border ">
              <TableHeader headerData={headerData} />
              <TableBodyShimmerUI />
            </table>
            :


            <table ref={tableRef} className="w-full text-sm text-left rtl:text-right text-gray-500 border h-[100px]  overflow-y-scroll ">

              <TableHeader headerData={headerData} />

              {
                trackDataDoublicate.length > 0 ?

                  trackDataDoublicate.map((map, index) => (
                    <TableBody key={map?.id} getData={map?.data} index={index + 1} collectionId={user?.companyID + "TrackSolarData"} />
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
