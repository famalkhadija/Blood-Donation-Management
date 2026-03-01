import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Link } from "react-router-dom";
export default function Header({ title, path }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    // backend logic
    navigate("/login");
  };
  return (
    <div className=" bg-white shadow-sm px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-0">
      {/* Left Title */}
      <h1 className="text-xl font-semibold ">{title}</h1>
      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Profile Icon */}
        <Link to={path}>
        <FaUserCircle size={28} className=" cursor-pointer" />
        </Link>
        {/* Logout Button */}
        <Button onClick={handleLogout} text="Logout" />
      </div>
    </div>
  );
}
