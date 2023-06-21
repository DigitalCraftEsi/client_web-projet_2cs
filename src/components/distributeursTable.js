import DisTable from "./BaseTable/DistTable";
/**
 * a page containing the table of vending machines
 * @component
 * @returns {React.ReactElement}
 */
export function DistributeursTable() {
    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Vending machines</h1>
            <DisTable />
        </div>
    );
}
