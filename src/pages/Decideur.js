import {
	Sidebar,
	Profile,
	DistributeursTable,
	VendingMachineDetails,
	Charts,
} from "../components";
import { Routes, Route, Navigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { HiChartBar } from "react-icons/hi";

const links = [
	// {
	// 	text: "Distributeurs",
	// 	icon: FaStore,
	// 	url: "/Decideur/distributeurs",
	// },
	{
		text: "Statistiques",
		icon: HiChartBar,
		url: "/Decideur/statistiques",
	},
];

export function Decideur() {
	return (
		<div className='w-full h-full flex'>
			<Sidebar links={links} user={"Moh Gezdia"} />
			<Routes>
				<Route path='/' element={<Navigate to="/Decideur/statistiques" />} />
				{/* <Route path='/distributeurs' element={<DistributeursTable />} />
				<Route path='/distributeurs/:id' element={<VendingMachineDetails />} /> */}
				<Route path='/profile' element={<Profile />} />
				<Route path='/statistiques' element={<Charts />} />
			</Routes>
		</div>
	);
}
