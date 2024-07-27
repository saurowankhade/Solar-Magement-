import { useCallback, useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import firestore from "../../../Firebase/Firestore";
import { Timestamp } from "firebase/firestore";
import Dialog from "../../DialogBox/Dialog";

const TableBody = ({getData,collectionId}) => {
    const {Id,ConsumerName,ConsumerNumber,ConsumerMobileNumber,PrimaryInfromationDate,MNREApplicationNumber , PVApplicationNumber} = getData || {};

    const {setTrackSolarData} = useContext(TrackSolarContext);

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

    function formatTimestamp(timestamp) {
        if (timestamp instanceof Timestamp) {
          return timestamp.toDate().toLocaleDateString(); // Or any other format you prefer
        }
        return ''; // Return empty string if not a valid timestamp
      }

  return (
    <tbody className="w-full border-b">
      
    <tr onClick={goToSpeficData} className="bg-gray-50 mt-2 cursor-pointer">
      <td className="px-6 py-4 border">
        {formatTimestamp(PrimaryInfromationDate)}
      </td>
      <td className="px-6 py-4 border">
        {ConsumerName}
      </td>
      <td className="px-6 py-4 border">
        {ConsumerMobileNumber}
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
      <td className="px-6 py-4 border flex gap-3">
        <button onClick={handleLink} className="border bg-blue-300 text-white p-2 rounded-lg">
          Update
        </button>
        <button onClick={deleteHandle} className="border bg-blue-300 text-white p-2 rounded-lg">
          Delete
        </button>
      </td>
    </tr>
   
  </tbody>

  )
}

export default TableBody
