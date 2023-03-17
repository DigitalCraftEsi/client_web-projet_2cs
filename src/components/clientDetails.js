import ClientInfo from "../components/ClientInfo/ClientInfo";
import AccountInfo from "../components/AccountInfo/AccountInfo";
import DisTable from "./BaseTable/DistTable";

export function ClientDetails() {
  return (
    <div className="w-full p-10 flex flex-col gap-10">
      <h1 className="text-2xl font-bold">Clients \ Hot Beans</h1>
      <ClientInfo />
      <AccountInfo />
      <DisTable />
    </div>
  );
}
