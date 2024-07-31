
import MainInformation from './MainInformation'
import IsLoadChangeInformation from './IsLoadChangeInformation'
import IsNameChangeInformation from './IsNameChangeInformation'
import IsBankLoanInformation from './IsBankLoanInformation'

const PrimaryInformation = () => {
  return (
    <div className=''>

      <div className=''>
      <MainInformation />
      <IsLoadChangeInformation />
      <IsNameChangeInformation />
      <IsBankLoanInformation />
      </div>
    </div>
  )
}

export default PrimaryInformation
