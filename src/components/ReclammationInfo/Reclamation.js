import React, { useState, useEffect } from "react";
import { ProfileConsumer } from "./ProfileConsumer";
import { ReclamationDetails } from "./ReclamationDetails";
import Button from "../Button/Button";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

export default function Reclamation() {
	const [profileData, setProfileData] = useState({});
	const [reclamationDetails, setReclamationDetails] = useState({});
	const [showConfirmation, setShowConfirmation] = useState(false);
	const { id } = useParams();
	const location = useNavigate();

	async function getReclamationById() {
		const token = localStorage.getItem("token");
		const response = await axiosInstance.get(`/reclamation/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.data.statusCode === 200) {
			const profileData = {
				firstName: response.data.data.commande.consommateur.prenomConsommateur,
				lastName: response.data.data.commande.consommateur.nomConsommateur,
				email: response.data.data.commande.consommateur.emailConsommateur,
				phone: response.data.data.commande.consommateur.telephoneConsommateur,
			};
			const reclamationDetails = {
				date: response.data.data.dateReclamation,
				titre: response.data.data.titre,
				idCommande: response.data.data.commande.idCommande,
				prix: response.data.data.commande.prix,
				consommateur:
					response.data.data.commande.consommateur.nomConsommateur +
					" " +
					response.data.data.commande.consommateur.prenomConsommateur,
				dateCommande: response.data.data.commande.dateCommande,
				description: response.data.data.description,
			};
			setProfileData(profileData);
			setReclamationDetails(reclamationDetails);
			console.log(reclamationDetails);
		}
	}

	async function treatReclamation(title, description) {
		let descr = description;
		let reclamation = parseInt(id);
		let body1 = {
			title,
			descr,
			reclamation,
		};
		const token = localStorage.getItem("token");
		const response1 = await axiosInstance.post(`/response`, body1, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response1.data.statusCode === 200) {
			let title = reclamationDetails.titre;
			let descr = reclamationDetails.description;
			let notif = true;
			let body = {
				title,
				descr,
				notif,
			};

			const response = await axiosInstance.post(`/reclamation/${id}`, body, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.data.statusCode === 200) {
				location("/AC/reclamation");
				console.log(reclamationDetails);
			}
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		const titleInput = document.getElementById("title");
		const descriptionInput = document.getElementById("description");
		const title = titleInput.value;
		const description = descriptionInput.value;
		setShowConfirmation(false);
		treatReclamation(title, description);
	}

	useEffect(() => {
		getReclamationById();
	}, []);

	return (
		<div className='w-full flex flex-col '>
			<ReclamationDetails data={reclamationDetails}></ReclamationDetails>
			<ProfileConsumer data={profileData}></ProfileConsumer>
			<div className='flex items-center justify-end mr-10 mb-6'>
				{!showConfirmation && ( // conditionally render the button or confirmation form
					<Button
						type='Button'
						onclick={() => setShowConfirmation(true)} // show the confirmation form
						color='success'
						contenu='Répondre'
					></Button>
				)}
				{showConfirmation && ( // show the confirmation form
					<form onSubmit={handleSubmit}>
						<div className='fixed z-50 inset-0 overflow-y-auto'>
							<div className='flex items-center justify-center h-screen'>
								<div className='bg-gray-500 opacity-75 fixed inset-0'></div>
								<div className='w-full max-w-md p-6 relative rounded-lg bg-white shadow-xl'>
									<div className='mt-3'>
										<h3 className='text-xl mb-5'>
											Répondre à{" "}
											<b>
												{profileData.firstName} {profileData.lastName}
											</b>
										</h3>
									</div>
									<div className='mt-3'>
										<label className=''>Objet</label>
										<input
											className='appearance-none border rounded w-full mb-3 mt-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											type='text'
											id='title'
										/>
										<label>Corps</label>
										<textarea
											className='appearance-none border rounded w-full py-2 px-3 mb-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
											id='description'
										/>
									</div>
									<div className='mt-5'>
										<div className='flex justify-between'>
											<Button
												type='button'
												onclick={() => setShowConfirmation(false)}
												color='danger'
												contenu='Annuler'
											></Button>
											<Button
												type='submit'
												color='success'
												contenu='Envoyer'
											></Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
