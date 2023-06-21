import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/Button';
import './AnForm.css'
import { axiosInstance } from '../../util/axios';
import { useParams } from 'react-router-dom';


// must be (id , name) 
const DummyDist = [
    {
        id: "1",
        name: "example1"
    },
    {
        id: "2",
        name: "example2"
    }
]

const AnnonceForm = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        advertiser: id,
        dateDeb: new Date(),
        dateFin: new Date(),
        Sexe: 'M',
        ageMax: "",
        ageMin: "",
        DistID: "",
        boissonID: ""
    });

    //just useState for no reason
    const [dists, setDists] = useState([])
    const [boissons, setBoissons] = useState([])

    async function getAllDist() {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axiosInstance.get("/machine", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.data.statusCode === 200) {
            setDists(response.data.data.filter(item => item.idClient == user.clientId));
        }
    }


    async function getAllBoissons() {
        const token = localStorage.getItem("token");
        const response = await axiosInstance.post("/beverage", { distUID: "2" }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(response.data.statusCode === 200) {
            setBoissons(response.data.data.boissons);
        }
    }

    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const token = localStorage.getItem("token");
        const body = {
            advertiser: id,
            sexe : formData.Sexe,
            ageMin : formData.ageMin,
            ageMax  : formData.ageMax, 
            area : "alger",
            dateDebut : formData.dateDeb,
            dateFin :  formData.dateFin, 
            beverage : parseInt(formData.boissonID),
            machine:  formData.DistID,
        }

        const response = await axiosInstance.post("/advertisement", body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Form data submitted:', formData);

    };

    useEffect(() => {
        getAllDist();
        getAllBoissons();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='video'>video</label>
                <input type="file" name="video" id="video" />
            </div>
            <div className='date'>
                <div>
                    <label htmlFor="dateDeb">Date debut:</label>
                    <DatePicker
                        name="dateDeb"
                        id="dateDeb"
                        selected={formData.dateDeb}
                        onChange={(date) => handleDateChange('dateDeb', date)}
                    />
                </div>
                <div>
                    <label htmlFor="dateFin">End Date:</label>
                    <DatePicker
                        name="dateFin"
                        id="dateFin"
                        selected={formData.dateFin}
                        onChange={(date) => handleDateChange('dateFin', date)}
                    />
                </div>
            </div>
            <div className='sub-container'>
                <label htmlFor="Sexe">Sexe:</label>
                <select
                    name="Sexe"
                    id="Sexe"
                    value={formData.Sexe}
                    onChange={handleChange}
                >
                    <option selected value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>

            <div className='age'>
                <div className='sub-container'>
                    <label htmlFor="ageMin">Minimum Age:</label>
                    <input
                        type="number"
                        name="ageMin"
                        id="ageMin"
                        value={formData.ageMin}
                        onChange={handleChange}
                    />
                </div>
                <div className='sub-container'>
                    <label htmlFor="ageMax">Maximum Age:</label>
                    <input
                        type="number"
                        name="ageMax"
                        id="ageMax"
                        value={formData.ageMax}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className='sub-container' >
                <label htmlFor="DistID">Distributeur:</label>
                <select
                    name="DistID"
                    id="DistID"
                    value={formData.DistID}
                    onChange={handleChange}
                >
                    {dists.map((dist) => (
                        <option key={dist.idDistributeur} value={parseInt(dist.idDistributeur)}> {dist.idDistributeur} - {dist.adresse} </option>
                    ))}
                </select>
            </div>
            <div className='sub-container' >
                <label htmlFor="boissonID">boissons :</label>
                <select
                    name="boissonID"
                    id="boissonID"
                    value={formData.boissonID}
                    onChange={handleChange}
                >
                    {boissons.map((boisson) => (
                        <option key={boisson.idBoisson} value={boisson.idBoisson} > {boisson.nomBoisson} </option>
                    ))}
                </select>
            </div>
            <Button type="submit" contenu={"Ajouter"} />
        </form>
    );
};

export default AnnonceForm;
