
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CmpRegister from "./Components/Register/CmpRegister/CmpRegister"
import UserRegister from "./Components/Register/UserRegister/UserRegister"

import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Components/Dashboard/Dashboard";
import authentication from "./Firebase/authentication";
import UserLogin from "./Components/Login/UserLogin/UserLogin";
import Home from "./Components/Screens/Home";
import TrackSolarContextProvider from "./Context/TrackSolarContext/TrackSolarContextProvider";

import RegisterUsers from "./Components/RegisterUserData/RegisterUsers";
import CreateNewAcivity from "./Components/NewAcivity/CreateNewAcivity/CreateNewAcivity";
import ShowAcivity from "./Components/ExistingActivity/ShowAcivity/ShowAcivity";
import ShowSpecific from "./Components/ExistingActivity/ShowSpecificAcivity/ShowSpecific";
import PrivateRoute from "./Routing/PrivateRoute";
import HomeDashboard from "./Components/Dashboard/Home";
import Library from "./Components/Library/Library";
import MaterialDetails from "./Components/MaterialComponent/CreateMaterial/MaterialDetails";
import ShowMaterial from "./Components/ShowMaterialDetails/ShowMaterial/ShowMaterial";
import LeftSideNav from "./Components/Dashboard/SideNav/LeftSideNav";
import CommonContext from "./Routing/CommonContext";
import ShowOneList from "./Components/ShowMaterialDetails/ShowOne/ShowOneList";
import Profile from "./Components/Profile/Profile";

function App() {
  return (
  
   <div> 
     <BrowserRouter>
         <Routes>
           <Route path="/" element={authentication.isLogin() ? <Navigate to={"/dashboard"} /> : <Home/> } />
           <Route path="/company-signup" element={<CmpRegister />} /> 
           <Route path="/user-signup" element={<UserRegister />} />
           <Route path="/user-signin" element={<UserLogin />} />
                
           <Route path="/dashboard" element={<PrivateRoute><Dashboard /> </PrivateRoute>} >
                <Route index element={<HomeDashboard/>}></Route>
                <Route path="new-acivity" element={<PrivateRoute><TrackSolarContextProvider><CreateNewAcivity/></TrackSolarContextProvider></PrivateRoute>}/>
                <Route path="show-existing-acivity" element={<PrivateRoute><TrackSolarContextProvider><ShowAcivity/></TrackSolarContextProvider></PrivateRoute>} ></Route>
                <Route path="show-existing-acivity/:Id" element={<PrivateRoute><TrackSolarContextProvider><ShowSpecific/></TrackSolarContextProvider></PrivateRoute>} ></Route>
                
                <Route path="library" element={<PrivateRoute><TrackSolarContextProvider><Library/></TrackSolarContextProvider></PrivateRoute>}/>
                
                <Route path="profile" element={<PrivateRoute><TrackSolarContextProvider><Profile/></TrackSolarContextProvider></PrivateRoute>}/>
              
                <Route path="material-entry" element={<CommonContext >
                  <MaterialDetails/>
                </CommonContext>}/>
                <Route path="material-overview" element={<CommonContext ><ShowMaterial/> </CommonContext>} ></Route>
                <Route path="material-overview/:Id" element={<CommonContext ><ShowOneList /> </CommonContext>} ></Route>

              <Route path="regitser-users" element={<PrivateRoute><RegisterUsers/></PrivateRoute>}/>

           </Route> 
         </Routes>
       </BrowserRouter>
       <div>
       <ToastContainer 
       position="top-right"
       autoClose={3000}
       limit={5}
       pauseOnHover={false}
       draggable={true}
       draggableDirection="x"
       draggablePercent={20}
       />
       </div>
       </div>
   
  )
}

export default App
