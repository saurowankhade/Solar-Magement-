import { useCallback, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";

const TableBody = ({getData,collectionId}) => {
    const {Id,ConsumerName,ConsumerNumber,BillUnit,ConsumerMobileNumber,CreatedAt,MNREApplicationNumber , PVApplicationNumber} = getData || {};

    const {setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext)

    const navigate = useNavigate();
    const navigateToAddTrack = useNavigate();


    const handleLink = useCallback((event)=>{
        event.stopPropagation();
        setTrackSolarData(getData);
        navigateToAddTrack("/new-acivity");
    },[getData,setTrackSolarData,navigateToAddTrack])

    const deleteHandle = (event)=>{
        event.stopPropagation();
        firestore.deleteDocument(collectionId,Id);
       
    }
       

    const goToSpeficData = ()=>{
       navigate(`/show-existing-acivity/${Id}`)
    }

  return (
    <tbody className="w-full border-b">
      
    <tr onClick={goToSpeficData} className="bg-gray-50 mt-2 cursor-pointer">
      <td className="px-6 py-4 border">
        {firestore.formatTimestamp(CreatedAt)  }
      </td>
      <td className="px-6 py-4 border">
        {ConsumerName}
      </td>
      <td className="px-6 py-4 border">
        {ConsumerMobileNumber}
      </td>
      <td className="px-6 py-4 border">
        {BillUnit}
      </td>
      <td className="px-6 py-4 border">
        {ConsumerNumber}
      </td>
      <td className="px-6 py-4 border">
        {PVApplicationNumber}
      </td>
      <td className="px-6 py-4 border">
        {MNREApplicationNumber}
      </td>
      <td className="px-6 py-4 h-full flex items-center justify-center gap-3">
        <button onClick={handleLink} className={`border bg-blue-300  p-2 rounded-lg ${user?.verified ? "bg-blue-900 text-white" : "bg-blue-100 text-black"} `} disabled={!user?.verified} >
          Update
        </button>
       {
        user?.jobProfile === "Admin" && user?.verified ?  
        <button onClick={deleteHandle} className="border bg-blue-900 text-white p-2 rounded-lg">
        Delete
      </button> : <></>
       }
      </td>
    </tr>
   
  </tbody>

  )
}

export default TableBody
