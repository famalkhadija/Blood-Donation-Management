import React, { useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5000";
export default function SideBar({ isOpen, links, setIsOpen }) {
  const sidebarRef = useRef();
  const buttonRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);
  return (
    <>
      {/* hamburger toggle button */}
      <div
        className={`hamburger pt-2 px-5 lg:hidden z-20 fixed  ${isOpen ? "bg-gray-180 " : "bg-transparent w-auto"}`}
        ref={buttonRef}
      >
        <button className="cursor-pointer " onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu size={25} />
        </button>
      </div>
      <div
        ref={sidebarRef}
        className={`${isOpen ? "fixed z-10 block" : "hidden"} lg:block`}
      >
        <div className="h-screen lg:w-[20vw] bg-gray-100 py-14 px-1">
          <div className=" flex justify-center items-center pt-5 gap-2">
            <img className="w-80" src="/blood-icon.png" />{" "}
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
