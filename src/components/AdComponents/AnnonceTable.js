import { React, useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from './styles.module.css';
import { Link } from "react-router-dom";
import { axiosInsance } from "../../util/axios";


export function AnnonceTable() {

    const EDITABLE_COLUMNS = [
        { title: "ID", field: "idAnnonceur", type: "numeric" },
        { title: "Email", field: "emailAnnonceur" },
        { title: "Nom", field: "nomAnnonceur", },
        { title: "Telephone", field: "telephoneAnnonceur", type: "numeric" },
        {
            title: "Details", field: "details", render: (rowData) => {
                return (
                    <Link className="text-success underline" to={`/AC/annonceurs/${rowData.idAnnonceur}`}>details</Link>
                );
            }
        }

    ];



    const [data, setData] = useState([
        {
            idAnnonceur: '1',
            emailAnnonceur: 'jamal@gmail.com',
            nomAnnonceur: 'Bousnane',
            telephoneAnnonceur: '0771890493',
            details: 'Details',
        },
        {
            idAnnonceur: '2',
            emailAnnonceur: 'taher32@gmail.com',
            nomAnnonceur: 'Boumendjel',
            telephoneAnnonceur: '0771899876',
            details: 'Details',
        },
        {
            idAnnonceur: '3',
            emailAnnonceur: 'kamel@gmail.com',
            nomAnnonceur: 'Brahami',
            telephoneAnnonceur: '0678980989',
            details: 'Details',
        },
        {
            idAnnonceur: '4',
            emailAnnonceur: 'mohamed567@gamil.com',
            nomAnnonceur: 'chadouli',
            telephoneAnnonceur: '0578568934',
            details: 'Details',
        },
     
    ]);

    function getNewDataBulkEdit(changes, copyData) {
        const keys = Object.keys(changes);
        for (let i = 0; i < keys.length; i++) {
            if (changes[keys[i]] && changes[keys[i]].newData) {
                let targetData = copyData.find((el) => el.id === keys[i]);
                if (targetData) {
                    let newTargetDataIndex = copyData.indexOf(targetData);
                    copyData[newTargetDataIndex] = changes[keys[i]].newData;
                }
            }
        }
        return copyData;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInsance.get("your_backend_url_here");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const deleteAdvertiser = async (id) => {
        try {
            await axiosInsance.delete(`advertiser/${id}`);
            const updatedData = data.filter((el) => el.id !== id);
            setData(updatedData);
        } catch (error) {
            console.error("Error deleting advertiser:", error);
        }
    };



    return (

        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Annonceurs</h1>


            <div className={classes.tableCore} >
                <MaterialTable columns={EDITABLE_COLUMNS}
                    data={data}
                    title=''
                    editable={{
                        onBulkUpdate: (changes) => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    let copyData = [...data];
                                    setData(getNewDataBulkEdit(changes, copyData));
                                    // here to put the req
                                    resolve();
                                }, 1000);
                            });
                        },
                        onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
                        onRowUpdateCancelled: (rowData) => console.log("Row editing cancelled"),
                        onRowAdd: (newData) => {
                            return new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    console.log([...data, newData]);
                                    setData([...data, newData]);
                                    resolve();
                                }, 1000);
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
                                    deleteAdvertiser(oldData.id)
                                        .then(() => {
                                            resolve();
                                        })
                                        .catch(() => {
                                            reject();
                                        });
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
                    }} />
            </div>
        </div>
    )
}
export default AnnonceTable