import React, { useState, useEffect } from "react";
import CoreTableBoisson from "./BaseTable/CoreTableBoisson";
import { axiosInstance } from "../util/axios";


const BoissonTableFirst = () => {
	const [distroList, setDirstroList] = useState([]);

	const fetchDist = async () => {
		const token = localStorage.getItem("token");
		try {
			const response = await axiosInstance.get("/machine", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			
			const user = JSON.parse(localStorage.getItem("user"));

			const fetchedData = response.data.data.filter(dist => dist.idClient == user.clientId);
			setDirstroList(fetchedData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchDist();
	}, []);

	return (
		<div className='p-10'>
			<h1 className='text-2xl font-bold mb-4'>Annonceurs</h1>
			<div className='flex justify-start align-baseline p-2 gap-3 '>
				<h2 className=' text-2xl font-medium'> Distributeur</h2>
				<select className='w-80 border-2 border-black rounded'>
					{distroList.map((dist, index) => (
						<option value={dist.id} key={index}>
							{dist.idDistributeur} {" - "}
							{dist.adresse}{" "}
						</option>
					))}
				</select>
			</div>
			<CoreTableBoisson />
		</div>
	);
};
export default BoissonTableFirst;
