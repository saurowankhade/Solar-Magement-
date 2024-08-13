import { useContext } from "react"
import AcivityButton from "./AcivityButtons/AcivityButton"
import ChartsBar from "./Analytics/BarCharts/ChartsBar"
import TrackAnalytics from "./Analytics/ByTrackData/TrackAnalytics"
import Users from "./Users/Users"
import UserContext from "../../Context/UserContext/UserContext"

const HomeDashboard = () => {
    const {user} = useContext(UserContext)
  return (
    <div>
        <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
                <AcivityButton />
          </div>
          <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
          <TrackAnalytics />
          </div>
          <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">   
          <ChartsBar />
          </div>
          {
            user?.jobProfile === "Admin" && user?.verified ? 
            <div className="mx-2 my-10 md:my-20 md:mx-20 xl:mx-28 2xl:mx-30">
          <Users />
          </div> : <></>
          } 
    </div>
  )
}

export default HomeDashboard
