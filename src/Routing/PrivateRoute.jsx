
import { Navigate } from "react-router-dom";
import authentication from "../Firebase/authentication";
import UserContextProvider from "../Context/UserContext/UserContextProvider";
import ShowAllUserContextProvider from "../Context/ShowAllUsersContext/ShowAllUserContextProvider";
import AllTrackContextProvider from "../Context/AllTrackData/AllTrackContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PrivateRoute = ({ children }) => {
  const queryClient = new QueryClient();
  return authentication.isLogin() ? 
  <UserContextProvider>
  <ShowAllUserContextProvider>
    <QueryClientProvider client={queryClient}>
    <AllTrackContextProvider>
      {children}
    </AllTrackContextProvider>
</QueryClientProvider>
  </ShowAllUserContextProvider>
</UserContextProvider> 
  : <Navigate to="/" />;
};

export default PrivateRoute;
