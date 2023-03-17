import React from 'react'
import { useParams } from 'react-router-dom';
import FormADM from '../FormADM/FormADM'

const AccountInfo = () => {
    const { id } = useParams();
    const data = {
        nom: "somone",
        prenom: "prenom",
        email: "email@gmail.com",
        telephone: "0123456789",
        motDePasse: "123"
    }

    if (data != null) {
        return (

            <div className='container w-full rounded-sm shadow hover:shadow-lg bg-gray-50 p-4 border-solid border-2'>
                <div className='mb-4'>
                    <h3 className='inline'><b>Compte administrateur</b></h3>
                        <a href="#!" className="text-success text-sm underline ml-5">Modifier</a>
                </div>
    
                <div className='grid grid-cols-3 gap-4'>
                <p className='col'>
                    Nom : {data.nom}
                </p>
                <p className='col'>
                    Prenom : {data.prenom}
                </p>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                <p className='col'>
                    Email: {data.email}
                </p>
                <p className='col'>
                    Telephone : {data.telephone}
                </p>
                </div>
                <p>
                    Mot de passe : {data.motDePasse}
                </p>

            </div>
        )
    } else {
        return (
            <div className=' px-6 py-4 '>
            <div className='container w-full rounded-sm shadow hover:shadow-lg bg-gray-50 p-4 border-solid border-2'>
            <h3 className='inline'><b>Compte administrateur</b></h3>
            <FormADM contenu1="Ajouter" contenu2=""/>
            </div>
            </div>
        )
    }
    
}

export default AccountInfo