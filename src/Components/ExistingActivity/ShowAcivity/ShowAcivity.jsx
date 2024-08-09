import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";
import TableHeader from "../Table/TableHeader";
import TableBody from "../Table/TableBody";
import { Timestamp } from "firebase/firestore";
import TableBodyShimmerUI from "../Table/TableBodyShimmerUI";
import AllTrackContext from "../../../Context/AllTrackData/AllTrackContext";

const ShowAcivity = () => {
    const [trackData,setTrackData] = useState([]);
    const [trackDataDoublicate,setTrackDataDoublicate] = useState([]);

    const [searchQuery,setSearchQuery] = useState("");

    // const featchedLastData = useRef([]);
    const [isLoading,setIsLoading] = useState(true);
    const {user} = useContext(UserContext);

    const {allTrack} = useContext(AllTrackContext);

    useEffect(()=>{        
        if(user?.companyID && allTrack){
            setTrackData(allTrack)
            setTrackDataDoublicate(allTrack)
        }
    },[user,allTrack])

    useEffect(()=>{
        trackData[0]?.data && setIsLoading(false) ;
    },[trackData])

    // data featch on scroll
    // const handleFetchMoreData = useCallback(async ()=>{
    //     if(user?.companyID && featchedLastData.current){
    //     const companyID = user?.companyID;
    //     const collection = companyID+"TrackSolarData";
    //     const { data, lastDocs: newLastVisible } = await firestore.getAllData(collection,
    //         featchedLastData.current,trackData);
    //     featchedLastData.current = newLastVisible
    //     setTrackData(data)
    //     setTrackDataDoublicate(data)
    //     setIsLoading(false)
    //     }
    //     return (()=>{
    //         setTrackData([])
    //         setTrackDataDoublicate([])
    //         setIsLoading(true)
    //     })
    // },[ user?.companyID,trackData])

    // useEffect(()=>{ 
    //     handleFetchMoreData()
    // },[handleFetchMoreData])

    // useEffect(() => {
    //     const event =  window.addEventListener('scroll', ()=>{
    //         if ((window.innerHeight + window.scrollY)>= document.body.scrollHeight-10 ){
    //             handleFetchMoreData();
    //         }
    //     });
    //     return () => window.removeEventListener('scroll', event);
    // }, [isLoading,handleFetchMoreData]);
    
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


  return (
    <div className="fixed w-full">
        <div className="">
            
            <input
        className="border p-3 w-fit m-3"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e)=>{setSearchQuery(e.target.value)}} />
            </div>
            
            <div className=" max-h-screen overflow-y-auto ">

            {
                isLoading ?
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 border ">
                <TableHeader />
               <TableBodyShimmerUI />
               </table>
               :

               <table className="w-full text-sm text-left rtl:text-right text-gray-500 border h-[100px]  overflow-y-scroll ">
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
