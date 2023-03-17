import React from "react";
import FormClient from "../FormClient/FormClient";

const ClientInfo = (props) => {
	return (
		<div className=' px-6 py-4 '>
			<div className='container w-full rounded-sm shadow hover:shadow-lg bg-gray-50 p-4 border-solid border-2'>
				<div className='mb-4'>
					<h3 className='inline'>
						<b>Informations</b>
					</h3>
					<FormClient contenu1='Modifier' contenu2='' />
				</div>

				<div className='grid grid-cols-3 gap-4'>
					<p className='col'>Nom : {props.data[0].nom}</p>
					<p className='col'>Telephone : {props.data[0].telephone}</p>
				</div>
				<p>Email : {props.data[0].email}</p>
			</div>
		</div>
	);
};

export default ClientInfo;
