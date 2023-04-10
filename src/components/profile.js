import Form from "./Form";
import { useState } from "react";

export function Profile() {
	const [profileData, setProfileData] = useState({
		firstName: "Lamine",
		lastName: "Brahami",
		email: "jl_brahami@esi.dz",
		phone: "0552186484",
		role: "admin",
		password: "",
	});

	const handleSubmit = (newInputs) => {
		setProfileData({
			...profileData,
			firstName: newInputs[0],
			lastName: newInputs[1],
			email: newInputs[2],
			phone: newInputs[3],
			role: newInputs[4],
			password: newInputs[5],
		});
	};

	return (
		<div className='w-full p-10 flex flex-col gap-8'>
			<h1 className='text-2xl font-bold'>My profile</h1>

			<div className='bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2'>
				<h3 className='text-lg font-semibold'>
					Informations
					<Form data={profileData} onSubmit={handleSubmit} />
				</h3>

				<div className='w-full grid grid-cols-2'>
					<div className='col-span-1 font-medium'>
						Nom : {profileData.firstName}
					</div>
					<div className='col-span-1 font-medium'>
						Prenom : {profileData.lastName}
					</div>
					<div className='col-span-1 font-medium'>
						Email : {profileData.email}
					</div>
					<div className='col-span-1 font-medium'>
						Telephone : {profileData.phone}
					</div>
					<div className='col-span-1 font-medium'>
						Role : {profileData.role}
					</div>
					<div className='col-span-1 font-medium'>
						Password : (not changed 69 days ago)
					</div>
				</div>
			</div>
		</div>
	);
}
