import { Sidebar, ClientsTable, DistributeursTable } from "../components";
import { Routes, Route } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import ClientInfo from "../components/ClientInfo/ClientInfo";

const links = [
  {
    text: "Vending machines",
    icon: FaStore,
    url: "/SADM/distributeurs",
  },
  {
    text: "Clients",
    icon: FaUserFriends,
    url: "/SADM/clients",
  },
];


export function SADM() {
  return (
    <div className="w-full h-full flex ">
      <Sidebar links={links} user={"Moh Gezdia"} />
      <Routes>
        <Route path="/clients" element={<ClientsTable />} />
        <Route path="/clients/:id" element={<ClientInfo />} />
        <Route path="/distributeurs" element={<DistributeursTable />} />
      </Routes>
    </div>
  );
}
