
import MainInformation from './MainInformation'
import IsLoadChangeInformation from './IsLoadChangeInformation'
import IsNameChangeInformation from './IsNameChangeInformation'
import IsBankLoanInformation from './IsBankLoanInformation'
import BankDetails from './BankDetails'

const PrimaryInformation = () => {
  return (
    <div className=''>

      <div className=''>
      <MainInformation />
      <IsLoadChangeInformation />
      <IsNameChangeInformation />
      <BankDetails />
      <IsBankLoanInformation />
      </div>
    </div>
  )
}

export default PrimaryInformation
