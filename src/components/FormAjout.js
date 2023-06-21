import React, { useState, useEffect } from "react";
import Button from "./Button/Button";
import { FaPlus } from "react-icons/fa";

function Form({ data, onSubmit }) {
	const labels = Object.keys(data);
	const [showForm, setShowForm] = useState(false);
	const [inputs, setInputs] = useState([Object.values(data)]);

	useEffect(() => {
		setInputs(Object.values(data));
	}, [data]);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(inputs);
		toggleForm();
	};

	const handleInputChange = (event, index) => {
		const { value } = event.target;
		const newInputs = [...inputs];
		newInputs[index] = value;
		setInputs(newInputs);
	};

	const toggleForm = () => {
		setShowForm(!showForm);
	};

	const inputFields = labels.map((label, index) => {
		const id = `input-${index}`;
		console.log(data[label]);
		return (
			<div key={id} className='grid grid-cols-2 gap-4 my-4'>
				<label className='block text-gray-700 font-bold'>{label}</label>
				<div className='flex'>
					{
						<select
							className='appearance-none border rounded w-full py-2 px-3 h-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id={id}
							value={inputs[index]}
							onChange={(event) => handleInputChange(event, index)}
						>
							{data[label].map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
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
				{showForm ? "" : <FaPlus size={12} />}
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
