import { React, useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./styles.module.css";
import { axiosInsance } from "../../util/axios";
import { Select , Button, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@material-ui/core";



const DisTable = () => {
	
	const [clientsArray, setClientsArray] = useState([]);
	const [data, setData] = useState([]);
	
	const EDITABLE_COLUMNS = [
		{ title: "ID distributeur", field: "idDistributeur", type: "numeric", editable: "never"},
		{ title: "ID client", field: "idClient", type: "numeric"},
		{ title: "nom client", field: "nomClient", type: "string", editable: "never" }
	];

	async function getAllmachines() {
		const token = localStorage.getItem("token");
		const response =  await axiosInsance.get(`/machine`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const clientsResponse = await axiosInsance.get("/user", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		console.log(response);
		// console.log(clientsResponse);

		if(response.data.statusCode === 200 && clientsResponse.data.statusCode === 200) {
			setClientsArray(clientsResponse.data.data);

			

			response.data.data.forEach(machine => {
				machine.nomClient = "";
				const clientIndex = clientsResponse.data.data.findIndex(client => client.idClient === machine.idClient);

				if(clientIndex >= 0) {
					machine.nomClient = clientsResponse.data.data[clientIndex].nomClient;
					// console.log("nomClient", machine.nomClient)
				}
			});

			setData(response.data.data);
			// console.log(data);
		}
	}

	const [editedRow, setEditRow] = useState({});

	const [dialogOpen, setDialogOpen] = useState(false);

	useEffect(() => {
		getAllmachines();
	}, []);


	return (
		<div className={classes.tableCore}>
			<Dialog open={dialogOpen}>
				<DialogTitle>Assign a client to a vending machine</DialogTitle>
				<DialogContent>
					<div style={{
						"display": "flex",
						"flex-direction": "column",
						"gap": "30px"
					}}>
						<TextField
							label="ID distributeur"
							variant="outlined"
							type="number"
							value={editedRow.idDistributeur}
							InputProps={{
								readOnly: true
							}}
						/>

						<Select
							label="id_client"
							variant="outlined"
							autoFocus={false}
							value={editedRow.idClient}
							onChange={(e) => setEditRow(prevData => ({ ...prevData, idClient: e.target.value }) ) }
						>
							{
								clientsArray.map((client, index) => (
									<MenuItem key={index} value={client.idClient}>{client.idClient} - {client.nomClient}</MenuItem>
								))
							}
						</Select>

					</div>
				</DialogContent>
				<DialogActions>
					<Button color="error" onClick={() => {
						setDialogOpen(false);
					}}>cancel</Button>

					<Button color="success" onClick={async () => {
						setDialogOpen(false);

						const body = {
							client: editedRow.idClient,
							machines: [editedRow.idDistributeur]
						}
						console.log("id client", editedRow.idClient);
						console.log("edit body", body);
						const token = localStorage.getItem("token");

						const response = await axiosInsance.post("/machine/client/assignation", body, {
							headers: {
								Authorization: `Bearer ${token}`
							}
						})
						console.log("assign client response", response);

						if(response.data.statusCode === 200) {
							// setData(prevData => {
							// 	const newData = [...prevData];
							// 	const index = newData.findIndex(row => row.idDistributeur === editedRow.idDistributeur);
							// 	newData[index].idClient = editedRow.idClient;

							// 	const clientIndex = clientsArray.findIndex(client => client.idClient === editedRow.idClient);

							// 	if(clientIndex >= 0) {
							// 		newData[index].nomClient = clientsArray[clientIndex].nomClient;
							// 	}

							// 	return newData;
							// })

							// console.log("changed clietn");

							getAllmachines();
						}

					}} >assign</Button>
				</DialogActions>
			</Dialog>
			<MaterialTable
				columns={EDITABLE_COLUMNS}
				data={data}
				title=''
				editable={{
					onRowAdd: async (newData) => {
						return new Promise((resolve, reject) => {
							const distuid = new Date().valueOf().toString().slice(0, 4);

							const body = {
								"distuid": distuid,
								"odbuid": distuid
							};

							const token = localStorage.getItem("token");

							axiosInsance.post("/machine", body, {
								headers: {
									Authorization: `Bearer ${token}`
								}
							}).then(response => {

								console.log(response);

								if(response.data.statusCode === 200) {
									// setData([...data, response.data.data]);
									getAllmachines();
									resolve();
								} else {
									reject();
								}
							}).catch(err => {
								console.log(err);
								reject();
							})

						})
					}
				}}

				onRowClick={(event, rowData) => {
					setEditRow(rowData);
					setDialogOpen(true);
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
					},
					editCellStyle: {
						padding: "10px",
						fontStyle: "normal",
						fontWeight: "400",
						fontSize: "12px",
						lineHeight: "18px",
						color: "555555",
					},
					selection: true,
				}}
			/>
		</div>
	);
};

export default DisTable;
