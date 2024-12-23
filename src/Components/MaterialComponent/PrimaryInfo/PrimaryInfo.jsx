import {  useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import ReactLoading from 'react-loading';
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";
import DropDown from "./DropDown";
import ShowAllUserContext from "../../../Context/ShowAllUsersContext/ShowAllUserContext";

const PrimaryInfo = () => {

    const consumerNameRef = useRef(null)
    const teamNameRef = useRef(null)
    const driverNameRef = useRef(null)
    const vehicleNameRef = useRef(null)
    const noteRef = useRef(null)

    const [consumerDetails,setConsumerDetails] = useState([])
    const [consumerNameData,setConsumerNameData] = useState([])
    const [allLibrary,setAllLibrary] = useState([]);
    const [teamNameData,setTeamNameData] = useState([])
    const [driverNameData,setDriverNameData] = useState([])
    const [vehicleNameData,setVehicleNameData] = useState([])

    const [isLoading,setIsLoading] = useState(false);
        
    //Context 
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);


    useEffect(()=>{
        if(user?.companyID){
            firestore.getConsumerDetails(user?.companyID+"TrackSolarData")
            .then((cre)=>{
                if(cre.status === 200){
                    setConsumerDetails(cre?.data)
                    setConsumerNameData((cre.data).map((da)=>da?.ConsumerName))
                } else{
                    toast.error("Failed to load : ",cre?.message)
                }
            })
            firestore.getOneData("Library",user?.companyID)
            .then((cre)=>{
                setAllLibrary(cre)
            })

        }
    },[user])

    useEffect(()=>{
        firestore.getAllDocuments("Users")
    .then((status)=>{        
     if(status?.status === 200){
      const filterData = (status.data).filter((userData) => userData?.companyID === user?.companyID);
      const teamName = filterData.map((team)=> team?.name);
      setTeamNameData(teamName);
    //   console.log("Tema name origina ",teamName);
            
     } 
    });
        setDriverNameData(allLibrary?.["Driver Name"])
        setVehicleNameData(allLibrary?.["Vehicle Name"])
    },[allLibrary, user?.companyID])

    useEffect(()=>{
        if(trackSolarData){
            consumerNameRef.current.value = trackSolarData?.ConsumerName;
            teamNameRef.current.value = trackSolarData?.TeamName
            driverNameRef.current.value = trackSolarData?.DriverName
            vehicleNameRef.current.value = trackSolarData?.VehicleName
            noteRef.current.value = trackSolarData?.Note
        }
    },[trackSolarData])

    const handleSubmit = ()=>{
          const consumerName = consumerNameRef.current.value;
          const teamName = teamNameRef.current.value;
          const driverName = driverNameRef.current.value;
          const vehicleName = vehicleNameRef.current.value;
          const note = noteRef.current.value;
          if(consumerName.length <= 0 || teamName.length <= 0 || driverName.length <= 0 || vehicleName.length <= 0){
            toast.error("Fill all info")
          } else{
            if(consumerNameData.includes(consumerName)){
                setIsLoading(true)
                const index = consumerNameData.indexOf(consumerName)
                console.log("Inedx",index);
                console.log("ID : ",consumerDetails[index]?.id);
                
                const updatedTrackSolarData = {
                    ...trackSolarData,
                    Id:consumerDetails[index]?.id,
                    ConsumerName : consumerName,
                    TeamName : teamName,
                    DriverName : driverName,
                    VehicleName : vehicleName,
                    Note : note,
                    ConsumerAddress : consumerDetails[index]?.ConsumerAddress, 
                    CreatedAt:new Date(),
                    CreatedBy : user
                }
                firestore.addData(user?.companyID+"MaterialList",updatedTrackSolarData,updatedTrackSolarData?.Id)
                .then((cre)=>{
                    console.log(cre);
                    
                    if(cre.status === 200){
                        setIsLoading(false)
                        toast.success("Data Saved")
                        setTrackSolarData(updatedTrackSolarData)
                    } else{
                        setIsLoading(false)
                        toast.error("Falied to save",cre.message)
                    }
                })
            } else{
                toast.info("Consumer not register yet ")
            }
          }
    }
  return (
    <div className="primaryInformation  container mx-auto w-[350px]  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
        <div id="mainInformation" className="shadow-md p-2 border rounded-lg">
            <h2 className="text-center font-bold">Main Info</h2>
            <div className=" flex flex-col ">
               <div className="relative ">
    
                <DropDown placeholder={"Consumer Name"} list={consumerNameData} ref={consumerNameRef} />

                <DropDown placeholder={"Team Name"} list={teamNameData} ref={teamNameRef} />

                <DropDown placeholder={"Driver Name"} list={driverNameData} ref={driverNameRef} />

                <DropDown placeholder={"Vehicle Name"} list={vehicleNameData} ref={vehicleNameRef} />

                <input
        className="w-full my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none text-base"
        placeholder={"Note"}
        type="text"
        ref={noteRef}
      />

               </div>
               

            </div>


            <div className="flex w-full justify-center mt-8">
            {
                isLoading ? <ReactLoading type='spinningBubbles' color='#3b82f6' height={'10%'} width={'10%'} /> :  
                <button className="bg-[#F7AB0D] text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
                onClick={handleSubmit}>Save</button>
            }
            </div>

        </div>
    </div>
  )
}

export default PrimaryInfo
