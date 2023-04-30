import React, { useState } from "react";
import Button from "../Button/Button";

function Form(props) {
	const [showForm, setShowForm] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({ firstName, lastName, email, phone, password });
		setShowForm(false);
	};

	const toggleForm = () => {
		setShowForm(!showForm);
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
						<h2 className='text-xl font-bold mb-4'>
							Ajouter un compte administrateur
						</h2>
						<form onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label
									className='block text-gray-700 font-bold mb-2'
									htmlFor='firstName'
								>
									Prenom
								</label>
								<input
									className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='firstName'
									type='text'
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block text-gray-700 font-bold mb-2'
									htmlFor='lastName'
								>
									Nom
								</label>
								<input
									className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='lastName'
									type='text'
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block text-gray-700 font-bold mb-2'
									htmlFor='email'
								>
									Email
								</label>
								<input
									className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block text-gray-700 font-bold mb-2'
									htmlFor='phone'
								>
									Telephone
								</label>
								<input
									className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='phone'
									type='tel'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
							<div className='mb-4'>
								<label
									className='block text-gray-700 font-bold mb-2'
									htmlFor='password'
								>
									Mot de passe
								</label>
								<input
									className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
									id='password'
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className='flex items-center justify-between'>
								<Button contenu='Annuler' type='Button' onclick={toggleForm} />
								<Button contenu='Créer' type='Submit' onclick={handleSubmit} />
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default Form;
