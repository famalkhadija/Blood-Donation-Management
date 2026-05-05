import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, role }) {
  const { loading, user, role: userRole } = useSelector((state) => state.user);
  if (loading) {
    console.log("Checking authentication...", loading, user);
    return "Loading...";
  }
  if (!user) {
    console.log("User not authenticated, redirecting to login...");
    return <Navigate to="/login" />;
  }
  if (userRole !== role) {
    console.log(
      `User role (${userRole}) does not match required role (${role}), redirecting to login...`,
    );
    return <Navigate to="/login" />;
  }
  return children;
}
