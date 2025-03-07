import {  useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext";
import ReactLoading from 'react-loading';
import UserContext from "../../../Context/UserContext/UserContext";
import firestore from "../../../Firebase/Firestore";
import DropDown from "./DropDown";
import ShowAllUserContext from "../../../Context/ShowAllUsersContext/ShowAllUserContext";

const PrimaryInfo = ({isReturn = false}) => {

    const consumerNameRef = useRef(null)
    // const teamNameRef = useRef(null)
    const driverNameRef = useRef(null)
    const vehicleNameRef = useRef(null)
    const noteRef = useRef(null)

    const [consumerDetails,setConsumerDetails] = useState([])
    const [consumerNameData,setConsumerNameData] = useState([])
    const [allLibrary,setAllLibrary] = useState([]);
    // const [teamNameData,setTeamNameData] = useState([])
    const [driverNameData,setDriverNameData] = useState([])
    const [vehicleNameData,setVehicleNameData] = useState([])

    const [isLoading,setIsLoading] = useState(false);
        
    //Context 
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);


    useEffect(()=>{
        if(user?.activeID){
            firestore.getConsumerDetails(user?.activeID+"TrackSolarData")
            .then((cre)=>{
                if(cre.status === 200){
                    setConsumerDetails(cre?.data)
                    setConsumerNameData((cre.data).map((da)=>da?.ConsumerName))
                } else{
                    toast.error("Failed to load : ",cre?.message)
                }
            })
            firestore.getOneData("Library",user?.activeID)
            .then((cre)=>{
                setAllLibrary(cre)
            })

        }
    },[user])

    useEffect(()=>{
        setDriverNameData(allLibrary?.["Driver Name"])
        // setTeamNameData(allLibrary?.["Team Name"])
        setVehicleNameData(allLibrary?.["Vehicle Name"])
    },[allLibrary, user?.activeID])

    useEffect(()=>{
        if(trackSolarData){
            consumerNameRef.current.value = trackSolarData?.ConsumerName;
            // teamNameRef.current.value = trackSolarData?.TeamName
            driverNameRef.current.value = trackSolarData?.DriverName
            vehicleNameRef.current.value = trackSolarData?.VehicleName
            noteRef.current.value = trackSolarData?.Note
        }
    },[trackSolarData])

    const handleSubmit = ()=>{
          const consumerName = consumerNameRef.current.value;
        //   const teamName = teamNameRef.current.value;
          const driverName = driverNameRef.current.value;
          const vehicleName = vehicleNameRef.current.value;
          const note = noteRef.current.value;
          if(consumerName.length <= 0 ){
            toast.error("Consumer Name Missing !")
          } else{
            if(consumerNameData.includes(consumerName)){
                setIsLoading(true)
                const index = consumerNameData.indexOf(consumerName)
               
                const updatedTrackSolarData = {
                    ...trackSolarData,
                    Id:consumerDetails[index]?.id,
                    ConsumerName : consumerName,
                    // TeamName : teamName,
                    DriverName : driverName,
                    VehicleName : vehicleName,
                    Note : note,
                    ConsumerAddress : consumerDetails[index]?.ConsumerAddress, 
                   Basic:{
                    CreatedAt:new Date(),
                    CreatedBy : user,
                    isBasicDone:true,
                   },
                    
                }
                firestore.addData(user?.activeID+"MaterialList",updatedTrackSolarData,updatedTrackSolarData?.Id)
                .then((cre)=>{                    
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

    const handleSubmitUpdate = ()=>{
        const note = noteRef.current.value;

        if(note.length <= 0){
            toast.error("Fill all info")
          } else{
            setIsLoading(true)
            const updateData = {
                ...trackSolarData,
                Note:note
            }
            firestore.updateData(user?.activeID+"MaterialList",{
                Note:note
            },trackSolarData?.Id)
            .then((cre)=>{                    
                if(cre.status === 200){
                    setIsLoading(false)
                    toast.success("Data Saved")
                    setTrackSolarData(updateData)
                } else{
                    setIsLoading(false)
                    toast.error("Falied to save",cre.message)
                }
            })
          }
    }

  return (
    <div className="primaryInformation  container mx-auto w-[350px]  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
        <div id="mainInformation" className="shadow-md p-2 border rounded-lg">
            <h2 className="text-center font-bold">Main Info</h2>
            <div className=" flex flex-col ">
               <div className="relative ">
    
                <DropDown isReturn={isReturn}  placeholder={"Consumer Name"} list={consumerNameData} ref={consumerNameRef} />

                {/* <DropDown isReturn={isReturn}  placeholder={"Team Name"} list={teamNameData} ref={teamNameRef} /> */}

                <DropDown  isReturn={isReturn} placeholder={"Driver Name"} list={driverNameData} ref={driverNameRef} />

                <DropDown isReturn={isReturn}  placeholder={"Vehicle Name"} list={vehicleNameData} ref={vehicleNameRef} />

                <input
        className="w-full my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none text-base"
        placeholder={"Note"}
        type="text"
        ref={noteRef}
      />

               </div>
               

            </div>


            <div className="flex w-full justify-center mt-8 mb-4">
            {
                isLoading ? <ReactLoading type='spinningBubbles' color='#F7AB0D' height={'8%'} width={'8%'} /> :  
                <button className="bg-[#F7AB0D] text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
                onClick={isReturn ? handleSubmitUpdate : handleSubmit} >Save</button>
            }
            </div>

        </div>
    </div>
  )
}

export default PrimaryInfo
