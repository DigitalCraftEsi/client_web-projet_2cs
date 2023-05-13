import React, { useState, useEffect } from "react";
import classes from './styles.module.css';
import { Link } from "react-router-dom";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import { axiosInsance } from "../../util/axios";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { FaPlus } from "react-icons/fa";




const loadImage = imageName => (`http://localhost:8000/${imageName}`);
const idMachine = 1;



const EDITABLE_COLUMNS = [
    {
        title: "",
        field: "image",
        render: (rowData) => {
            return <img src={loadImage(rowData.pic)} alt="img" />
        },
        editable: 'never'
    },
    {
        title: "Nom",
        field: "nomBoisson"
    },
    {
        title: "Description",
        field: "description"
    },
    {
        title: "Tarif",
        field: "tarif"
    },
    {
        title: "Modifier Tarif", field: "Modifier Tarif", render: (rowData) => {
            return (
                <Link className="text-success underline" to={`/AC/boissons/${rowData.id}`}>details</Link>
            );
        }
    }
]



const CoreTableBoisson = () => {


    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);


    const fetchBev = async () => {
        try {
            const response = await axiosInsance.get(`machine/${idMachine}/beverages`);
            const fetchedData = response.data.data;
            setData(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };




    useEffect(() => {
        fetchBev();
    }, []);

    function toggleModal() {
        setModal(!modal)
    }


    return (
        <div className={classes.tableCore} >
            <div className="flex flex-col ">
                <Button onclick={toggleModal} icon={<FaPlus />} contenu="Ajouter une boisson" />
                <Modal
                    modal={modal}
                    modalFun={toggleModal}
                    title={"ajouter une boisson"}
                    content={
                        <>
                            <p>hello</p>
                        </>
                    }
                />
                <MaterialTable columns={EDITABLE_COLUMNS}
                    data={data}
                    title=''
                    editable={{
                        onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
                        onRowUpdateCancelled: (rowData) => console.log("Row editing cancelled"),
                        onRowAdd: (newData) => {
                            return new Promise((resolve, reject) => {
                                const body = {
                                    "nom": newData.nomClient,
                                    "email": newData.emailClient,
                                    "telephone": newData.telephoneClient,
                                    "role": "CLIENT"
                                };

                                axiosInsance.post("/user", body).then(response => {

                                    console.log(response);

                                    if (response.data.statusCode === 201) {
                                        setData([...data, response.data.data]);
                                        resolve();
                                    } else {
                                        reject();
                                    }
                                }).catch(err => {
                                    console.log(err);
                                    reject();
                                })
                            });
                        },
                        onRowUpdate: (newData, oldData) => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const target = dataUpdate.find((el) => el.id === oldData.id);
                                    const index = dataUpdate.indexOf(target);
                                    dataUpdate[index] = newData;
                                    setData(dataUpdate);
                                    resolve();
                                }, 1000);
                            });
                        },
                        onRowDelete: (oldData) => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = data.filter((el) => el.id !== oldData.id);
                                    setData(dataDelete);
                                    resolve();
                                }, 1000);
                            });
                        },
                    }}
                    options={{
                        headerStyle: {
                            borderBottom: 'solid 1px black',
                            color: '#757575',
                            fontSize: '12px',
                            fontWeight: '600',
                            fontFamily: 'Poppins',
                            lineHeight: '18px',
                            paddingBottom: '10px',
                            textAlign: 'center'

                        },
                        toolbar: false, // Remove the toolbar completely

                    }} />
            </div>
        </div>
    )
}

export default CoreTableBoisson;