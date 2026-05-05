import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { donorLinks } from "../../data/donorLinks";
import Header from "../../components/Header";
export default function DonorLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row ">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} links={donorLinks} />
      <div className="flex-1 pt-10 px-3 pb-10">
        <Header title="Donor Dashboard" path="/donor/profile" />
        <Outlet />
      </div>
    </div>
  );
}
