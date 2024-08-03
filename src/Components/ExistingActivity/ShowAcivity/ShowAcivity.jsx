import { useCallback, useContext, useEffect, useRef, useState } from "react"
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

    const featchedLastData = useRef([]);
    const [isLoading,setIsLoading] = useState(true);
    const {user} = useContext(UserContext);

    // useEffect(()=>{
    //     if(user?.companyID){
    //     const companyID = user?.companyID;
    //     const collection = companyID+"TrackSolarData";
    //     console.log(collection);
    //     const data = firestore.getAllDocuments(collection);
    //     data.then((sinData)=>{
    //         setTrackData(sinData)
    //         setTrackDataDoublicate(sinData);
    //         setIsLoading(false);
    //         })
    //     .catch((error)=>{
    //         toast.error(error.message);
    //     })
    //     }
    // },[user])

    const handleFetchMoreData = useCallback(async ()=>{
        if(user?.companyID ){
        // setIsLoading(true)
        const companyID = user?.companyID;
        const collection = companyID+"TrackSolarData";
        const { data, lastDocs: newLastVisible } = await firestore.getAllData(collection,featchedLastData.current,trackData);
        featchedLastData.current = newLastVisible
        console.log("New data : ",data);
        setTrackData(data)
        setTrackDataDoublicate(data)
        setIsLoading(false)
        }
    },[ trackData,user?.companyID])

    useEffect(()=>{
        handleFetchMoreData()
    },[handleFetchMoreData])

    useEffect(()=>{
        setTrackDataDoublicate(
            trackData.filter(item =>
                item?.data?.ConsumerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.data?.ConsumerNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.data?.ConsumerMobileNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item?.data?.MNREApplicationNumber?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                item?.data?.PVApplicationNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                firestore.formatTimestamp(item?.data?.PrimaryInfromationDate).toLowerCase().includes(searchQuery.toLowerCase())
            )
          );

    },[searchQuery,setSearchQuery,trackData])

    useEffect(() => {
       const event =  window.addEventListener('scroll', ()=>{
            if ((window.innerHeight + window.scrollY)>= document.body.scrollHeight-5 && !isLoading ){
                handleFetchMoreData();
            }
        });
        return () => window.removeEventListener('scroll', event);
      }, [isLoading,handleFetchMoreData]);


  return (
    <div>
        <div>
            {
                console.log("Last docs in show : ",featchedLastData.current)
            }
            <input
        className="border p-3 w-fit m-3"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e)=>{setSearchQuery(e.target.value)}} />
            </div>
            {
                console.log("data : ",trackData)
            }

            {
                isLoading ?
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
