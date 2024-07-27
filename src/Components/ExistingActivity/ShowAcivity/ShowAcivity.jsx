import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";
import TableHeader from "../Table/TableHeader";
import TableBody from "../Table/TableBody";
import { Timestamp } from "firebase/firestore";
import TableBodyShimmerUI from "../Table/TableBodyShimmerUI";

const ShowAcivity = () => {
    const [trackData,setTrackData] = useState([]);
    const [trackDataDoublicate,setTrackDataDoublicate] = useState([]);

    const [searchQuery,setSearchQuery] = useState("");

    const {user} = useContext(UserContext);
    useEffect(()=>{
        const companyID = user?.companyID;
        const collection = companyID+"TrackSolarData";
        const data = firestore.getAllDocuments(collection);
        data.then((sinData)=>{
            setTrackData(sinData)
            setTrackDataDoublicate(sinData);
       }).catch((error)=>{
            toast.error(error.message);
        })
    },[user])

    function formatTimestamp(timestamp) {
        if (timestamp instanceof Timestamp) {
          return timestamp.toDate().toLocaleDateString(); // Or any other format you prefer
        }
        return ''; // Return empty string if not a valid timestamp
      }

    useEffect(()=>{
        setTrackDataDoublicate(
            trackData.filter(item =>
                item?.data?.ConsumerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.data?.ConsumerNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.data?.ConsumerMobileNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.data?.MNREApplicationNumber?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item?.data?.PVApplicationNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                formatTimestamp(item?.data?.PrimaryInfromationDate).toLowerCase().includes(searchQuery.toLowerCase())
            )
          );

    },[searchQuery,setSearchQuery,trackData])

  return (
    <div>
        <div>
            <input
        className="border p-3 w-fit m-3"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e)=>{setSearchQuery(e.target.value)}} />
            </div>

            {
                trackData.length === 0 ?
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
                <TableHeader />
               <TableBodyShimmerUI />
               </table>
               :

               <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
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
  )
}

export default ShowAcivity
