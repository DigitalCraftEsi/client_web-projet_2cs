import { React, useState } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./styles.module.css";
import { Link } from "react-router-dom";

const columns = [
  { title: "ID", field: "id", type: "numeric" },
  { title: "ID Distributeur", field: "idDistributeur", type: "numeric" },
  { title: "Description", field: "description" },
  { title: "Date", field: "date" },
  {
    title: "Details",
    field: "details",
    render: (rowData) => {
      return (
        <Link className="text-success underline" to={`${rowData.id}`}>
          details
        </Link>
      );
    },
  },
];

const EDITABLE_DATA = [
  {
    id: "1",
    idDistributeur: "56",
    description: "lorem ipsum",
    date: "23/02/2023",
    details: "",
  },
  {
    id: "1",
    idDistributeur: "56",
    description: "lorem ipsum",
    date: "23/02/2023",
    details: "",
  },
  {
    id: "1",
    idDistributeur: "56",
    description: "lorem ipsum",
    date: "23/02/2023",
    details: "",
  },
];

const NotificationsTable = () => {
  const [data, setData] = useState(EDITABLE_DATA);



  return (
    <div className="p-10 w-full">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className={classes.tableCore}>
        <MaterialTable
          columns={columns}
          data={data}
          title=""
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
};

export default NotificationsTable;
