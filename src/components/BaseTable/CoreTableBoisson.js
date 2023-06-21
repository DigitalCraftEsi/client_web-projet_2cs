import React, { useState, useEffect } from "react";
import classes from './styles.module.css';
import { Link } from "react-router-dom";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import { axiosInstance } from "../../util/axios";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { FaPlus } from "react-icons/fa";
import BoissonForm from "./BoissonForm";
import { BACKEND_URL } from "../../util/constants"




const loadImage = imageName => imageName != null && typeof imageName == "string" && imageName.startsWith("src") ? (`${BACKEND_URL}/${imageName}`) : imageName ;



const EDITABLE_COLUMNS = [
	{
		title: "image",
		field: "image",
		render: (rowData) => {
			return <img src={loadImage(rowData.image)} alt="img" />
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
		field: "tarif",
		type: "numeric"
	},
]



const CoreTableBoisson = (props) => {


	const [data, setData] = useState([]);
	const [modal, setModal] = useState(false);
	const [loading, setLoading] = useState(false);


	const fetchBev = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem("token");
			const response = await axiosInstance.get(`machine/${props.idMachine}/beverages`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const fetchedData = response.data.data;
			console.log(fetchedData);
			setData(fetchedData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		setLoading(false);
	};

	const deleteBev = async (id) => {
		setLoading(true);
		try {
			await axiosInstance.delete(`/beverage/${id}`);
			fetchBev()
		} catch (error) {
			console.error('Error deleting beverage:', error);
		}
		setLoading(false);
	};

	const updateBev = async (newData, oldData) => {
		setLoading(true);
		const body = {
			nom: newData.nomBoisson,
			description: newData.description,
			tarif: newData.tarif
		};
		try {
			console.log(newData);
			const response = await axiosInstance.post(`/beverage/${oldData.idBoisson}`, body);
			if (response.data.statusCode === 200) {
				const dataUpdate = [...data];
				const index = oldData.tableData.id;
				dataUpdate[index] = newData;
				setData([...dataUpdate]);
			} else {
				console.log('Update failed with status:', response.data.statusCode);
			}
		} catch (error) {
			console.error('Error updating beverage:', error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchBev();
	}, [props]);

	function toggleModal() {
		setModal(!modal)
	}


	return (
		<div className={classes.tableCore} >
			<div className="flex flex-col ">
				<Button onclick={toggleModal} icon={<FaPlus />} contenu="Ajouter une boisson" />
				<br/>
				<Modal
					modal={modal}
					modalFun={toggleModal}
					title={"ajouter une boisson"}
					content={
						<BoissonForm setModal={setModal} fetchBev={fetchBev} idDist={props.idMachine} />
					}
				/>
				<MaterialTable columns={EDITABLE_COLUMNS}
					isLoading={loading}
					data={data}
					title=''
					editable={{
						onRowAddCancelled: (rowData) => console.log("Row adding cancelled"),
						onRowUpdateCancelled: (rowData) => console.log("Row editing cancelled"),
						// onRowAdd: (newData) => {
						// 	return new Promise((resolve, reject) => {
						// 		const body = {
						// 			"nom": newData.nomClient,
						// 			"email": newData.emailClient,
						// 			"telephone": newData.telephoneClient,
						// 			"role": "CLIENT"
						// 		};

						// 		axiosInstance.post("/user", body).then(response => {

						// 			console.log(response);

						// 			if (response.data.statusCode === 201) {
						// 				setData([...data, response.data.data]);
						// 				resolve();
						// 			} else {
						// 				reject();
						// 			}
						// 		}).catch(err => {
						// 			console.log(err);
						// 			reject();
						// 		})
						// 	});
						// },
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve, reject) => {
								updateBev(newData, oldData)
									.then(resolve)
									.catch(reject);
							}),
						onRowDelete: (oldData) =>
							new Promise((resolve, reject) => {
								deleteBev(oldData.idBoisson)
									.then(resolve)
									.catch(reject);
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
						toolbar: false, // Remove the toolbar completely

					}} />
			</div>
		</div>
	)
}

export default CoreTableBoisson;