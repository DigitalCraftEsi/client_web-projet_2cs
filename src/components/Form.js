import React, { useState, useEffect } from "react";
import Button from "./Button/Button";

function Form({ data, onSubmit }) {
	const labels = Object.keys(data).map(
		(label) => label.charAt(0).toUpperCase() + label.slice(1)
	);
	const initialInputs = Object.values(data);
	const [showForm, setShowForm] = useState(false);
	const [inputs, setInputs] = useState(initialInputs);
	const [originalInputs, setOriginalInputs] = useState(initialInputs);
	const [newPassword, setNewPassword] = useState("");

	useEffect(() => {
		setOriginalInputs(initialInputs);
	}, [data, initialInputs]);

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(inputs);
		toggleForm();
	};

	const handleInputChange = (event, index) => {
		const newInputs = [...inputs];
		newInputs[index] = event.target.value;
		setInputs(newInputs);

		// Check if the label is "Previous Password" and update the state accordingly
		if (labels[index] === "New Password") {
			setNewPassword(event.target.value);
		}
	};

	const toggleForm = () => {
		setInputs(originalInputs);
		setShowForm(!showForm);
	};

	const inputFields = labels.map((label, index) => {
		const id = `input-${index}`;
		return (
			<div key={id} className='grid grid-cols-2 gap-4 mb-2'>
				<label className='block text-gray-700 font-bold mb-2'>{label}</label>
				<div className='flex'>
					{label === "Password" ? (
						<>
							<input
								className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								id={id}
								type='password'
								placeholder='Previous Password'
								value={inputs[index]}
								onChange={(e) => handleInputChange(e, index)}
							/>
							<input
								className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
								id='new-password'
								type='password'
								placeholder='New Password'
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</>
					) : (
						<input
							className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id={id}
							type='text'
							value={inputs[index]}
							onChange={(e) => handleInputChange(e, index)}
						/>
					)}
				</div>
			</div>
		);
	});

	const hasChanged = inputs.some(
		(value, index) => value !== originalInputs[index]
	);

	return (
		<div className='inline'>
			<button
				className='text-success underline hover:text-blue-700 ml-3 text-sm'
				onClick={toggleForm}
			>
				{showForm ? "Annuler" : "Modifier"}
			</button>
			{showForm && (
				<div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center'>
					<div className='bg-white rounded-lg p-8 w-1/2'>
						<form onSubmit={handleSubmit}>
							{inputFields}
							<br />

							<div className='flex items-center justify-between'>
								<Button contenu='Annuler' type='button' onclick={toggleForm} />
								<Button
									contenu='Sauvegarder'
									type='submit'
									disabled={!hasChanged}
								/>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default Form;
