
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CmpRegister from "./Components/Register/CmpRegister/CmpRegister"
import UserRegister from "./Components/Register/UserRegister/UserRegister"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Components/Dashboard/Dashboard";
import authentication from "./Firebase/authentication";

function App() {
  console.log("ENV : "+import.meta.env.VITE_APPWRITE_URL);

  return (
    <>

  <BrowserRouter>
      <Routes>
        <Route path="/" element={authentication.isLogin() ? <Navigate to={"/dashboard"} /> : <>Main Scree here </> }/>
        <Route path="/company-signup" element={<CmpRegister />} /> 
        <Route path="/user-signup" element={<UserRegister />} />
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
    
    <ToastContainer />
    </>
  )
}

export default App
