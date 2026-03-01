import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { hospitalLinks } from "../../data/hospitalLinks";
import Header from "../../components/Header";
export default function HospitalLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row ">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} links={hospitalLinks} />
      <div className="flex-1 p-6">
<Header title="Hospital Dashboard" path="/hospital/profile" />
        <Outlet />
      </div>
    </div>
  );
}
