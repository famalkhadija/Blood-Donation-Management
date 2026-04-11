import { FaPlusCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { MdViewList } from "react-icons/md";
export const hospitalLinks = [
  {
    name: "Dashboard",
    path: "/hospital",
    icon: MdDashboard,
  },
  {
    name: "Create Request",
    path: "/hospital/create-requests",
    icon: FaPlusCircle,
  },
  {
      name: "View Requests",
      path: "/hospital/show-requests",
      icon: MdViewList,
  },
  { name: "Settings",
     path: "/hospital/profile", icon: IoIosSettings },
];


