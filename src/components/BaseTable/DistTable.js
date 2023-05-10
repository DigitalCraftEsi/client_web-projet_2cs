import { React, useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./styles.module.css";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../util/constants";
import axios from "axios";
import Cookies from "js-cookie";

const URL = BACKEND_URL + "/machine";

const DisTable = () => {
	const EDITABLE_COLUMNS = [
		{ title: "ID", field: "idDistributeur", type: "numeric" },
		{ title: "Client", field: "idClient", type: "numeric" },
		{ title: "AM", field: "idAM", type: "numeric" },
		{ title: "Adresse", field: "adresse" },
		{ title: "Longitude", field: "longitude", type: "numeric" },
		{ title: "Latitude", field: "latitude", type: "numeric" },
		{ title: "Code de deverrouillage", field: "codeDeDeverrouillage" },
		{
			title: "Details",
			field: "details",
			render: (rowData) => {
				return (
					<Link
						className='text-success underline'
						to={`${rowData.idDistributeur}`}
					>
						détails
					</Link>
				);
			},
		},
	];

	const EDITABLE_DATA = [];

	const [data, setData] = useState(EDITABLE_DATA);

	useEffect(() => {
		axios
			.get(URL, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			})
			.then((response) => {
				const changedData = response.data.map((item) => {
					item.details = "details";
					return item;
				});
				setData(changedData);
			})
			.catch((error) => console.error(error));
	}, []);

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

	return (
		<div className={classes.tableCore}>
			<MaterialTable
				columns={EDITABLE_COLUMNS}
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
					onRowUpdateCancelled: (rowData) =>
						console.log("Row editing cancelled"),
					onRowAdd: (newData) => {
						return new Promise((resolve, reject) => {
							fetch(URL, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify(newData),
							})
								.then((response) => response.json())
								.then((result) => {
									if (result.statusCode === 200) {
										result.data.details = "details";
										setData([...data, result.data]);
										resolve();
									} else {
										reject();
									}
								});
						});
					},
					onRowUpdate: (newData, oldData) => {
						return new Promise((resolve, reject) => {
							setTimeout(() => {
								const dataUpdate = [...data];
								const index = dataUpdate.findIndex(
									(item) => item.idDistributeur === oldData.idDistributeur
								);
								dataUpdate[index] = {
									...oldData,
									...newData,
								};
								setData(dataUpdate);
								resolve();
							}, 1000);
						});
					},
					onRowDelete: (oldData) => {
						return new Promise((resolve, reject) => {
							fetch(`${URL}/${oldData.idDistributeur}`, {
								method: "DELETE",
							})
								.then((response) => response.json())
								.then((result) => {
									if (result.statusCode === 200) {
										const newData = data.filter(
											(item) => item.idDistributeur !== oldData.idDistributeur
										);
										setData(newData);
										resolve();
									} else {
										reject();
									}
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
