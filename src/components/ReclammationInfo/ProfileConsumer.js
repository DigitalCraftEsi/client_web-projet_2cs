import { useState, useEffect } from "react";

export function ProfileConsumer({ data }) {
	return (
		<div className='w-full px-10 py-6 flex flex-col gap-8'>
			<div className='bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md border-solid border-2'>
				<h3 className='text-lg font-semibold'>Consommateur</h3>

				<div className='w-full grid grid-cols-2'>
					<div className='col-span-1 font-normal mb-1'>
						Nom : {data.firstName}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Prenom : {data.lastName}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Email : {data.email}
					</div>
					<div className='col-span-1 font-normal mb-1'>
						Telephone : {data.phone}
					</div>
				</div>
			</div>
		</div>
	);
}
