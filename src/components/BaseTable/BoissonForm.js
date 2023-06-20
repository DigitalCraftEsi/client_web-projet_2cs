import React, { useState } from "react";
import Button from "../Button/Button";
import { axiosInstance } from "../../util/axios";
import "./BoissonForm.css"


const BoissonForm = (props) => {
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        nomBoisson: "",
        tarif: "",
        description: "",
        eau: "",
        cafe: "",
        lait: "",
        the: "",
        sucre: "",
        idDistributeur: props.idDist
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            data.append("picture", image);
            await axiosInstance.post('/beverage/add', data,{
                headers : {
                    "Content-Type" : "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Form data submitted successfully');
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <form  >
            <p>Image :<input type="file" onChange={handleImageChange} /><a href='#'> Ajouter </a></p>
            <div className='sub-container'>
                <label htmlFor="nomBoisson"> Nom du boisson :</label>
                <input
                    id="nomBoisson"
                    name="nomBoisson"
                    type="text"
                    value={formData.nomBoisson}
                    onChange={handleChange}
                >
                </input>
            </div>
            <div className='sub-container'>
                <label htmlFor="description"> Description :</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange} >
                </input>
            </div>
            <div className='sub-container'>
                <label htmlFor="tarif"> Tarif :</label>
                <input
                    id="tarif"
                    name="tarif"
                    type="number"
                    value={formData.tarif}
                    onChange={handleChange}
                >

                </input>
            </div>

            <div className='containers'>
                <div className='sub-container'>
                    <label htmlFor="eau">Eau :</label>
                    <input
                        type="number"
                        name="eau"
                        id="eau"
                        value={formData.eau}
                        onChange={handleChange}
                    />
                </div>

                <div className='sub-container'>
                    <label htmlFor="cafe">Café :</label>
                    <input
                        type="number"
                        name="cafe"
                        id="cafe"
                        value={formData.cafe}
                        onChange={handleChange}
                    />
                </div>

                <div className='sub-container'>
                    <label htmlFor="lait">Lait :</label>
                    <input
                        type="number"
                        name="lait"
                        id="lait"
                        value={formData.lait}
                        onChange={handleChange}
                    />
                </div>
                <div className='sub-container'>
                    <label htmlFor="the">Thé :</label>
                    <input
                        type="number"
                        name="the"
                        id="the"
                        value={formData.the}
                        onChange={handleChange}
                    />
                </div>

                <div className='sub-container'>
                    <label htmlFor="sucre">Sucre :</label>
                    <input
                        type="number"
                        name="sucre"
                        id="sucre"
                        value={formData.sucre}
                        onChange={handleChange}
                    />
                </div>

            </div>



            <Button  contenu={"Ajouter"}  onclick={handleSubmit} />
        </form>
    );
};


export default BoissonForm;