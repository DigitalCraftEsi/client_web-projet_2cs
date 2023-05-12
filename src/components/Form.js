import React, { useState, useEffect } from "react";
import Button from "./Button/Button";
import { FaEdit } from "react-icons/fa";

function Form({ data, onSubmit }) {
	const labels = Object.keys(data).map(
		(label) => label.charAt(0).toUpperCase() + label.slice(1)
	);
	const [showForm, setShowForm] = useState(false);
	const [inputs, setInputs] = useState(Object.values(data));

	useEffect(() => {
		setInputs(Object.values(data));
	}, [data]);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(inputs);
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
			<div key={id} className='grid grid-cols-2 gap-4 my-4'>
				<label className='block text-gray-700 font-bold'>{label}</label>
				<div className='flex'>
					{
						<input
							className='appearance-none border rounded w-full py-2 px-3 h-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id={id}
							type='text'
							value={inputs[index]}
							onChange={(e) => handleInputChange(e, index)}
							disabled={label === "Role"}
						/>
					}
				</div>
			</div>
		);
	});

	return (
		<div className='inline'>
			<button
				className='text-success underline hover:text-blue-700 ml-3 text-sm'
				onClick={toggleForm}
			>
				{showForm ? "Annuler" : <FaEdit size={12} />}
			</button>
			{showForm && (
				<div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white rounded-lg p-8 w-1/3'>
						<form onSubmit={handleSubmit}>
							{inputFields}
							<br />

							<div className='flex items-center justify-between'>
								<Button contenu='Annuler' type='button' onclick={toggleForm} />
								<Button contenu='Sauvegarder' type='submit' />
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default Form;
