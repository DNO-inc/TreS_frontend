import { Navigate, Outlet } from "react-router";

import { endpoints } from "constants";
import { useAuth } from "context/AuthContext/AuthContext";

const PrivateRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={endpoints.GENERAL_TICKETS} />;
};

export { PrivateRoute };
