import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Switch from '@mui/material/Switch';

const dummy = [
    {
        dateDebut: "10-12-2012",
        dateFin: "10-11-2023",
        sexe: "f",
        ageMin: "10",
        ageMax: "20",
        visible: true
    },
];

const AnnonceInfo = (props) => {
    const [data, setData] = useState(dummy[0]);
    const [visible, setVisibility] = useState(data.visible);

    const { id, annonceId } = useParams();

    function handleVisibility() {
        setVisibility(!visible);
    }

    return (
        <>
            <div className="flex flex-col ml-10 ">
                <div className=' px-6 py-4 '>
                    <div className='container w-full rounded-sm shadow hover:shadow-lg bg-gray-50 p-4 border-solid border-2'>
                        <div className='mb-4'>
                            <h3 className='inline font-bold'>Informations</h3>
                            <a href="#!" className="text-success text-sm underline ml-5">Modifier</a>
                        </div>

                        <div className='grid grid-cols-1 gap-4'>
                            <p className='col'>
                                Date debut : {data.dateDebut}
                            </p>
                            <p className='col'>
                                Date fin : {data.dateFin}
                            </p>
                            <p className='col'>
                                Sexe : {data.sexe}
                            </p>
                            <p className='col'>
                                Age min : {data.ageMin}
                            </p>
                            <p className='col'>
                                Age max : {data.ageMax}
                            </p>
                        </div>
                        <p>
                            <p>Visible {visible ? <Switch onClick={handleVisibility} defaultChecked /> : <Switch onClick={handleVisibility} />} </p>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnnonceInfo;
