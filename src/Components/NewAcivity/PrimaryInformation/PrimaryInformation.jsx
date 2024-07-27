
import MainInformation from './MainInformation'
import IsLoadChangeInformation from './IsLoadChangeInformation'
import IsNameChangeInformation from './IsNameChangeInformation'
import IsBankLoanInformation from './IsBankLoanInformation'
import TrackSolarContext from '../../../Context/TrackSolarContext/TrackSolarContext'
import { useContext, useEffect, useState } from 'react'


const PrimaryInformation = () => {
  const {trackSolarData} = useContext(TrackSolarContext);
  const [isNext,setIsNext] = useState(false);
  
  useEffect(()=>{
    if(trackSolarData){
      setIsNext(trackSolarData?.BankLoan || !trackSolarData?.BankLoan);
    }
  },[trackSolarData])

  return (
    <div>
      <h3 className='text-center m-2 p-2'>Primary Information </h3>
      <MainInformation />
      <IsLoadChangeInformation />
      <IsNameChangeInformation />
      <IsBankLoanInformation />
    </div>
  )
}

export default PrimaryInformation
