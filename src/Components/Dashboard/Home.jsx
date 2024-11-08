import { useContext, useEffect } from "react"
import AcivityButton from "./AcivityButtons/AcivityButton"
import ChartsBar from "./Analytics/BarCharts/ChartsBar"
import TrackAnalytics from "./Analytics/ByTrackData/TrackAnalytics"
import Users from "./Users/Users"
import UserContext from "../../Context/UserContext/UserContext"
import firestore from "../../Firebase/Firestore"
import LeftSideNav from "./SideNav/LeftSideNav"
import PieChart from "./Analytics/PieChart/PieChart"
import App from "./Analytics/PaymentChart/PaymentDonut"
import PaymentChart from "./Analytics/PaymentChart/PaymentDonut"

const HomeDashboard = () => {
    const {user} = useContext(UserContext)
   
  return (
    <div className="flex flex-col gap-10 bg-gray-100">
      <div>
      <LeftSideNav />
      </div>
      <div className="flex flex-col md:flex-row md:gap-4">
      <ChartsBar />   
     <PaymentChart />
      </div>   
      <div className="flex flex-col md:flex-row gap-2">
        <PieChart />
        <Users />
      </div>
    </div>
  )
}

export default HomeDashboard
