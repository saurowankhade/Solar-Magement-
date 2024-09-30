import { useCallback, useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";
import AllTrackContext from "../../../Context/AllTrackData/AllTrackContext";
import Loading from "react-loading";

const TableBody = ({getData,collectionId,index}) => {
    const {Id,ConsumerName,ConsumerNumber,BillUnit,ConsumerMobileNumber,CreatedAt,MNREApplicationNumber , PVApplicationNumber} = getData || {};

    const {setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext)
    const {setAllTrack} = useContext(AllTrackContext);
    const navigate = useNavigate();
    const navigateToAddTrack = useNavigate();

    const [isLoading,setIsLoading] = useState(false);


    const handleLink = useCallback((event)=>{
        event.stopPropagation();
        setTrackSolarData(getData);
        navigateToAddTrack("/dashboard/new-acivity");
    },[getData,setTrackSolarData,navigateToAddTrack])

    const deleteHandle = (event)=>{
        event.stopPropagation();
        setIsLoading(true)
        firestore.deleteDocument(collectionId,Id).then(()=>{
          firestore.getAllDocuments(user?.companyID+"TrackSolarData")
          .then((data)=>{
            setAllTrack(data)
            setIsLoading(false)
          })
        })

    }
       

    const goToSpeficData = ()=>{
       navigate(`/dashboard/show-existing-acivity/${Id}`)
    }

  return (
    <tbody className="w-full border-b">
      
    <tr onClick={goToSpeficData} className="bg-gray-50 mt-2 cursor-pointer">
    <td className="p-2 sm:px-6 sm:py-4 border">
        {index}
      </td>
      <td className="p-2 sm:px-6 sm:py-4 border">
        {firestore.formatTimestamp(CreatedAt)  }
      </td>
      <td className="p-2 sm:px-6 sm:py-4 border">
        {ConsumerName}
      </td>
      <td className="p-2 sm:px-6 sm:py-4 border">
        {ConsumerMobileNumber}
      </td>
      <td className="p-2 sm:px-6 sm:py-4 border">
        {BillUnit}
      </td>
      <td className="p-2 sm:px-6 sm:py-4 border">
        {ConsumerNumber}
      </td>
      <td className="p-2 sm:px-6 sm:py-4 border">
        {PVApplicationNumber}
      </td>
      <td className="p-2 sm:px-6 sm:py-4 border">
        {MNREApplicationNumber}
      </td>
      <td className="p-2 sm:px-6 sm:py-4 h-full flex items-center justify-center gap-3">
      {
        isLoading ? <Loading type='spinningBubbles' color='#1e3a8a' height={'90%'} width={'90%'} /> :   <div className="flex gap-2">
        <button onClick={handleLink} className={`border bg-blue-300  p-2 rounded-lg ${user?.verified ? "bg-blue-900 text-white" : "bg-blue-100 text-black"} `} disabled={!user?.verified} >
          Update
        </button>
       {
        user?.jobProfile === "Admin" && user?.verified ?  
        <button onClick={deleteHandle} className="border bg-blue-900 text-white p-2 rounded-lg">
        Delete
        </button> : <></>
       }
        </div>
      }
      </td>
    </tr>
   
  </tbody>

  )
}

export default TableBody
