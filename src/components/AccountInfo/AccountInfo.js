import React, { useState } from 'react'
import Button from '../Button/Button'
import Form from '../Form/Form'

const AccountInfo = (props) => {    
    if (props.data.length != 0) {
        return (
            <div className=' px-6 py-4 '>
            <div className='container w-full rounded-sm shadow hover:shadow-lg bg-gray-50 p-4 border-solid border-2'>
                <div className='mb-4'>
                    <h3 className='inline'><b>Compte administrateur</b></h3>
                        <a href="#!" className="text-success text-sm underline ml-5">Modifier</a>
                </div>
    
                <div className='grid grid-cols-3 gap-4'>
                <p className='col'>
                    Nom : {props.data[0].nom}
                </p>
                <p className='col'>
                    Prenom : {props.data[0].prenom}
                </p>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                <p className='col'>
                    Email: {props.data[0].email}
                </p>
                <p className='col'>
                    Telephone : {props.data[0].telephone}
                </p>
                </div>
                <p>
                    Mot de passe : {props.data[0].motDePasse}
                </p>
                </div>
            </div>
        )
    } else {
        return (
            <div className=' px-6 py-4 '>
            <div className='container w-full rounded-sm shadow hover:shadow-lg bg-gray-50 p-4 border-solid border-2'>
            <Form contenu1="Ajouter" contenu2="Annuler"/>
            </div>
            </div>
        )
    }
    
}

export default AccountInfo