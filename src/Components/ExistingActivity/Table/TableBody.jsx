import { useCallback, useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import firestore from "../../../Firebase/Firestore";
import UserContext from "../../../Context/UserContext/UserContext";
import AllTrackContext from "../../../Context/AllTrackData/AllTrackContext";
import Loading from "react-loading";
import Swal from "sweetalert2";

const TableBody = ({getData,collectionId,index}) => {
    const checkCollection = collectionId.includes("TrackSolarData");
   
    
    let data = [];
    if(checkCollection){
      const {ConsumerName,ConsumerNumber,BillUnit,ConsumerMobileNumber,MNREApplicationNumber , PVApplicationNumber} = getData || {};
      data = [ConsumerName,ConsumerMobileNumber,BillUnit,ConsumerNumber,PVApplicationNumber,MNREApplicationNumber];

    } else{
      // ["Sr.No","Date","Consumer Name","Consumer Address","Team Name","Pending Material","Note","Options"]

      const {ConsumerName,ConsumerAddress,TeamName,Note} = getData || {};

      data = [ConsumerName,ConsumerAddress,TeamName,Note];

    }

    const {setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext)
    const {setAllTrack} = useContext(AllTrackContext);
    const navigate = useNavigate();
    const navigateToAddTrack = useNavigate();

    const [isLoading,setIsLoading] = useState(false);

    // alert



    const handleLink = useCallback((event)=>{
        event.stopPropagation();
        setTrackSolarData(getData);
        navigateToAddTrack(`/dashboard/${checkCollection ? "new-acivity":"material-entry"}`);
    },[getData,checkCollection,setTrackSolarData,navigateToAddTrack])

    const deleteHandle = (event)=>{
        event.stopPropagation();
        // setIsLoading(true)
        // 

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to recover it!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#48BB78",
          cancelButtonColor: "#F56565",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            firestore.deleteDocument(collectionId,data?.Id).then(()=>{
                firestore.getAllDocuments(user?.companyID+`${checkCollection ? "TrackSolarData":"MaterialList"}`)
                .then((data)=>{
                  setAllTrack(data)
                  setIsLoading(false)
                })
              })
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
    }
       

    const goToSpeficData = ()=>{
      const navigateName = checkCollection ? "show-existing-acivity" : "material-overview"
      // setTrackSolarData(getData)
       navigate(`/dashboard/${navigateName}/${getData?.Id}`)
    }

  return (
    <tbody className="w-full border-b scroll">
      
    <tr onClick={goToSpeficData} className="bg-gray-50 mt-2 cursor-pointer">
    <td className="p-2 sm:px-6 sm:py-4 border">
        {index}
      </td>
      <td className="p-2 sm:px-6 sm:py-4 border">
       
        { checkCollection ? firestore.formatTimestamp(getData?.CreatedAt) : firestore.formatTimestamp(getData?.Basic?.CreatedAt)  }
      </td>

      {
        data.map((elements,index)=>(
          <td key={elements+index} className="p-2 sm:px-6 sm:py-4 border">
          {elements}
        </td>
        ))
      }
      
      {/* <td className="p-2 sm:px-6 sm:py-4 border">
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
      </td> */}


      <td className="p-2 sm:px-6 sm:py-4 h-full flex items-center justify-center gap-3">
      {
        isLoading ? <Loading type='spinningBubbles' color='#1e3a8a' height={'90%'} width={'90%'} /> :   <div className="flex gap-2">
        <button onClick={handleLink} className={`border bg-[#000000]  p-2 rounded-lg ${user?.verified ? "bg-black text-white " : "bg-blue-100 text-black"} `} disabled={!user?.verified} >
          Update
        </button>
        {
          !checkCollection && <button onClick={(e)=>{
            e.stopPropagation()
            setTrackSolarData(getData);
            navigateToAddTrack('/dashboard/material-return-entry')
          }} className={`border bg-[#000000]  p-2 rounded-lg ${user?.verified ? "bg-black text-white " : "bg-blue-100 text-black"} `} disabled={!user?.verified} >
          Retrun
        </button>
        }
       {
        user?.jobProfile === "Admin" && user?.verified ?  
        <button onClick={deleteHandle} className="border bg-[#000000] text-white p-2 rounded-lg">
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
