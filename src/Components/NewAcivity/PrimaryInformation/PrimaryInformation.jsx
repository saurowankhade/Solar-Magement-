
import MainInformation from './MainInformation'
import IsNameChangeInformation from './IsNameChangeInformation'
import IsBankLoanInformation from './IsBankLoanInformation'
import BankDetails from './BankDetails'
import PrimaryStipper from '../../Stipper/PrimaryStipper'
import { useState } from 'react'

const PrimaryInformation = () => {
  const [showPage,setShowPage] = useState(0);
  return (
    <div className='w-full '>
      <div className=' flex flex-col justify-center items-center '>
      <PrimaryStipper setShowPage={setShowPage} />
      {
        showPage===0 ? <MainInformation /> : 
        // showPage===1 ? <IsLoadChangeInformation /> :
        showPage===1 ? <IsNameChangeInformation /> :
        showPage===2 ? <BankDetails /> :
        showPage===3 ? <IsBankLoanInformation /> : <></>
      }
      </div>
    </div>
  )
}

export default PrimaryInformation
