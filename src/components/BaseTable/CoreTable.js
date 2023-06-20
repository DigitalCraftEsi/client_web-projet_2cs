import { React, useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./styles.module.css";
import { axiosInstance } from "../../util/axios";

const CoreTable = () => {
	const [loading, setLoading] = useState(false);

	const EDITABLE_COLUMNS = [
		{
			title: "ID Client",
			field: "idClient",
			type: "numeric",
			editable: "never",
		},
		{ title: "nom", field: "nomClient" },
		{ title: "email", field: "emailClient" },
		{ title: "téléphone", field: "telephoneClient" },
	];

	async function getAllClients() {
		setLoading(true);
		const token = localStorage.getItem("token");
		const response = await axiosInstance.get(`/user`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		console.log(response);

		if (response.data.statusCode === 200) {
			setData(response.data.data);
		}

		setLoading(false);
	}

	const [data, setData] = useState([]);

	useEffect(() => {
		getAllClients();
	}, []);

	return (
		<div className={classes.tableCore}>
			<MaterialTable
				isLoading={loading}
				columns={EDITABLE_COLUMNS}
				data={data}
				title=''
				editable={{
					onRowAdd: (newData) => {
						return new Promise((resolve, reject) => {
							const body = {
								nom: newData.nomClient,
								email: newData.emailClient,
								telephone: newData.telephoneClient,
								role: "CLIENT",
							};
                            
                            const token = localStorage.getItem("token");
							axiosInstance.post("/user", body, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }).then(response => {

									if (response.data.statusCode === 201) {
										getAllClients();
										resolve();
									} else {
										reject();
									}
								})
								.catch((err) => {
									console.log(err);
									reject();
								})
							
                        });
                    },
                    onRowUpdate: (newData, oldData) => {
                        return new Promise(async (resolve, reject) => {
                            const body = {
                                id: oldData.idClient,
                                nom: newData.nomClient,
                                telephone: newData.telephoneClient,
                                email: newData.emailClient,
                                role: "CLIENT"
                            }

                            try {
                                const token = localStorage.getItem("token");
                                const response = await axiosInstance.patch("/user", body, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                });
                                if(response.data.statusCode === 200) {
                                    resolve();
                                    getAllClients();
                                } else {
                                    reject();
                                }
                                
                            } catch (err) {
                                console.log(err);
                                reject();
                            }
                        });
                    },
                    onRowDelete: (oldData) => {
                        return new Promise((resolve, reject) => {
                            const body = {
                                id: parseInt(oldData.idClient),
                                role: "CLIENT"
							};
                            const token = localStorage.getItem("token");
							axiosInstance.delete("/user", { 
                                data: body,
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }).then(response => {

									if (response.data.statusCode === 200) {
										const newData = data.filter(
											(row) => row.idClient !== oldData.idClient
										);
										setData(newData);
										resolve();
									} else {
										reject();
									}
								})
								.catch((err) => {
									console.log(err);
									reject();
								});
						});
					},
				}}
				options={{
					headerStyle: {
						borderBottom: "solid 1px black",
						color: "#757575",
						fontSize: "12px",
						fontWeight: "600",
						fontFamily: "Poppins",
						lineHeight: "18px",
						paddingBottom: "10px",
						textAlign: "center",
					},
				}}
			/>
		</div>
	);
};

export default CoreTable;
