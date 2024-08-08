import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserContextProvider from './Context/UserContext/UserContextProvider.jsx'
import ShowAllUserContextProvider from './Context/ShowAllUsersContext/ShowAllUserContextProvider.jsx'
import AllTrackContextProvider from './Context/AllTrackData/AllTrackContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <ShowAllUserContextProvider>
        <AllTrackContextProvider>
          <App />
        </AllTrackContextProvider>
      </ShowAllUserContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
