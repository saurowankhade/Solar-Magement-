
import PrimaryInfo from '../PrimaryInfo/PrimaryInfo'
import MaterialList from '../PrimaryInfo/MaterialList'
import MaterialStipper from '../../Stipper/MaterialStipper';
import { useContext, useEffect, useState } from 'react';
import StructureContext from '../../../Context/StructureMaterial/StructureContext';
import ElectricContext from '../../../Context/ElectricMaterial/ElectricContext';
import ConcreteContext from '../../../Context/ConcreteMaterial/ConcreteContext';
import TrackSolarContext from '../../../Context/TrackSolarContext/TrackSolarContext';

const MaterialDetails = () => {

  const [showPage, setShowPage] = useState(0);
  const {structureData,setStructureData} = useContext(StructureContext);
  const {electricData,setElectricData} = useContext(ElectricContext);
  const {concreteData,setconcreteData} = useContext(ConcreteContext);
   //Context 
   const {trackSolarData} = useContext(TrackSolarContext);
   useEffect(()=>{
    setStructureData(trackSolarData?.AddMaterial?.StructureMaterial?.MaterialList)
    setElectricData(trackSolarData?.AddMaterial?.["Electric FittingMaterial"]?.MaterialList)
    setconcreteData(trackSolarData?.AddMaterial?.ConcreteMaterial?.MaterialList)
   },[setElectricData, setStructureData, setconcreteData, trackSolarData])
  return (
    <div className='w-full '>
      <div className=' flex flex-col justify-center items-center '>

        <MaterialStipper showPage={showPage} setShowPage={setShowPage} />
        <div className="mt-10">
          {showPage === 0 ? (
            <PrimaryInfo />
          ) : showPage === 1 ? (
            <MaterialList
              type="Structure"
              materialContextData={structureData}
              setMaterialContextData={setStructureData}
            />
          ) : showPage === 2 ? (
            <MaterialList
              type="Electric Fitting"
              materialContextData={electricData}
              setMaterialContextData={setElectricData}
            />
          ) : showPage === 3 ? (
            <MaterialList
              type="Concrete"
              materialContextData={concreteData}
              setMaterialContextData={setconcreteData}
            />
          ) : (
            <></>
          )}
        </div>


      </div>
    </div>
  )
}

export default MaterialDetails
