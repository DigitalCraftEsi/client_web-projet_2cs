import CoreTable from "./BaseTable/CoreTable";

/**
 * a page containing the table of clients
 * @component
 * @returns {React.ReactElement}
 */
export function ClientsTable() {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Clients</h1>
            <CoreTable />
        </div>
    );
}