import Form from "./Form";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../util/constants";

export function Profile() {
	const [profileData, setProfileData] = useState({
		lastName: "",
		firstName: "",
		email: "",
		phone: "",
		role: "",
		password: "",
	});

	useEffect(() => {
		const url = BACKEND_URL + "/profile";
		axios
			.get(url, { withCredentials: true })
			.then((response) => {
				console.log(response.data.data);
				let res = response.data.data;
				const newData = {
					lastName: res.nomSADM,
					firstName: res.prenomSADM,
					email: res.emailSADM,
					phone: res.telephoneSADM,
					role: "admin",
					password: "",
				};
				console.log(newData);
				setProfileData(newData);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [profileData]);

	const handleSubmit = (newInputs) => {
		setProfileData({
			...profileData,
			lastName: newInputs[0],
			firstName: newInputs[1],
			email: newInputs[2],
			phone: newInputs[3],
			role: newInputs[4],
			password: newInputs[5],
		});
	};

	return (
		<div className='w-full p-10 flex flex-col gap-12'>
			<h1 className='text-2xl font-bold'>My profile</h1>

			<div className='bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2'>
				<h3 className='text-lg font-semibold'>
					Informations
					<Form data={profileData} onSubmit={handleSubmit} />
				</h3>

				<div className='w-full grid grid-cols-2'>
					<div className='col-span-1 font-normal mb-1'>
						Nom : {profileData.lastName}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Prenom : {profileData.firstName}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Email : {profileData.email}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Telephone : {profileData.phone}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Role : {profileData.role}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Password : (not changed 69 days ago)
					</div>
				</div>
			</div>
		</div>
	);
}
