import { useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import firestore from "../../../Firebase/Firestore";

const ShowOneTrackData = ({getData,collectionId})=>{
    const {Id,ConsumerName,ConsumerNumber,ConsumerMobileNumber,AreaOfAddress,MNRERegistrationNumber , PVApplicationNumber} = getData || {};

    const {setTrackSolarData} = useContext(TrackSolarContext);

    const navigate = useNavigate();
    const navigateToAddTrack = useNavigate();


    const handleLink = useCallback((event)=>{
        event.stopPropagation();
        setTrackSolarData(getData);
        navigateToAddTrack("/add-track");
    },[getData,setTrackSolarData,navigateToAddTrack])

    const deleteHandle = (event)=>{
        event.stopPropagation();
        firestore.deleteDocument(collectionId,Id);
    }
       

    const goToSpeficData = ()=>{
       navigate("/view-one",{state:getData})
    }
    return(       
<>      
  <tbody className="w-full border-b">
            <tr onClick={goToSpeficData}  className="bg-gray-50 mt-2 cursor-pointer">
                <th scope="row" className="px-6 py-4 border">
                    {PVApplicationNumber}
                </th>
                <td className="px-6 py-4 border">
                    {MNRERegistrationNumber}
                </td>
                <td className="px-6 py-4 border">
                    {ConsumerName}
                </td>
                <td className="px-6 py-4 border">
                    {ConsumerNumber}
                </td>
                <td className="px-6 py-4 border">
                    {ConsumerMobileNumber}
                </td>
                <td className="px-6 py-4 border">
                    {AreaOfAddress}
                </td>
                <td className="px-6 py-4 border flex gap-3">
                    <button onClick={handleLink} className="border bg-blue-300 text-white p-2 rounded-lg">
                            Upadte
                    </button>
                    <button className="border bg-blue-300 text-white p-2 rounded-lg" onClick={deleteHandle}>Delete</button>
                </td>
                
            </tr>  
        </tbody>

        </>


        

    )
}

export default ShowOneTrackData