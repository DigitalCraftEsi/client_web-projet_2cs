import { React, useState } from 'react'
import { FaSearch, FaPlus } from "react-icons/fa";
import Card from '../AdCard/Card';
import Button from "../Button/Button";
import Modal from '../Modal/Modal';
import AnnonceForm from '../Forms/AnnonceForm';

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


const AnnonceBoard = () => {

    const [data, setData] = useState(dummyData);
    const [modal, setModal] = useState(false);

    function deleteFromData(idToDelete) {
        setData((data) => data.filter((element) => element.id !== idToDelete))
    }

    function toggleModal() {
        setModal(!modal)
    }


    return (
        <div className='w-fit max-w-5xl'>
            <div className='toolbar p-4 pr-16 flex gap-2 justify-end'>
                <button>
                    <FaSearch />
                </button>
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
                {data.map((objectData) =>
                    <Card data={objectData} key={objectData.id} deleteFun={deleteFromData} />
                )}
            </div>
        </div>
    );
}

export default AnnonceBoard;