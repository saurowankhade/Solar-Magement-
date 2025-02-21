import { useContext } from "react"
import ChartsBar from "./Analytics/BarCharts/ChartsBar"
import Users from "./Users/Users"
import UserContext from "../../Context/UserContext/UserContext"
import LeftSideNav from "./SideNav/LeftSideNav"
import PieChart from "./Analytics/PieChart/PieChart"
import PaymentChart from "./Analytics/PaymentChart/PaymentDonut"

const HomeDashboard = () => {
    // const {user} = useContext(UserContext)
  return (
    <div className="flex flex-col gap-10 bg-gray-100">
      <div className="mt-2 md:mt-0">
      <LeftSideNav />
      </div> 
      <div className="flex flex-col w-full  md:flex-row md:gap-4">
        
      <ChartsBar />   
      {/* <PaymentChart /> */}
      <PieChart />
      </div>   
      <div className="flex  flex-col md:flex-row gap-2">
        
        <Users />
      </div>
    </div>
  )
}

export default HomeDashboard
