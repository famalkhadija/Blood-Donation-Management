import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser,setLoading } from "./store/userSlice";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import ManageHosp from "./pages/Admin/ManageHosp";
import DonorLayout from "./pages/Donor/DonorLayout";
import DonorDashboard from "./pages/Donor/DonorDashboard";
import Profile from "./pages/Donor/Profile";
import HospitalLayout from "./pages/Hospital/HospitalLayout";
import HospitalDashboard from "./pages/Hospital/HospitalDashboard";
import CreateRequests from "./pages/Hospital/CreateRequests";
import HospProfile from "./pages/Hospital/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = async () => {
  const token = localStorage.getItem("token");
  console.log("Checking for token on app load...", token);
    if (!token) {
      dispatch(setLoading(false));
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      dispatch(setUser(data.user));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false)); // Set loading to false after check is done
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
    // Admin routes
{
  path: "/admin",
  element: (
    <ProtectedRoute role="admin">
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <AdminDashboard /> },
    { path: "donors", element: <ManageUsers /> },
    { path: "hospitals", element: <ManageHosp /> },
    { path: "settings", element: <div>Settings Page</div> },
  ],
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
