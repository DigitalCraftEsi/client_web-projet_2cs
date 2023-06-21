import Form from "./Form";
import { useState, useEffect } from "react";
import { axiosInstance } from "../util/axios";

export function Profile() {
	const data = JSON.parse(localStorage.getItem("user"));

	const [profileData, setProfileData] = useState({
		nom: data.nom,
		prenom: data.prenom,
		email: data.email,
		telephone: data.telephone,
		role: data.role,
	});

	const password = {
		oldPassword: "",
		newPassword: "",
	};

	async function getProfile() {
		const token = localStorage.getItem("token");
		const response = await axiosInstance.get(`/profile`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.data.statusCode === 200) {
			const role = JSON.parse(localStorage.getItem("user")).role;
			if (role === "SADM") {
				let newData = {
					nom: response.data.data.nomSADM,
					prenom: response.data.data.prenomSADM,
					email: response.data.data.emailSADM,
					telephone: response.data.data.telephoneSADM,
					role,
				};
				setProfileData(newData);
			} else if (role === "ADM") {
				let newData = {
					nom: response.data.data.nomADM,
					prenom: response.data.data.prenomADM,
					email: response.data.data.emailADM,
					telephone: response.data.data.telephoneADM,
					idClient: response.data.data.idClient,
					role,
				};
				setProfileData(newData);
			}
		}
	}

	async function updateProfile(inputs) {
		let fName = inputs[1];
		let lName = inputs[0];
		let email = inputs[2];
		let phone = inputs[3];

		const token = localStorage.getItem("token");
		const response = await axiosInstance.post(
			`/profile`,
			{
				fName,
				lName,
				email,
				phone,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (response.data.statusCode === 200) {
			console.log(response.data.data);
			let newData = {
				...profileData,
				nom: lName,
				prenom: fName,
				email: email,
				telephone: phone,
			};
			setProfileData(newData);
			let oldData = JSON.parse(localStorage.getItem("user"));
			localStorage.setItem(
				"user",
				JSON.stringify({
					...oldData,
					...newData,
				})
			);
		}
	}

	async function updatePassword(inputs) {
		let oldPassword = inputs[0];
		let newPassword = inputs[1];

		const token = localStorage.getItem("token");

		const response = await axiosInstance.post(
			`/profile/updatePassword`,
			{
				oldPassword,
				newPassword,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

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
