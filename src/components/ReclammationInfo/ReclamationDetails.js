import { useState } from "react";
import Button from "../Button/Button";

export function ReclamationDetails({ data }) {
	const toggle = () => {
		setShowDetails(!showDetails);
	};

	const [showDetails, setShowDetails] = useState(false);

	return (
		<div className='w-full px-10 pt-2 flex flex-col gap-10'>
			<h1 className='text-2xl font-semibold mt-12'>
				Reclamation &gt; {data.idCommande}
			</h1>
			<div className='bg-gray-50 flex flex-col w-full p-4 rounded-md border-solid border-2'>
				<div className='font-normal mb-3'>Date : {data.date}</div>
				<div className='font-normal mb-3'>Titre : {data.titre}</div>
				<div className='font-normal mb-3'>Traité: {data.notif ? "oui" : "non"}</div>
				<div className='font-normal mb-3'>
					<p className='inline-block'>Commande : &nbsp;</p>
					<p
						className='inline-block text-success cursor-pointer'
						onClick={toggle}
					>
						{" "}
						{data.idCommande} (afficher détails)
					</p>
				</div>
				<p className='font-medium mb-1'>Description</p>
				<div className='font-normal'>{data.description}</div>
			</div>
			{showDetails && (
				<div className='fixed z-50 inset-0 overflow-y-auto'>
					<div className='flex items-center justify-center h-screen'>
						<div className='bg-gray-500 opacity-75 fixed inset-0'></div>
						<div className='w-full max-w-md p-6 relative rounded-lg bg-white shadow-xl'>
							<div className='my-3'>
								<h3 className='text-lg leading-6 font-medium text-gray-900 text-center'>
									Détails de la commande
								</h3>
								<div>
									<p className='text-sm text-gray-500 mt-6'>
										N° commande : {data.idCommande}
									</p>
									<p className='text-sm text-gray-500 mt-4'>
										Date : {data.dateCommande}
									</p>
									<p className='text-sm text-gray-500 mt-4'>
										Prix : {data.prix}
									</p>
									<p className='text-sm text-gray-500 mt-4'>
										Consommateur : {data.consommateur}
									</p>
								</div>
							</div>
							<div className='flex justify-end mt-4'>
								<Button
									type='Button'
									onclick={toggle}
									color='success'
									contenu='Fermer'
								></Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
