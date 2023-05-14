import { React, useState, useEffect } from 'react'
import AnnonceBoard from './AnnonceBoard';
import { useParams } from 'react-router-dom'
import { axiosInsance } from '../../util/axios';

const ClientInfo = () => {

    const [userData, setUserData] = useState([]);

    const { id } = useParams();

    /*const data = {
        nom: "someone",
        telephone: "0123456789",
        email: "email@gmail.com"
    }*/

    useEffect(() => {
        fetchUserData();
    }, []);

    async function fetchUserData() {
        try {
            const response = await axiosInsance.get('/user');
            if (Array.isArray(response.data.data)) {
                console.log(response.data.data)
                let dataToInsert = response.data.data.find((element) => element.idClient == id);
                console.log(dataToInsert)
                setUserData(dataToInsert);
            } else {
                console.error('Error: response.data is not an array');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    
    return (
        <div className="flex flex-col ml-10">
            <div className=' px-6 py-4 '>
                <div className='container w-full rounded-sm shadow hover:shadow-lg bg-gray-50 p-4 border-solid border-2'>
                    <div className='mb-4'>
                        <h3 className='inline font-bold'>Informations</h3>
                        <a href="#!" className="text-success text-sm underline ml-5">Modifier</a>
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        <p className='col'>
                            Nom : {userData?.nomClient}
                        </p>
                        <p className='col'>
                            Telephone : {userData?.telephoneClient}
                        </p>
                    </div>
                    <p>
                        Email : {userData?.emailClient}
                    </p>
                </div>
            </div>

            <AnnonceBoard></AnnonceBoard>
        </div>
    )
}

export default ClientInfo