import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "./store/userSlice";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DonorLayout from "./pages/Donor/DonorLayout";
import DonorDashboard from "./pages/Donor/DonorDashboard";
import Profile from "./pages/Donor/Profile";
import HospitalLayout from "./pages/Hospital/HospitalLayout";
import HospitalDashboard from "./pages/Hospital/HospitalDashboard";
import CreateRequests from "./pages/Hospital/CreateRequests";
import ShowRequests from "./pages/Hospital/ShowRequests";
import HospProfile from "./pages/Hospital/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const dispatch = useDispatch();
useEffect(() => {
  const checkUser = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me`, {
        credentials: "include", 
      });

      if (!res.ok) {
        dispatch(setUser(null));
        return;
      }

      const data = await res.json();
      dispatch(setUser(data.user));
    } catch (err) {
      console.log("Auth error:", err);
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false)); 
    }
  };

  checkUser();
}, []);
  const router = createBrowserRouter([
    //auth routes
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    //Donor routes
    {
      path: "/donor",
      element: (
        <ProtectedRoute role="donor">
          <DonorLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <DonorDashboard /> },
        { path: "profile", element: <Profile /> },
      ],
    },
    //Hospital routes
    {
      path: "/hospital",
      element: (
        <ProtectedRoute role="hospital">
          <HospitalLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <HospitalDashboard /> },
        { path: "create-requests", element: <CreateRequests /> },
        { path: "profile", element: <HospProfile /> },
        { path: "show-requests", element: <ShowRequests /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
