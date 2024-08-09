
import { Navigate } from "react-router-dom";
import authentication from "../Firebase/authentication";
import UserContextProvider from "../Context/UserContext/UserContextProvider";
import ShowAllUserContextProvider from "../Context/ShowAllUsersContext/ShowAllUserContextProvider";
import AllTrackContextProvider from "../Context/AllTrackData/AllTrackContextProvider";

const PrivateRoute = ({ children }) => {
  return authentication.isLogin() ? 
  <UserContextProvider>
  <ShowAllUserContextProvider>
    <AllTrackContextProvider>
      {children}
    </AllTrackContextProvider>
  </ShowAllUserContextProvider>
</UserContextProvider> 
  : <Navigate to="/" />;
};

export default PrivateRoute;
