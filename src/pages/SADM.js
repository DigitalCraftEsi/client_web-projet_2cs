import { Sidebar, ClientsTable, DistributeursTable, ClientDetails, Profile, VendingMachineDetails } from "../components";
import { Routes, Route } from "react-router-dom";
import { FaStore, FaUser } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import SADMusersTable from "../components/SADMusersTable";
import SADMclientADMTable from "../components/SADMclientADMTable";


const links = [
  {
    text: "Vending machines",
    icon: FaStore,
    url: "/SADM/distributeurs",
  },
  {
    text: "Clients",
    icon: FaUser,
    url: "/SADM/clients",
  },
  {
    text: "ADMs",
    icon: FaUserFriends,
    url: "/SADM/users"
  }
];


export function SADM() {
  return (
    <div className="w-full h-full flex ">
      <Sidebar links={links} />
      <Routes>
        <Route path="/clients" element={<ClientsTable />} />
        <Route path="/clients/:id" element={<ClientDetails />} />
        <Route path="/distributeurs" element={<DistributeursTable />} />
        <Route path="/distributeurs/:id" element={<VendingMachineDetails />} />
        <Route path="/users" element={<SADMusersTable/>} />
        <Route path="/users/:id" element={<SADMclientADMTable />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
