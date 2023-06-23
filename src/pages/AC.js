import { Sidebar, Profile } from "../components";
import { Routes, Route, Navigate } from "react-router-dom";
import { FaMugHot, FaTicketAlt } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import BoissonTableFirst from "../components/BoissonTableFirst";
import { ReclamationTable } from "../components/ReclamationTable";
import Reclamation from "../components/ReclammationInfo/Reclamation";
import AnnonceTable from "../components/AdComponents/AnnonceTable";
import ClientInfo from "../components/AdComponents/ClientInfo";
import AnnonceInfo from "../components/AdComponents/AnnonceInfo";

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
		text: "Reclamations",
		icon: FaTicketAlt,
		url: "/AC/reclamations",
	},
];

/**
 * the AC page
 * @component
 * @returns {React.ReactElement}
 */
export function AC() {
	return (
		<div className='w-full h-full flex '>
			<Sidebar links={links} />
			<Routes>
				<Route path="/" element={<Navigate to="/AC/boissons" />} />
				<Route path="/boissons" element={<BoissonTableFirst />} />
				<Route path="/annonceurs" element={< AnnonceTable/>} />
				<Route path="/annonceurs/:id" element={<ClientInfo/>} />
				<Route path="/annonceurs/:id/:annonceId" element={<AnnonceInfo/>} />
				<Route path="/reclamations" element={<ReclamationTable/>} />
				<Route path="/reclamations/:id" element={ <Reclamation/> } />
				<Route path="/profile" element={ <Profile/> } />
			</Routes>
		</div>
	);
}
