import { Sidebar, DistributeursTable, ClientsTable, ClientDetails, NotificationDetails } from "../components";
import { Routes, Route } from "react-router-dom";
import { FaBell, FaStore, FaUserFriends  } from "react-icons/fa";
import NotificationsTable from "../components/BaseTable/NotificationsTable";


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
        <Route path="/notifications" element={<NotificationsTable />} />
        <Route path="/notifications/:id" element={<NotificationDetails />} />
      </Routes>
    </div>
  );
}
