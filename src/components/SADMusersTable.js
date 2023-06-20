import { React, useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./BaseTable/styles.module.css";
import { axiosInstance } from "../util/axios";
import { useNavigate } from "react-router-dom";

export default function SADMusersTable() {
	const EDITABLE_COLUMNS = [
		{
			title: "ID Client",
			field: "idClient",
			type: "numeric",
			editable: "never",
		},
		{ title: "nom", field: "nomClient" },
	];

	async function getAllClients() {
		const token = localStorage.getItem("token");
		const response = await axiosInstance.get("/user", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.data.statusCode === 200) {
			setData(response.data.data);
		}
	}

	const navigate = useNavigate();

	const [data, setData] = useState([]);

	useEffect(() => {
		getAllClients();
	}, []);

	return (
		<div className='p-10'>
			<h1 className='text-2xl font-bold mb-4'>Clients</h1>
			<div className={classes.tableCore}>
				<MaterialTable
					columns={EDITABLE_COLUMNS}
					data={data}
					title=''
					editable={{}}
					onRowClick={(event, rowData) => {
						navigate(`${rowData.idClient}`);
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
		</div>
	);
}
