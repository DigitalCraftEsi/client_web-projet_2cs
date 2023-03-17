import React from 'react'
import { useParams } from 'react-router-dom'

const ClientInfo = () => {
    const { id } = useParams();

    const data = {
        nom: "someone",
        telephone: "0123456789",
        email: "email@gmail.com"
    }

    return (
            <div className='container w-full rounded-sm shadow hover:shadow-lg bg-gray-50 p-4 border-solid border-2'>
                <div className='mb-4'>
                    <h3 className='inline font-bold'>Informations</h3>
                    <a href="#!" className="text-success text-sm underline ml-5">Modifier</a>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                <p className='col'>
                    Nom : {data.nom}
                </p>
                <p className='col'>
                    Telephone : {data.telephone}
                </p>
                </div>
                <p>
                    Email : {data.email}
                </p>
            </div>
    )
}

export default ClientInfo