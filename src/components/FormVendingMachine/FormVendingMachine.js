import React, { useState } from "react";
import Button from "../Button/Button";

function Form(props) {
	const [showForm, setShowForm] = useState(false);
	const [address, setAddress] = useState("");
	const [client, setClient] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ address, client });
		setShowForm(false);
	};

	const toggleForm = () => {
		setShowForm(!showForm);
	};

	const [selectedFile, setSelectedFile] = useState(null);

	// Handle the certificate
	const handleFileInput = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleUploadButton = () => {
		const formData = new FormData();
		formData.append("image", selectedFile);

		// Send formData to the server for further processing
		// ...

		// Clear the selected file
		setSelectedFile(null);
	};

	return (
		<div className='inline'>
			<button
				className='text-success underline hover:text-blue-700 ml-3'
				onClick={toggleForm}
			>
				{showForm ? props.contenu2 : props.contenu1}
			</button>
			{showForm && (
				<div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white rounded-lg p-8 w-1/3'>
						<h2 className='text-xl font-bold mb-4'>Nouveau distributeur</h2>
						<form onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label
									className='block text-gray-700 font-bold mb-2'
									htmlFor='address'
								>
									Adresse
								</label>
								<input
									className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='address'
									type='text'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block text-gray-700 font-bold mb-2'
									htmlFor='client'
								>
									Client (optionnel)
								</label>
								<select
									className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='client'
									type='text'
									value={client}
									onChange={(e) => setClient(e.target.value)}
								>
									<option></option>
									<option>Lamine</option>
								</select>
							</div>
							<div className='flex items-center justify-between mb-10'>
								<h1>Certificat : </h1>
							</div>
							<div className='flex items-center justify-between'>
								<Button contenu='Annuler' type='Button' onclick={toggleForm} />
								<Button contenu='Créer' type='Submit' />
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

function ImageUpload() {}

export default Form;
