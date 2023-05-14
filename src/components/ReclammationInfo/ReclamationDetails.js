import { useState } from "react";

export function ReclamationDetails({ data }) {
	return (
		<div className='w-full px-10 pt-2 flex flex-col gap-10'>
			<h1 className='text-2xl font-semibold mt-12'>
				Reclamation &gt; {data.commande}
			</h1>
			<div className='bg-gray-50 flex flex-col w-full p-4 rounded-md border-solid border-2'>
				<div className='font-normal mb-3'>Date : {data.date}</div>
				<div className='font-normal mb-3'>Titre : {data.titre}</div>
				<div className='font-normal mb-3'>
					Commande :{" "}
					<a className='text-success' href={`../AC/`}>
						{data.commande}
					</a>
				</div>
				<div className='font-normal mb-3'>
					Facture :{" "}
					<a className='text-success' href={``}>
						{data.facture}
					</a>
				</div>
				<p className='font-medium mb-1'>Description</p>
				<div className='font-normal'>{data.description}</div>
			</div>
		</div>
	);
}
