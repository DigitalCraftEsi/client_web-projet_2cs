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
		const response = await axiosInstance.get(`/reclamation/${id}`);

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

	async function treatReclamation() {
		let title = reclamationDetails.titre;
		let descr = reclamationDetails.description;
		let notif = true;
		let body = {
			title,
			descr,
			notif,
		};

		const response = await axiosInstance.post(`/reclamation/${id}`, body);

		if (response.data.statusCode === 200) {
			location("/AC/reclamation");
			console.log(reclamationDetails);
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		setShowConfirmation(false); // hide the confirmation form
		treatReclamation();
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
						contenu='Marquer comme terminée'
					></Button>
				)}
				{showConfirmation && ( // show the confirmation form
					<form onSubmit={handleSubmit}>
						<div className='fixed z-50 inset-0 overflow-y-auto'>
							<div className='flex items-center justify-center h-screen'>
								<div className='bg-gray-500 opacity-75 fixed inset-0'></div>
								<div className='w-full max-w-md p-6 relative rounded-lg bg-white shadow-xl'>
									<div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100'>
										<svg
											className='h-6 w-6 text-yellow-600'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											stroke='currentColor'
											aria-hidden='true'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth='2'
												d='M5 13l4 4L19 7'
											></path>
										</svg>
									</div>
									<div className='mt-3 text-center'>
										<h3 className='text-lg leading-6 font-medium text-gray-900'>
											Êtes-vous sûr(e) de vouloir marquer ceci comme terminé ?
										</h3>
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
												contenu='Confirmer'
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
