import { MdDashboard } from "react-icons/md";
import {  FaHospital } from "react-icons/fa";
import { BiSolidDonateBlood } from "react-icons/bi";
import { IoIosSettings } from "react-icons/io";

export const adminLinks = [
  { name: "Dashboard", path: "/admin", icon: MdDashboard },
  { name: "Donors", path: "/admin/donors", icon: BiSolidDonateBlood },
  { name: "Hospitals", path: "/admin/hospitals", icon: FaHospital },
  { name: "Settings", path: "/admin/settings", icon: IoIosSettings },
];