
import MainInformation from './MainInformation'
import IsLoadChangeInformation from './IsLoadChangeInformation'
import IsNameChangeInformation from './IsNameChangeInformation'
import IsBankLoanInformation from './IsBankLoanInformation'
import BankDetails from './BankDetails'
import PrimaryStipper from '../../Stipper/PrimaryStipper'
import { useState } from 'react'

const PrimaryInformation = () => {
  const [showPage,setShowPage] = useState(0);
  return (
    <div className='w-full '>
      <div className=' flex flex-col justify-center items-center'>
      <PrimaryStipper setShowPage={setShowPage} />
      {
        showPage===0 ? <MainInformation /> : 
        showPage===1 ?<IsLoadChangeInformation /> :
        showPage===2 ?<IsNameChangeInformation /> :
        showPage===3 ?<BankDetails /> :
        showPage===4 ?<IsBankLoanInformation /> : <></>
      }
      </div>
    </div>
  )
}

export default PrimaryInformation
