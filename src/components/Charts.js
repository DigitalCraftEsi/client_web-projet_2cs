import { LineChart } from "./lineChart";
import React from "react";
import { Chart } from "./Chart";
import { Chart2 } from "./Chart2";

export function Charts() {
	return (
		<div className='w-full p-5'>
			<h1 className='text-2xl font-bold my-10'>Statistiques</h1>
			<div className='w-full grid grid-rows-2 grid-cols-2 gap-4'>
				<Chart title={"Taux d'utilisation"}></Chart>
				<Chart2 title={"Commandes de consommation"}></Chart2>
				<Chart2 title={"Transactions de paiement"}></Chart2>
			</div>
		</div>
	);
}
