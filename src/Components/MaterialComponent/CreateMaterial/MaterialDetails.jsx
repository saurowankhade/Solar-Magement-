
import PrimaryInfo from '../PrimaryInfo/PrimaryInfo'
import MaterialList from '../PrimaryInfo/MaterialList'
import MaterialStipper from '../../Stipper/MaterialStipper';
import { useState } from 'react';

const MaterialDetails = () => {
  
  const [showPage,setShowPage] = useState(0);
  return ( 
  <div className='w-full '>
      <div className=' flex flex-col justify-center items-center '>
        
      <MaterialStipper setShowPage={setShowPage} />
      <div className='mt-10'>
      {
        showPage === 0 ? <PrimaryInfo /> : 
        showPage === 1 ? <MaterialList type={'Structure'} />: 
        showPage === 2 ? <MaterialList type={'Electric fitting'} />: 
        showPage === 3 ? <MaterialList type={'Concrete'} />: <></>
      }
      </div>
    
      </div>
    </div>
  )
}

export default MaterialDetails
