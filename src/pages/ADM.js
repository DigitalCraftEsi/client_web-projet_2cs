import { Sidebar, VendingMachineDetails, Profile, User } from "../components";
import { Routes, Route, Navigate } from "react-router-dom";
import { FaStore, FaUserFriends } from "react-icons/fa";
import ADMmachinesTable from "../components/ADMmachinesTable";
import ADMusersTable from "../components/ADMusersTable";

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
	},
];

/**
 * the ADM page
 * @component
 * @returns {React.ReactElement}
 */
export function ADM() {
	return (
		<div className='w-full h-full flex '>
			<Sidebar links={links} />
			<Routes>
				<Route path='/' element={<Navigate to='/ADM/machines' />} />
				<Route path='/machines' element={<ADMmachinesTable />} />
				<Route path='/machines/:id' element={<VendingMachineDetails />} />
				<Route path='/users' element={<ADMusersTable />} />
				<Route path='/users/:id' element={<User />} />
				<Route path='/profile' element={<Profile />} />
			</Routes>
		</div>
	);
}
