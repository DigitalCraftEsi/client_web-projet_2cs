import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Switch from '@mui/material/Switch';


const dummy = [
    {
        dateDebut: "10-12-2012",
        dateFin: "10-11-2023",
        sexe: "f",
        visible: true

    },
]

const AnnonceInfo = (props) => {


    const [data, setData] = useState(dummy)

    const [visible, setVisibility] = useState(data.visible == 1 ? true : false);

    const { id, annonceId } = useParams();


    function handleVisibility() {
        setVisibility(!visible);
    }

    return (
        <>
            <div>
                <div>
                    <h1> Information  <a ><p> modifer </p></a> </h1>
                    <p>Date debut : </p>
                    <p>Date fin : </p>
                    <p>Sexe :</p>
                    <p>Age min : </p>
                    <p>Age max : </p>
                </div>
            </div>




            <p>Visible {visible ? <Switch onClick={handleVisibility} defaultChecked /> : <Switch onClick={handleVisibility} />} </p>

        </>
    )
}

export default AnnonceInfo;