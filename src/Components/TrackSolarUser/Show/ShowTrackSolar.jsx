import { useContext, useEffect, useState } from "react"
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";
import { toast } from "react-toastify";
import ShowOneTrackData from "./ShowOneTrackData";
import TableUi from "../../ShimmerUI/TableUi";
import { v4 } from "uuid";

const ShowTrackSolar = ()=>{
    const [trackData,setTrackData] = useState([]);
    const {user} = useContext(UserContext);
    useEffect(()=>{
        const companyID = user?.companyID;
        const collection = companyID+"TrackSolarData";
        const data = firestore.getAllDocuments(collection);
        data.then((sinData)=>{
            
            setTrackData(sinData)
        }).catch((error)=>{
            toast.error(error.message);
        })
    },[user])

    return (
        
        <>

        {
            trackData.length === 0 ? <>
             <thead className="w-full text-base text-gray-700 uppercase bg-gray-50 border-b-2 sticky ">
            <tr>
                <th scope="col" className="py-3 px-3 text-center border ">
                    PV Application Number
                </th>
                <th scope="col" className="py-3  px-3 text-center  border ">
                    MNRE Registration Number
                </th>
                <th scope="col" className="py-3  px-3 text-center  border ">
                    Consumer Name
                </th>
                <th scope="col" className="py-3 px-3  text-center  border ">
                    Consumer Number
                </th>
                <th scope="col" className="py-3 px-3  text-center  border ">
                    Consumer Mobile No
                </th>
                <th scope="col" className="py-3 px-3  text-center  border ">
                    Area of Address
                </th>
                <th scope="col" className="py-3 px-3  text-center  border ">
                    Options
                </th>
            </tr>
        </thead>


        <TableUi key={v4()} />
            
            </>
            :
            <>

        {
            console.log(trackData)
        }
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
        <thead className="w-full text-base text-gray-700 uppercase bg-gray-50 border-b-2 sticky ">
            <tr>
                <th scope="col" className="py-3 px-3 text-center border sticky top-0 z-10 bg-gray-50">
                    PV Application Number
                </th>
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    MNRE Registration Number
                </th>
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    Consumer Name
                </th>
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    Consumer Number
                </th>
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    Consumer Mobile No
                </th>
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    Area of Address
                </th>
                <th scope="col" className="py-3 text-center w-fit border sticky top-0 z-10 bg-gray-50">
                    Options
                </th>
            </tr>
        </thead>

        {
            
            trackData.map((map)=>(
                <>
                {/* console.log(map.data) */}
                <ShowOneTrackData key={map?.id} getData={map?.data} collectionId={user?.companyID+"TrackSolarData"}/>
                </>
            ))
       }


      

    </table>
        
        </>
        }
        
        
        
        
        </>
        
    )
}
export default ShowTrackSolar