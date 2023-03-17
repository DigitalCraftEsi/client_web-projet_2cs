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
						<h2 className='text-xl font-bold mb-4'>Assigner à un client</h2>
						<form onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label
									className='block text-gray-700 font-bold mb-2'
									htmlFor='client'
								>
									Client
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
							<div className='flex items-center justify-between'>
								<Button contenu='Annuler' type='Button' onclick={toggleForm} />
								<Button contenu='Assigner' type='Submit' />
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default Form;
