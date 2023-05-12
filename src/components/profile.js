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
	});

	const [submitExecuted, setSubmitExecuted] = useState(false);

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
				};
				console.log(newData);
				setProfileData(newData);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [submitExecuted]);

	const handleSubmit = (newInputs) => {
		const url = BACKEND_URL + "/profile";
		axios
			.post(
				url,
				{
					lName: newInputs[0],
					fName: newInputs[1],
					email: newInputs[2],
					phone: newInputs[3],
				},
				{ withCredentials: true }
			)
			.then((response) => {
				alert("done");
				setSubmitExecuted(true);
			})
			.catch((error) => {
				console.error(error);
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
					<div className='col-span-1 font-normal mb-1'>Role : admin</div>
					<div className='col-span-1 font-normal mb-1'>
						Password
						{/* <Form data={password} onSubmit={handleSubmitPassword} /> */}
					</div>
				</div>
			</div>
		</div>
	);
}
