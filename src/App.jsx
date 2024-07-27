
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CmpRegister from "./Components/Register/CmpRegister/CmpRegister"
import UserRegister from "./Components/Register/UserRegister/UserRegister"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Components/Dashboard/Dashboard";
import authentication from "./Firebase/authentication";
import UserLogin from "./Components/Login/UserLogin/UserLogin";
import Home from "./Components/Screens/Home";
import TrackSolar from "./Components/TrackSolarUser/TrackSolar";
import TrackSolarContextProvider from "./Context/TrackSolarContext/TrackSolarContextProvider";

import UserContextProvider from "./Context/UserContext/UserContextProvider";
import ShowTrackSolar from "./Components/TrackSolarUser/Show/ShowTrackSolar";
import ShowSpeficicData from "./Components/TrackSolarUser/Show/ShowSpeficicData";
import RegisterUsers from "./Components/RegisterUserData/RegisterUsers";
import MainInformation from "./Components/NewAcivity/PrimaryInformation/MainInformation";
import PrimaryInformation from "./Components/NewAcivity/PrimaryInformation/PrimaryInformation";
import CreateNewAcivity from "./Components/NewAcivity/CreateNewAcivity/CreateNewAcivity";
import ShowAcivity from "./Components/ExistingActivity/ShowAcivity/ShowAcivity";
import ShowSpecific from "./Components/ExistingActivity/ShowSpecificAcivity/ShowSpecific";


function App() {
  return (
    <>

   {/* <TrackSolarContextProvider>  </TrackSolarContextProvider> */}

<UserContextProvider>  
  <BrowserRouter>
      <Routes>
        <Route path="/" element={authentication.isLogin() ? <Navigate to={"/dashboard"} /> : <Home/> } />
        <Route path="/company-signup" element={<CmpRegister />} /> 
        <Route path="/user-signup" element={<UserRegister />} />
        <Route path="/user-signin" element={<UserLogin />} />
      
      <Route path="new-acivity" element={<TrackSolarContextProvider><CreateNewAcivity/></TrackSolarContextProvider>}/>
     
      <Route path="/show-existing-acivity" element={<TrackSolarContextProvider><ShowAcivity/></TrackSolarContextProvider>} ></Route>
      <Route path="/show-existing-acivity/:Id" element={<TrackSolarContextProvider><ShowSpecific/></TrackSolarContextProvider>} ></Route>
      
        <Route path="/dashboard" element={authentication.isLogin() ? <Dashboard /> : <Navigate to={"/user-signin"} />}>
        </ Route >
          <Route path="regitser-users" element={<RegisterUsers/>}></ Route >
      </Routes>
    </BrowserRouter>
    </UserContextProvider>

    
    
    <ToastContainer />
    
    </>
  )
}

export default App
