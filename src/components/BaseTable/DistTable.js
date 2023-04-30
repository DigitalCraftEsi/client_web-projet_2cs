import { React, useState } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./styles.module.css";
import { Link } from "react-router-dom";

const DisTable = () => {
	const EDITABLE_COLUMNS = [
		{ title: "ID", field: "id", type: "numeric" },
		{ title: "Client", field: "client" },
		{ title: "Address", field: "address" },
		{ title: "State", field: "state" },
		{
			title: "Details",
			field: "details",
			render: (rowData) => {
				return (
					<Link className='text-success underline' to={`${rowData.id}`}>
						details
					</Link>
				);
			},
		},
	];

	const EDITABLE_DATA = [
		{
			id: "1",
			client: "esi",
			address: "oued smar",
			state: "working",
			details: "Details",
		},
		{
			id: "2",
			client: "esi",
			address: "oued smar",
			state: "working",
			details: "Details",
		},
		{
			id: "3",
			client: "esi",
			address: "oued smar",
			state: "working",
			details: "Details",
		},
	];

	const [data, setData] = useState(EDITABLE_DATA);

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
				actions={[
					{
						tooltip: "Remove All Selected Users",
						icon: "delete",
						onClick: (evt, oldData) => {
							return new Promise((resolve, reject) => {
								setTimeout(() => {
									for (let dataDelete in oldData) {
										dataDelete = oldData.filter((el) => el.id !== oldData.id);
										setData(dataDelete);
										resolve();
									}
								}, 1000);
							});
						},
					},
				]}
			/>
		</div>
	);
};

export default DisTable;
