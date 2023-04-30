import { LineChart } from "./lineChart";
import React from "react";

export function Charts() {
	return (
		<div className='w-full m-5'>
			<h1 className='text-2xl font-bold mb-5'>Statistiques</h1>
			<div className='w-full grid grid-rows-2 grid-cols-2 gap-4'>
				<div>
					<LineChart title="Taux d'utilisation" show={true} />
				</div>
				<div>
					<LineChart title='Commades de consommation' show={false} />
				</div>
				<div>
					<LineChart title='Transactions de paiement' show={false} />
				</div>
			</div>
		</div>
	);
}
