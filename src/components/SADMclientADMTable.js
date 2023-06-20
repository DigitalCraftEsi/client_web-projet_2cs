import { React, useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./BaseTable/styles.module.css";
import { axiosInstance } from "../util/axios";
import { useParams } from "react-router-dom";

export default function SADMclientADMTable() {
	const EDITABLE_COLUMNS = [
		{ title: "ID ADM", field: "idADM", type: "numeric", editable: "never" },
		{ title: "nom", field: "nomADM" },
		{ title: "prenom", field: "prenomADM" },
		{ title: "telephone", field: "telephoneADM" },
		{ title: "email", field: "emailADM" },
		{ title: "ID client", field: "idClient", editable: "never" },
	];

	const { id: idClient } = useParams();
	let id = parseInt(idClient);

	const [data, setData] = useState([]);

	async function getAllADMs() {
		const token = localStorage.getItem("token");

		const response = await axiosInstance.get(`/user/`, {
			data: {
				id,
				role: "CLIENT",
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log("response", response);

		if (response.data.statusCode === 200) {
			setData(response.data.data.adm);
		}
	}

	useEffect(() => {
		getAllADMs();
	}, []);

	return (
		<div className='p-10'>
			<h1 className='text-2xl font-bold mb-4'>ADMs of client {id}</h1>
			<div className={classes.tableCore}>
				<MaterialTable
					columns={EDITABLE_COLUMNS}
					data={data}
					title=''
					editable={{
						onRowAdd: (newData) => {
							return new Promise((resolve, reject) => {
								const body = {
									email: newData.emailADM,
									nom: newData.nomADM,
									prenom: newData.prenomADM,
									password: "chamsou2002",
									telephone: newData.telephoneADM,
									client: id,
									role: "ADM",
								};

								const token = localStorage.getItem("token");
								axiosInstance
									.post("/user", body, {
										headers: {
											Authorization: `Bearer ${token}`,
										},
									})
									.then((response) => {
										console.log("add adm", response);

										if (response.status === 201) {
											getAllADMs();
											resolve();
										} else {
											reject();
										}
									});
							});
						},
					}}
					options={{
						actionsColumnIndex: -1,
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
		</div>
	);
}
