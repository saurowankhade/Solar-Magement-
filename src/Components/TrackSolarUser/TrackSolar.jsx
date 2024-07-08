import { useContext, useState } from "react"
import ConsumerData from "./ConsumerData"
import LoadChange from "./LoadChange"
import NameChange from "./NameChange"
import TrackSolarContext from "../../Context/TrackSolarContext/TrackSolarContext"
import { toast } from "react-toastify"
import UserContext from "../../Context/UserContext/UserContext"
import firestore from "../../Firebase/Firestore"
import ReactLoading from 'react-loading';


 const TrackSolar = ()=>{
    const [number,setNumber] = useState(0);

    const {trackSolarData} = useContext(TrackSolarContext);

    const {user} = useContext(UserContext);

    const [isAdded,setIsAdded] = useState(false);
    

    const submitData = ()=>{
        setIsAdded(true)
        const companyID = user.companyID;
        if(trackSolarData){
            firestore.addData(companyID+"TrackSolarData",trackSolarData,trackSolarData?.Id)
            .then(()=>{
                toast.success("Data Added!");
            }).catch((error)=>{
                toast.error(error.message)
                setIsAdded(false)
            });
        } else{
            toast.error("Fill information")
            setIsAdded(false)
        }
    }
    
    
    return (

        
        <div className="flex flex-col items-center justify-center" >
            {
                number === 0 ? <ConsumerData/> : number === 1 ? <LoadChange /> : number === 2 ? <NameChange /> : <></>
            }
            {
                console.log("Number : ",trackSolarData)
            }

            <div className="flex gap-3">
                {
                    isAdded ? <ReactLoading type='spinningBubbles' color='black' height={'10%'} width={'10%'} />
                    : <>
                    {
            
            number !== 0 ? <button className="border bg-blue-400 text-white rounded-md hover:bg-blue-500 cursor-pointer p-2 " onClick={()=>{number !== 0 ? setNumber(number - 1) : setNumber(number)}}>Back</button>
        :<></>

        }
        {
        number === 2 ? 
        <button className="border bg-blue-400 text-white rounded-md hover:bg-blue-500 cursor-pointer p-2 " onClick={submitData}>Submit</button>
       :<button className="border bg-blue-400 text-white rounded-md hover:bg-blue-500 cursor-pointer p-2 " onClick={()=>{number !== 2 ? setNumber(number + 1) : setNumber(number)}}>Next</button>  
       }
                    </>
                }
            </div>
        </div >
    )
 }
 export default TrackSolar