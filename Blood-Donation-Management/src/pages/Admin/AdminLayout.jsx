import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { adminLinks } from "../../data/adminLinks";
import Header from "../../components/Header";
export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row ">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} links={adminLinks} />
      <div className="flex-1 pt-10 px-6 pb-10">
<Header title="Admin Dashboard" />
        <Outlet />
      </div>
    </div>
  );
}
