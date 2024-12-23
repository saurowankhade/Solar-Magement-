import Loading from "react-loading"
import DropDown from "./DropDown"
import { useContext, useEffect, useRef, useState } from "react"
import TrackSolarContext from "../../../Context/TrackSolarContext/TrackSolarContext"
import UserContext from "../../../Context/UserContext/UserContext"
import firestore from "../../../Firebase/Firestore"
import { toast } from "react-toastify"
import Table from "../MaterialInfo/Table"

const MaterialList = ({type}) => {
    
    const materialRef = useRef(null)
    const unitRef = useRef(null)
    const quantityRef = useRef(null)

    const [allLibrary,setAllLibrary] = useState([]);
    const [materialData,setMaterialData] = useState([])
    const [unitData,setUnitData] = useState([])

    const [materialDetails,setMaterialDetails] = useState([])

    const [isLoading,setIsLoading] = useState(false);
        
    //Context 
    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext);
    const {user} = useContext(UserContext);


    useEffect(()=>{
        if(user?.companyID){
            firestore.getOneData("Library",user?.companyID)
            .then((cre)=>{
                setAllLibrary(cre)
            })

        }
    },[user])

    useEffect(()=>{
        setMaterialData(allLibrary?.[`${type} Material`])
        setUnitData(allLibrary?.["Units"])
    },[allLibrary, type])

    useEffect(()=>{
        if(trackSolarData){
           setMaterialDetails(trackSolarData?.AddMaterialList)
        }
    },[trackSolarData])

    const addToList = ()=>{
        const materialName = materialRef.current.value
        const unit = unitRef.current.value;
        const quantity = quantityRef.current.value;
        if(materialName.length <= 0 || unit.length <=0 || quantity.length <=0){
            toast.error("Fill all info")
        } else{
            const updateMaterialList = {
                Material:materialName,
                Unit:unit,
                Quantity:Number(quantity)
            }
            setMaterialDetails([...materialDetails || [],updateMaterialList])
            materialRef.current.value = ""
            unitRef.current.value = ""
            quantityRef.current.value = ""
        }
    }

    const handleSubmit = ()=>{
          if(materialDetails.length <=0){
            toast.error("Select Material")
          } else{
            setIsLoading(true)
                const updatedTrackSolarData = {
                    ...trackSolarData,
                    AddMaterialList:materialDetails,
                    Verify:false
                }
                firestore.addData(user?.companyID+"MaterialList",updatedTrackSolarData,trackSolarData?.Id)
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
            
          }
    }
  return (
    <div className="primaryInformation  container mx-auto w-[350px]  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
    <div id="mainInformation" className="shadow-md p-2 border rounded-lg">
        <h2 className="text-center font-bold">{type} Material Info</h2>
        <div className=" flex flex-col ">
           <div className="relative ">
           
            <DropDown placeholder={`${type} Material`} list={materialData} ref={materialRef} />

            <DropDown placeholder={"Unit"} list={unitData} ref={unitRef} />

            <input onWheel={(e) => e.target.blur()}  onKeyDown={(e)=>{
                     if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault(); }
                }} className=" w-full my-2 py-2 px-3 placeholder:text-gray-600 rounded-full border outline-none  text-base"  placeholder="Quantity" type="number" ref={quantityRef}  />
          

           </div>

          <div className="flex w-full items-center mr-1 justify-end">
          <button className="bg-[#F7AB0D] w-fit text-white rounded-full cursor-pointer px-4 py-1 my-2 items-end text-base  shadow-xl" 
            onClick={addToList}>Add</button>
          </div>
           

        </div>

        <div>
            <Table materialDetails={materialDetails || []} setMaterialDetails={setMaterialDetails} />
        </div>


        <div className="flex w-full justify-center mt-8">
        {
            isLoading ? <Loading type='spinningBubbles' color='#3b82f6' height={'10%'} width={'10%'} /> :  
            <button className="bg-[#F7AB0D] text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
            onClick={handleSubmit}>Save</button>
        }
        </div>

    </div>
</div>
  )
}

export default MaterialList
