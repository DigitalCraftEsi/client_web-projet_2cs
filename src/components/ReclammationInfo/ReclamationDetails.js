import { useState } from "react";

export function ReclamationDetails() {
	const [profileData, setProfileData] = useState({
		date: "24/02/2023 - 15:00",
		titre: "Jai perdu mon chat",
		commande: "23232",
		facture: "33333",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
	});

	return (
		<div className='w-full px-10 py-2 flex flex-col gap-10'>
			<h1 className='text-2xl font-semibold mt-12'>
				Reclamation &gt; {profileData.commande}
			</h1>
			<div className='bg-gray-50 flex flex-col w-full p-4 rounded-md border-solid border-2'>
				<div className='font-normal mb-3'>Date : {profileData.date}</div>
				<div className='font-normal mb-3'>Titre : {profileData.titre}</div>
				<div className='font-normal mb-3'>
					Commande :{" "}
					<a className='text-success' href={`../AC/`}>
						{profileData.commande}
					</a>
				</div>
				<div className='font-normal mb-3'>
					Facture :{" "}
					<a className='text-success' href={``}>
						{profileData.facture}
					</a>
				</div>
				<p className='font-medium mb-1'>Description</p>
				<div className='font-normal'>{profileData.description}</div>
			</div>
		</div>
	);
}
