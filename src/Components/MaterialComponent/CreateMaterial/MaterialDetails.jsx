
import PrimaryInfo from '../PrimaryInfo/PrimaryInfo'
import MaterialList from '../PrimaryInfo/MaterialList'
import MaterialStipper from '../../Stipper/MaterialStipper';
import { useContext, useState } from 'react';
import StructureContext from '../../../Context/StructureMaterial/StructureContext';
import ElectricContext from '../../../Context/ElectricMaterial/ElectricContext';
import ConcreteContext from '../../../Context/ConcreteMaterial/ConcreteContext';

const MaterialDetails = () => {

  const [showPage, setShowPage] = useState(0);
  const {structureData,setStructureData} = useContext(StructureContext);
  const {electricData,setElectricData} = useContext(ElectricContext);
  const {concreteData,setconcreteData} = useContext(ConcreteContext);
  return (
    <div className='w-full '>
      <div className=' flex flex-col justify-center items-center '>

        <MaterialStipper setShowPage={setShowPage} />
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
