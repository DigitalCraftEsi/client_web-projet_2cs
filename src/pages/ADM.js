import { Sidebar, DistributeursTable, ClientsTable, ClientDetails } from "../components";
import { Routes, Route } from "react-router-dom";
import { FaBell, FaStore } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";


const links = [
  {
    text: "Vending machines",
    icon: FaStore,
    url: "/ADM/distributeurs",
  },
  {
    text: "Users",
    icon: FaUserFriends,
    url: "/ADM/users",
  },
  {
    text: "Notifications",
    icon: FaBell,
    url: "/ADM/notifications"
  }
];


export function ADM() {
  return (
    <div className="w-full h-full flex ">
      <Sidebar links={links} user={"Moh Gezdia"} />
      <Routes>
        <Route path="/distributeurs" element={<DistributeursTable />} />
        <Route path="/users" element={<ClientsTable />} />
        <Route path="/users/:id" element={<ClientDetails />} />
        <Route path="/notifications" element={<div>notif</div>} />
      </Routes>
    </div>
  );
}
