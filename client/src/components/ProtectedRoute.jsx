import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  // If user is not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in but role doesn't match
  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Allow access
  return children;
};

export default ProtectedRoute;