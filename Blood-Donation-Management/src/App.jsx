import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
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
function App() {
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
      element: <AdminLayout />,
      children: [
        { index: "/", element: <AdminDashboard /> },
        { path: "donors", element: <ManageUsers /> },
        { path: "hospitals", element: <ManageHosp /> },
        { path: "settings", element: <div>Settings Page</div> },
      ],
    },
    //Donor routes
    {
      path: "/donor",
      element: <DonorLayout />,
      children: [
        { index: "/", element: <DonorDashboard /> },  
        { path: "profile", element: <Profile /> },
      ],
    },
    //Hospital routes
    {
      path: "/hospital",
      element: <HospitalLayout />,
      children: [
        { index: "/", element: <HospitalDashboard /> },
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
