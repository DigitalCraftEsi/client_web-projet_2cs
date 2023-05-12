import { React, useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from './styles.module.css';
import { axiosInsance } from "../../util/axios";

const CoreTable = () => {

    const EDITABLE_COLUMNS = [
        { title: "ID Client", field: "idClient", type: "numeric", editable: "never"},
        { title: "nom", field: "nomClient"},
        { title: "email", field: "emailClient"},
        { title: "téléphone", field: "telephoneClient"},
    ];

    async function getAllClients() {
        const response =  await axiosInsance.post(`/user/get`);
		console.log(response);

		if(response.data.statusCode === 200) {
			setData(response.data.data);
		}
    }
    

    const [data, setData] = useState([]);

    useEffect(() => {
        getAllClients();
    }, []);


    return (
        <div className={classes.tableCore} >
            <MaterialTable columns={EDITABLE_COLUMNS}
                data={data}
                title=''
                editable={{
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

								if(response.data.statusCode === 201) {
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
                            const body = {
                                id: parseInt(oldData.idClient),
                                role: "CLIENT"
							};

							axiosInsance.delete("/user", { data: body }).then(response => {

								console.log(response);

								if(response.data.statusCode === 200) {
                                    const newData = data.filter(row => row.idClient !== oldData.idClient);
									setData(newData);
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
    )
}

export default CoreTable;