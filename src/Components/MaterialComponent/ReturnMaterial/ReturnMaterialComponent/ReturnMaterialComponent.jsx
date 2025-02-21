import Loading from 'react-loading';
import MaterialReturnTableUI from '../TableUI/MaterialReturnTableUI';
import TrackSolarContext from '../../../../Context/TrackSolarContext/TrackSolarContext';
import { useContext, useState } from 'react';
import UserContext from '../../../../Context/UserContext/UserContext';
import firestore from '../../../../Firebase/Firestore';
import { toast } from 'react-toastify';

const ReturnMaterialComponent = ({type,materialContextData,setMaterialContextData}) => {
    const [isLoading,setIsLoading] = useState(false);
        
    //Context 
    const {user} = useContext(UserContext);

    const {trackSolarData,setTrackSolarData} = useContext(TrackSolarContext)

    const result = (used,returnM)=>{
       const usedMaterial =  used.map(item2 => {
            const match = returnM.find(item1 => 
                item1.Material === item2.Material && 
                item1.Unit === item2.Unit
            );
        
            if (match) {
                return { ...item2, Quantity: item2.Quantity - match.Quantity };
            }
        
            return item2; // Keep unchanged if no match
        });
        return usedMaterial;
    }
    

    const handleSubmit = ()=>{
        if(materialContextData.length <=0){
          toast.error("Select Material")
        } else{
          setIsLoading(true)
              const updatedTrackSolarData = {
                  ...trackSolarData,
                  ReturnMaterial :{
                      ...trackSolarData?.AddMaterial,
                      [type+"Material"]:{
                          createdAt:new Date(),
                          createdBy: user,
                          ["is"+type+"MaterialDone"]:true,
                          MaterialList:materialContextData,
                      }
                  },
                  UsedMaterial :{
                      ...trackSolarData?.UsedMaterial,
                      [type+"Material"]:{
                          createdAt:new Date(),
                          createdBy: user,
                          ["is"+type+"MaterialDone"]:true,
                          MaterialList:result(trackSolarData?.UsedMaterial?.[type+"Material"]?.MaterialList ,materialContextData),
                      }
                  }

              }
              firestore.addData(user?.activeID+"MaterialList",updatedTrackSolarData,trackSolarData?.Id)
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
          
        }
  }
    return (
    <div className="primaryInformation  container mx-auto w-[350px]  my-3 px-5 sm:px-10 md:px-16 lg:px-32 md:w-[900px]">
    <div id="mainInformation" className="shadow-md p-2 border rounded-lg">
        <h2 className="text-center font-bold">{type} Material</h2>
       
        <div>
            <MaterialReturnTableUI materialDetails={materialContextData || [] }          
             setMaterialDetails={setMaterialContextData} />

        </div>


        <div className="flex w-full justify-center mt-8">
        {
            isLoading ? <Loading type='spinningBubbles' color='#F7AB0D' height={'8%'} width={'8%'} /> :  
            <button className="bg-[#F7AB0D] text-white rounded-full cursor-pointer px-4 py-1 text-lg shadow-xl" 
            onClick={handleSubmit}>Save</button>
        }
        </div>

    </div>
</div>
  )
}

export default ReturnMaterialComponent
