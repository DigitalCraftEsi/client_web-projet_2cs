import React, { useState } from "react";
import Button from "./Button/Button";

function Form({ data }) {
	const labels = Object.keys(data).map(
		(label) => label.charAt(0).toUpperCase() + label.slice(1)
	);
	let values = Object.values(data);
	const [showForm, setShowForm] = useState(false);
	const [inputs, setInputs] = useState(Object.values(data));

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(`Inputs: ${inputs}`);
		toggleForm();
	};

	const handleInputChange = (event, index) => {
		const newInputs = [...inputs];
		newInputs[index] = event.target.value;
		setInputs(newInputs);
	};

	const toggleForm = () => {
		setShowForm(!showForm);
	};

	const inputFields = labels.map((label, index) => {
		const id = `input-${index}`;
		return (
			<div key={id} className='grid grid-cols-2 gap-4 mb-2'>
				<label className='block text-gray-700 font-bold mb-2'>{label}</label>
				<input
					className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
					id={id}
					type='text'
					value={inputs[index]}
					onChange={(e) => handleInputChange(e, index)}
				/>
			</div>
		);
	});

	return (
		<div className='inline'>
			<button
				className='text-success underline hover:text-blue-700 ml-3 text-sm'
				onClick={toggleForm}
			>
				{showForm ? "Modifier" : "Modifier"}
			</button>
			{showForm && (
				<div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white rounded-lg p-8 w-1/3'>
						<form onSubmit={handleSubmit}>
							{inputFields}
							<br />

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
