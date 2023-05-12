import Form from "./Form";
import { useState, useEffect } from "react";
import { axiosInsance } from "../util/axios";

export function Profile() {
	const [profileData, setProfileData] = useState({
		nom: "",
		prenom: "",
		email: "",
		telephone: "",
		role: "",
	});

	const password = {
		oldPassword: "",
		newPassword: "",
	};

	async function getProfile() {
		const response = await axiosInsance.get(`/profile`);
		if (response.data.statusCode === 200) {
			let newData = {
				nom: response.data.data.nomSADM,
				prenom: response.data.data.prenomSADM,
				email: response.data.data.emailSADM,
				telephone: response.data.data.telephoneSADM,
				role: JSON.parse(localStorage.getItem("user")).role,
			};
			setProfileData(newData);
		}
	}

	async function updateProfile(inputs) {
		let fName = inputs[1];
		let lName = inputs[0];
		let email = inputs[2];
		let phone = inputs[3];

		const response = await axiosInsance.post(`/profile`, {
			fName,
			lName,
			email,
			phone,
		});

		if (response.data.statusCode === 200) {
			console.log(response.data.data);
			let newData = {
				...profileData,
				nom: fName,
				prenom: lName,
				email: email,
				telephone: phone,
			};
			setProfileData(newData);
			let oldData = JSON.parse(localStorage.getItem("user"));
			localStorage.setItem("user", JSON.stringify({
				...oldData,
				...newData
			}));
		}
	}

	async function updatePassword(inputs) {
		let oldPassword = inputs[0];
		let newPassword = inputs[1];

		const response = await axiosInsance.post(`/profile/updatePassword`, {
			oldPassword,
			newPassword,
		});

		if (response.data.statusCode === 200) {
			console.log(response.data.data);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<div className='w-full p-10 flex flex-col gap-12'>
			<h1 className='text-2xl font-bold'>My profile</h1>

			<div className='bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2'>
				<h3 className='text-lg font-semibold'>
					Informations
					<Form data={profileData} onSubmit={updateProfile} />
				</h3>

				<div className='w-full grid grid-cols-2'>
					<div className='col-span-1 font-normal mb-1'>
						Nom : {profileData.nom}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Prenom : {profileData.prenom}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Email : {profileData.email}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Telephone : {profileData.telephone}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Role : {profileData.role}{" "}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Password
						<Form data={password} onSubmit={updatePassword} />
					</div>
				</div>
			</div>
		</div>
	);
}
