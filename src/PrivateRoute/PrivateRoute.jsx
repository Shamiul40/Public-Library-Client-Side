import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Layout/AuthProvider";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div className="text-center">Loading...</div>;

  return user ? children : <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;