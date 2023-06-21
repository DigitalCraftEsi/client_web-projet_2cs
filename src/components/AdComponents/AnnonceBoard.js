import { React, useEffect, useState } from 'react'
import { FaSearch, FaPlus } from "react-icons/fa";
import Card from './Card';
import Button from "../Button/Button";
import Modal from '../Modal/Modal';
import AnnonceForm from './AnnonceForm';

import "./styles.css"

const dummyData = [
    {
        id: "1",
        imagePath: "nescafe.jpg",
        dateDeb: "",
        dateFin: "",
        sexe: "",
        ageMax: "",
        ageMin: "",
        boisson: "",
        visible: "1"
    },
    {
        id: "2",
        imagePath: "nescafe.jpg",
        dateDeb: "",
        dateFin: "",
        sexe: "",
        ageMax: "",
        ageMin: "",
        boisson: "",
        visible: "1"
    },
    {
        id: "3",
        imagePath: "nescafe.jpg",
        dateDeb: "",
        dateFin: "",
        sexe: "",
        ageMax: "",
        ageMin: "",
        boisson: "",
        visible: "0"
    }
]


const AnnonceBoard = (props) => {

    const [data, setData] = useState(props.data);
    const [modal, setModal] = useState(false);

    function deleteFromData(idToDelete) {
        setData((data) => data.filter((element) => element.id !== idToDelete))
    }

    function toggleModal() {
        setModal(!modal)
    }


    return (
        <div className=' max-w-5xl'>
            <div className='toolbar p-4 pr-16 flex gap-2 justify-end'>
                <Button onclick={toggleModal} icon={<FaPlus />} contenu=" Nouvelle Annonce" />
                <Modal
                    modal={modal}
                    modalFun={toggleModal}
                    title={"Ajouter une annonce"}
                    content={
                        <>
                            <AnnonceForm />
                        </>
                    }
                />
            </div>

            

            <div className=' m-4 flex flex-wrap gap-4 '>
                {props.data.map((objectData) =>
                    <Card data={objectData} key={objectData.idAnnonce} deleteFun={deleteFromData} />
                )}
            </div>
        </div>
    );
}

export default AnnonceBoard;