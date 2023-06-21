import { React, useState, useEffect } from 'react'
import AnnonceBoard from './AnnonceBoard';
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../util/axios';

const ClientInfo = () => {

    const [userData, setUserData] = useState([]);
    const [ads, setAds] = useState([]);

    const { id } = useParams();

    /*const data = {
        nom: "someone",
        telephone: "0123456789",
        email: "email@gmail.com"
    }*/

    useEffect(() => {
        fetchUserData();
        fetchAds();
    }, []);

    async function fetchAds() {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.get(`/advertisement`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const dataToFetch = response.data.data
            setAds(dataToFetch);
        } catch (error) {
            console.error('Error fetching Ads Data:', error);
        }
    }


    async function fetchUserData() {
        try {
            const token = localStorage.getItem("token");
            const response = await axiosInstance.get(`/advertiser/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(response.data.data);
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
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
                        <p className='col'>
                            Nom : {userData?.nomAnnonceur}
                        </p>
                        <p className='col'>
                            Telephone : {userData?.telephoneAnnonceur}
                        </p>
                    </div>
                    <p>
                        Email : {userData?.emailAnnonceur}
                    </p>
                </div>
            </div>

            <AnnonceBoard data={ads} ></AnnonceBoard>
        </div>
    )
}

export default ClientInfo