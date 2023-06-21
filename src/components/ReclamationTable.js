import ReclamTable from "./BaseTable/ReclamTable";

/**
 * the reclamations page
 * @component
 * @returns {React.ReactElement}
 */
export function ReclamationTable() {
	return (
		<div className='p-10'>
			<h1 className='text-2xl font-bold mb-4'>Reclamations</h1>
			<ReclamTable />
		</div>
	);
}
