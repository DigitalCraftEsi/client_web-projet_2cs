import { React, useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./styles.module.css";
import { json, Link } from "react-router-dom";
import { axiosInstance } from "../../util/axios";

const EDITABLE_COLUMNS = [
	{ title: "ID", field: "id", type: "numeric" },
	{ title: "Commande", field: "commande" },
	{ title: "Titre", field: "titre" },
	{ title: "Description", field: "description" },
	{ title: "Date", field: "date" },
	{ title: "Traité", field: "etat" },
	{
		title: "Details",
		field: "details",
		render: (rowData) => {
			return (
				<Link
					className='text-success underline'
					to={`/AC/reclamation/${rowData.id}`}
				>
					details
				</Link>
			);
		},
	},
];

const ReclamTable = () => {
	const [data, setData] = useState([]);

	async function getAllReclamations() {
		const response = await axiosInstance.get(`/reclamation`);

		if (response.data.statusCode === 200) {
			const modifiedData = response.data.data.map((item) => {
				return {
					id: item.idReclamation,
					commande: item.idCommande,
					titre: item.titre,
					description: item.description,
					date: item.dateReclamation,
					etat: item.notif ? "oui" : "non",
					details: "details",
				};
			});
			console.log(modifiedData);
			setData(modifiedData);
		}
	}

	useEffect(() => {
		getAllReclamations();
	}, []);

	return (
		<div className={classes.tableCore}>
			<MaterialTable
				columns={EDITABLE_COLUMNS}
				data={data}
				title=''
				editable={{}}
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
				}}
				actions={[]}
			/>
		</div>
	);
};

export default ReclamTable;
