import React, { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from './styles.module.css';
import { Link } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

const AnnonceTable = () => {
    const EDITABLE_COLUMNS = [
        { title: "ID", field: "idAnnonceur", type: "numeric", editable: "never" },
        { title: "Email", field: "emailAnnonceur" },
        { title: "Nom", field: "nomAnnonceur" },
        { title: "Telephone", field: "telephoneAnnonceur", type: "numeric" },
        {
            title: "Details", field: "details", editable: "never", render: rowData => (
                <Link className="text-success underline" to={`/AC/annonceurs/${rowData.idAnnonceur}`}>details</Link>
            )
        }
    ];

    const [data, setData] = useState();

    const getNewDataBulkEdit = (changes, copyData) => {
        Object.keys(changes).forEach(key => {
            const change = changes[key];
            if (change?.newData) {
                const targetDataIndex = copyData.findIndex(el => el.id === key);
                if (targetDataIndex !== -1) {
                    copyData[targetDataIndex] = change.newData;
                }
            }
        });

        return copyData;
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axiosInstance.get(`/advertiser/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data.data);

                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const addAdvertiser = async (newData) => {
        try {
            const token = localStorage.getItem("token");
            const dataToAdd = {
                name: newData.nomAnnonceur,
                email: newData.emailAnnonceur,
                phone: newData.telephoneAnnonceur.toString(),
            }
            console.log(dataToAdd)
            const response = await axiosInstance.post(`/advertiser/`, dataToAdd, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response)
        } catch (error) {
            console.error("Error adding advertiser:", error);
        }
    };

    const updateAdvertiser = async (newData) => {
        try {
            const token = localStorage.getItem("token");
            await axiosInstance.post(`/advertiser/${newData.idAnnonceur}`, newData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(prevData => prevData.map(el => el.idAnnonceur === newData.idAnnonceur ? newData : el));
        } catch (error) {
            console.error("Error updating advertiser:", error);
        }
    };

    const deleteAdvertiser = async (id) => {
        const token = localStorage.getItem("token");
        try {
            await axiosInstance.delete(`advertiser/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(prevData => prevData.filter(el => el.idAnnonceur !== id));
        } catch (error) {
            console.error("Error deleting advertiser:", error);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Annonceurs</h1>
            <div className={classes.tableCore}>
                <MaterialTable columns={EDITABLE_COLUMNS}
                    data={data}
                    title=''
                    editable={{
                        onBulkUpdate: changes => new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const newData = getNewDataBulkEdit(changes, [...data]);
                                setData(newData);
                                resolve();
                            }, 1000);
                        }),
                        onRowAdd: (newData) => addAdvertiser(newData),

                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                updateAdvertiser(newData)
                                    .then(() => {
                                        resolve();
                                    })
                                    .catch((error) => {
                                        console.error("Error updating advertiser:", error);
                                        reject();
                                    });
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                deleteAdvertiser(oldData.idAnnonceur)
                                    .then(() => {
                                        resolve();
                                    })
                                    .catch((error) => {
                                        console.error("Error deleting advertiser:", error);
                                        reject();
                                    });
                            }),
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
                    }} />
            </div>
        </div>
    )
}
export default AnnonceTable;
