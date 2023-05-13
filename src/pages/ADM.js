import {
  Sidebar,
  ClientsTable,
  ClientDetails,
  VendingMachineDetails,
  Profile,
} from "../components";
import { Routes, Route, Navigate } from "react-router-dom";
import { FaBell, FaStore, FaUserFriends } from "react-icons/fa";
import NotificationsTable from "../components/BaseTable/NotificationsTable";
import ADMmachinesTable from "../components/ADMmachinesTable";

const links = [
  {
    text: "Vending machines",
    icon: FaStore,
    url: "/ADM/machines",
  },
  {
    text: "Users",
    icon: FaUserFriends,
    url: "/ADM/users",
  }
];

export function ADM() {
  return (
    <div className="w-full h-full flex ">
      <Sidebar links={links} />
      <Routes>
        <Route path="/" element={<Navigate to="/ADM/machines" />} />
        <Route path="/machines" element={<ADMmachinesTable />} />
        <Route path="/machines/:id" element={<VendingMachineDetails />} />
        <Route path="/users" element={<ClientsTable />} />
        <Route path="/users/:id" element={<ClientDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
