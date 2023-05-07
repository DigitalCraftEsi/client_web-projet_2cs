import { Reclamation, Sidebar } from "../components";
import { Routes, Route } from "react-router-dom";
import { FaMugHot, FaTicketAlt } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";

const links = [
	{
		text: "Boissons",
		icon: FaMugHot,
		url: "/AC/boissons",
	},
	{
		text: "Annonceurs",
		icon: RiAdvertisementFill,
		url: "/AC/annonceurs",
	},
	{
		text: "Reclamation",
		icon: FaTicketAlt,
		url: "/AC/reclamation",
	},
];

export function AC() {
	return (
		<div className='w-full h-full flex '>
			<Sidebar links={links} user={"Moh Gezdia"} />
			<Routes>
				<Route path='/reclamation' element={<Reclamation />} />
			</Routes>
		</div>
	);
}
