import React, { useState } from "react";
import logo from "../assets/blood-icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
export default function SideBar({ isOpen, links, setIsOpen }) {
  return (
    <>
      {/* toggle button */}
      <div
        className={`hamburger pt-5 px-5 md:hidden z-20 ${isOpen ? "bg-gray-180 " : "bg-transparent w-auto"}`}
      >
        <button className="cursor-pointer " onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu size={25} />
        </button>
      </div>
      <div className={`${isOpen ? "fixed z-10 block" : "hidden"} md:block`}>
        <div className=" bg-gray-100  h-screen py-14 px-1">
          <div className=" flex justify-center items-center pt-5 gap-2">
            <img className="w-14" src={logo} alt="logo" />
            <h1 className="font-bold text-xl text-purple-950 pt-5">BDMS</h1>
          </div>

          <ul className=" mt-14 px-1 xl:px-11 flex flex-col gap-12">
            {links.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    ` flex items-center gap-2 p-3 rounded hover:bg-gray-300 ${isActive ? "text-purple-950 bg-gray-300" : "text-black"}`
                  }
                >
                  <Icon size={22} />
                  {item.name}
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
