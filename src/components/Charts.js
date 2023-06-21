import React from "react";
import { Chart } from "./Chart";
import { Chart2 } from "./Chart2";
import { useState } from "react";
import { axiosInstance } from "../util/axios";
import { useEffect } from "react";

export function Charts() {
	const [regions, setRegions] = useState([]);
	const [data, setData] = useState([]);
	const [data2, setData2] = useState({
		statistic2_Week: { success: [], failed: [] },
		statistic2_Month: { success: [], failed: [] },
		statistic2_Year: { success: [], failed: [] },
	});

	async function getStatistics() {
		const token = localStorage.getItem("token");
		const response = await axiosInstance.get(`/statistic`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.data.statusCode === 200) {
			const { address, taux } = response.data.data.statistic1;
			setRegions(address);
			setData(taux);
			setData2(response.data.data);
			console.log(response.data);
		}
	}

	useEffect(() => {
		getStatistics();
	}, []);

	return (
		<div className='w-full p-5'>
			<h1 className='text-2xl font-bold my-10'>Statistiques</h1>
			<div className='w-full grid grid-rows-2 grid-cols-2 gap-4'>
				<Chart title="Taux d'utilisation" data={data} regions={regions} />
				<Chart2 title='Commandes de consommation' data={data2} />
				<Chart2 title='Transactions de paiement' data={data2} />
			</div>
		</div>
	);
}
