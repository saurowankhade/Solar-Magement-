
import { Navigate } from "react-router-dom";
import authentication from "../Firebase/authentication";

const PrivateRoute = ({ children }) => {
  return authentication.isLogin() ? children : <Navigate to="/user-signin" />;
};

export default PrivateRoute;
