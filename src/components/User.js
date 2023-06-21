import FormAjout from "./FormAjout";
import { useState, useEffect } from "react";
import { axiosInstance } from "../util/axios";
import { useParams } from "react-router";

/**
 * the page for AM user (tasks, pannes...)
 * @component
 * @returns {React.ReactElement}
 */
export function User() {
	const { id } = useParams();
	const [c1, setC1] = useState("");
	const [c2, setC2] = useState("");
	const [c3, setC3] = useState("");

	const [distributeurs, setDistributeurs] = useState([]);
	const [distributeursAM, setDistributeursAM] = useState([]);

	const labels = {
		idDistributeur: distributeurs,
	};

	const profileData = JSON.parse(localStorage.getItem("user_info"));
	console.log(profileData);

	async function getTasks() {
		const response = await axiosInstance.get(`/task/${id}`);
		if (response.data.statusCode === 200) {
			console.log(response.data.data);
			setC1(calculateTasksInLastWeek(response.data));
			setC2(calculateTasksInLastMonth(response.data));
			setC3(calculateTasksInLastYear(response.data));
		}
	}

	const calculateTasksInLastWeek = (data) => {
		const today = new Date();
		const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
		let taskSum = 0;

		for (const task of data.data) {
			const taskDate = new Date(task.dateDebut);
			if (taskDate >= oneWeekAgo && taskDate <= today) {
				taskSum += 1;
			}
		}

		return taskSum;
	};

	const calculateTasksInLastMonth = (data) => {
		const today = new Date();
		const oneMonthAgo = new Date(
			today.getFullYear(),
			today.getMonth() - 1,
			today.getDate()
		);
		let taskSum = 0;

		for (const task of data.data) {
			const taskDate = new Date(task.dateDebut);
			if (taskDate >= oneMonthAgo && taskDate <= today) {
				taskSum += 1;
			}
		}

		return taskSum;
	};

	const calculateTasksInLastYear = (data) => {
		const today = new Date();
		const oneYearAgo = new Date(
			today.getFullYear() - 1,
			today.getMonth(),
			today.getDate()
		);
		let taskSum = 0;

		for (const task of data.data) {
			const taskDate = new Date(task.dateDebut);
			if (taskDate >= oneYearAgo && taskDate <= today) {
				taskSum += 1;
			}
		}

		return taskSum;
	};

	useEffect(() => {
		getAllDistributeurs();
		getDistributeursAM();
		getTasks();
	}, []);

	async function getAllDistributeurs() {
		const token = localStorage.getItem("token");
		const response = await axiosInstance.get(`/machine`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.data.statusCode == 200) {
			console.log(response.data.data);
			const ids = response.data.data.map((objet) => objet.idDistributeur);
			console.log(ids);
			setDistributeurs(ids);
		}
	}

	async function getDistributeursAM() {
		const response = await axiosInstance.get(`/machine/am/${id}`);
		if (response.data.statusCode == 200) {
			console.log(response.data.data);
			const ids = response.data.data.map((objet) => objet.idDistributeur);
			console.log(ids);
			setDistributeursAM(ids);
		}
	}

	async function handleAddDistToAM(inputs) {
		const machine = parseInt(inputs[0]);
		const am = parseInt(id);
		if (distributeursAM.includes(machine)) {
			console.log("Distributeur déjà affecté !");
			setErr(`Le distributeur ${machine} est déja affecté à l'AM ${id}`);
			setTimeout(() => {
				setErr("");
			}, 2000);

			return;
		}
		setDistributeursAM([...distributeursAM, machine]);
		const response = await axiosInstance.post(`/machine/am`, {
			machine,
			am,
		});
	}

	const [err, setErr] = useState("");

	return (
		<div className='w-full p-10 mt-5 flex flex-col'>
			<h1 className='text-2xl font-bold'>Utilisateurs &gt; {id} </h1>

			<div className='bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2 mt-12'>
				<h3 className='text-lg font-semibold'>Informations</h3>

				<div className='w-full grid grid-cols-2'>
					<div className='col-span-1 font-normal mb-1'>
						Nom : {profileData.nom}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Prenom : {profileData.prenom}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Email : {profileData.email}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Telephone : {profileData.phone}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Role : {profileData.role}{" "}
					</div>
				</div>
			</div>
			{profileData.role == "AM" && (
				<div className='bg-gray-50 flex flex-col gap-4 w-full px-4 py-2 rounded-md border-solid border-2 mt-5'>
					<h3 className='flex text-lg font-semibold'>
						<div className='flex items-center'>
							<h3 className='text-lg font-semibold'>Distributeurs</h3>
							<FormAjout data={labels} onSubmit={handleAddDistToAM} />
						</div>
						<p className='text-red-600  ml-2'>
							{"  "}
							{err}
						</p>
					</h3>
					<table class='table-fixed'>
						<tbody>
							<tr>
								{distributeursAM.map((number) => (
									<td key={number} class='border border-gray-300 px-4 py-2'>
										{number}
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			)}
			{profileData.role == "AM" && (
				<div className='bg-gray-50 flex flex-col gap-4 w-full px-4 py-2 rounded-md border-solid border-2 mt-5'>
					<h3 className='text-lg font-semibold'>Pannes réparées</h3>
					<div className='w-full grid grid-cols-5 justify-center items-center'>
						<div className='relative col-span-1 font-normal mb-1 bg-success mr-2 rounded-lg h-20 text-white'>
							<p className='ml-2'>Cette semaine</p>
							<div className='absolute bottom-0 flex justify-center align-middle right-0 bg-red-500 text-white w-8 h-8 text-center  m-2 rounded-full'>
								<p className=' pt-1'>{c1}</p>
							</div>
						</div>
						<div className='relative col-span-1 font-normal mb-1 bg-ahcici mr-2 rounded-lg h-20 text-white'>
							<p className='ml-2'>Ce mois</p>
							<div className='absolute bottom-0 flex justify-center align-middle right-0 bg-red-500 text-white w-8 h-8 text-center  m-2 rounded-full'>
								<p className=' pt-1'>{c2}</p>
							</div>
						</div>
						<div className='relative col-span-1 font-normal mb-1 bg-ahcici_clair mr-2 rounded-lg h-20 text-black'>
							<p className='ml-2'>Cette année</p>
							<div className='absolute bottom-0 flex justify-center align-middle right-0 bg-red-500 text-white w-8 h-8 text-center  m-2 rounded-full'>
								<p className=' pt-1'>{c3}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
