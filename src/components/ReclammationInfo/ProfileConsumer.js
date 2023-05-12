import { useState } from "react";

export function ProfileConsumer() {
	const [profileData, setProfileData] = useState({
		firstName: "Lamine",
		lastName: "Brahami",
		email: "jl_brahami@esi.dz",
		phone: "0552186484",
	});

	return (
		<div className='w-full px-10 py-2 flex flex-col gap-8'>
			<div className='bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2'>
				<h3 className='text-lg font-semibold'>Consommateur</h3>

				<div className='w-full grid grid-cols-2'>
					<div className='col-span-1 font-normal mb-1'>
						Nom : {profileData.firstName}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Prenom : {profileData.lastName}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Email : {profileData.email}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Telephone : {profileData.phone}
					</div>
				</div>
			</div>
		</div>
	);
}
