import React from "react";
import FormClient from "../FormClient/FormClient";

const ClientInfo = (props) => {

    const data = {
        nom: "somone",
        prenom: "prenom",
        telephone: "1234567",
        email: "email@gmail.com"
    }

	return (
			<div className='container w-full rounded-sm shadow hover:shadow-lg bg-gray-50 p-4 border-solid border-2'>
				<div className='mb-4'>
					<h3 className='inline'>
						<b>Informations</b>
					</h3>
					<FormClient contenu1='Modifier' contenu2='' />
				</div>

				<div className='grid grid-cols-3 gap-4'>
					<p className='col'>Nom : {data.nom}</p>
					<p className='col'>Telephone : {data.telephone}</p>
				</div>
				<p>Email : {data.email}</p>
			</div>
	);
};

export default ClientInfo;
