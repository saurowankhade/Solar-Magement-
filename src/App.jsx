
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CmpRegister from "./Components/Register/CmpRegister/CmpRegister"
import UserRegister from "./Components/Register/UserRegister/UserRegister"

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Components/Dashboard/Dashboard";
import authentication from "./Firebase/authentication";
import UserLogin from "./Components/Login/UserLogin/UserLogin";
import Home from "./Components/Screens/Home";
import TrackSolarContextProvider from "./Context/TrackSolarContext/TrackSolarContextProvider";

import UserContextProvider from "./Context/UserContext/UserContextProvider";
import RegisterUsers from "./Components/RegisterUserData/RegisterUsers";
import CreateNewAcivity from "./Components/NewAcivity/CreateNewAcivity/CreateNewAcivity";
import ShowAcivity from "./Components/ExistingActivity/ShowAcivity/ShowAcivity";
import ShowSpecific from "./Components/ExistingActivity/ShowSpecificAcivity/ShowSpecific";
import PrivateRoute from "./Routing/PrivateRoute";

function App() {
  return (
    <>

<UserContextProvider>  
  <BrowserRouter>
      <Routes>
        <Route path="/" element={authentication.isLogin() ? <Navigate to={"/dashboard"} /> : <Home/> } />
        <Route path="/company-signup" element={<CmpRegister />} /> 
        <Route path="/user-signup" element={<UserRegister />} />
        <Route path="/user-signin" element={<UserLogin />} />
      
      <Route path="/new-acivity" element={<PrivateRoute><TrackSolarContextProvider><CreateNewAcivity/></TrackSolarContextProvider></PrivateRoute>}/>
     
      <Route path="/show-existing-acivity" element={<PrivateRoute><TrackSolarContextProvider><ShowAcivity/></TrackSolarContextProvider></PrivateRoute>} ></Route>
      <Route path="/show-existing-acivity/:Id" element={<PrivateRoute><TrackSolarContextProvider><ShowSpecific/></TrackSolarContextProvider></PrivateRoute>} ></Route>
      
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          <Route path="/regitser-users" element={<PrivateRoute><RegisterUsers/></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
    </UserContextProvider>

    
    
    <ToastContainer 
    position="top-left"
    autoClose={3000}
    limit={5}
    newestOnTop
    />
    </>
  )
}

export default App
