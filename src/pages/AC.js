import { Sidebar } from "../components";
import { Routes, Route } from "react-router-dom";
import { FaMugHot, FaTicketAlt } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import BoissonTableFirst from "../components/BoissonTableFirst";
import { ReclamationTable } from "../components/ReclamationTable";
import Reclamation from "../components/ReclammationInfo/Reclamation";

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
				<Route path="/boissons" element={<BoissonTableFirst />} />
				<Route path="/annonceurs" element={""} />
				<Route path="/annonceurs/:id" element={""} />
				<Route path="/annonceurs/:id/:annonceId" element={""} />
				<Route path="/reclamation" element={<ReclamationTable/>} />
				<Route path="/reclamation/:id" element={ <Reclamation/> } />
			</Routes>
		</div>
	);
}
