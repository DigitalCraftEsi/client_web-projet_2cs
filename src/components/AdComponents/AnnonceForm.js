import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/Button';
import './AnForm.css'


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
    const [formData, setFormData] = useState({
        dateDeb: new Date(),
        dateFin: new Date(),
        Sexe: '',
        ageMax: "",
        ageMin: "",
        DistID: "",
        boissonID: ""
    });

    //just useState for no reason
    const [dists, setDists] = useState(DummyDist)
    const [boissons, setBoissons] = useState(DummyDist)

    const handleDateChange = (name, date) => {
        setFormData({ ...formData, [name]: date });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);

    };

    return (
        <form onSubmit={handleSubmit}>
            <p>Video <a href='#'> Ajouter </a></p>
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
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
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
                    <option value=""></option>
                    {dists.map((dist) => (
                        <option value={dist.id} > {dist.name} </option>
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
                    <option value=""></option>
                    {boissons.map((boisson) => (
                        <option value={boisson.id} > {boisson.name} </option>
                    ))}
                </select>
            </div>
            <Button type="submit" contenu={"Ajouter"} />
        </form>
    );
};

export default AnnonceForm;
