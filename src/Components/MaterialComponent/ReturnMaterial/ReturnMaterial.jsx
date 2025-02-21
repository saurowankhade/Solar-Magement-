import React, { useContext, useEffect, useState } from 'react'
import MaterialReturnTableUI from './TableUI/MaterialReturnTableUI'
import MaterialList from '../PrimaryInfo/MaterialList';
import PrimaryInfo from '../PrimaryInfo/PrimaryInfo';
import MaterialStipper from '../../Stipper/MaterialStipper';
import StructureContext from '../../../Context/StructureMaterial/StructureContext';
import ElectricContext from '../../../Context/ElectricMaterial/ElectricContext';
import ConcreteContext from '../../../Context/ConcreteMaterial/ConcreteContext';
import TrackSolarContext from '../../../Context/TrackSolarContext/TrackSolarContext';
import ReturnMaterialComponent from './ReturnMaterialComponent/ReturnMaterialComponent';

const ReturnMaterial = () => {
    const [showPage, setShowPage] = useState(0);
    const {structureData,setStructureData} = useContext(StructureContext);
    const {electricData,setElectricData} = useContext(ElectricContext);
    const {concreteData,setconcreteData} = useContext(ConcreteContext);
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
          <PrimaryInfo isReturn={true} />
        ) : showPage === 1 ? (
          <ReturnMaterialComponent
            type="Structure"
            materialContextData={structureData}
            setMaterialContextData={setStructureData}
          />
        ) : showPage === 2 ? (
          
          <ReturnMaterialComponent
            type="Concrete"
            materialContextData={concreteData}
            setMaterialContextData={setconcreteData}
          />
        ) : showPage === 3 ? (

          <ReturnMaterialComponent
            type="Electric Fitting"
            materialContextData={electricData}
            setMaterialContextData={setElectricData}
          />
        ) : (
          <></>
        )}
      </div>


    </div>
  </div>
  )
}

export default ReturnMaterial
