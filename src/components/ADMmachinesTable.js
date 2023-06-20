import { React, useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./BaseTable/styles.module.css";
import { axiosInstance } from "../util/axios";
import { useNavigate } from "react-router-dom";

const ADMmachinesTable = () => {
  const [data, setData] = useState([]);

  const EDITABLE_COLUMNS = [
    {
      title: "ID distributeur",
      field: "idDistributeur",
      type: "numeric",
      editable: "never",
    },
    { title: "address", field: "adresse" },
    {
      title: "longitude",
      field: "longitude",
    },
    {
      title: "latitude",
      field: "latitude",
    },
    { title: "status", field: "status", editable: "never" },
  ];

  async function getAllmachines() {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/machine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    if (response.data.statusCode === 200) {
      const idClient = JSON.parse(localStorage.getItem("user")).clientId;
      const machines = response.data.data.filter(
        (machine) => machine.idClient === idClient
      );
      setData(machines);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    getAllmachines();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Vending machines</h1>
      <div className={classes.tableCore}>
        <MaterialTable
          columns={EDITABLE_COLUMNS}
          data={data}
          title=""
          editable={{
            onRowUpdate: (newData, oldData) => {
              return new Promise(async (resolve, reject) => {
                try {
                  const token = localStorage.getItem("token");
                  const response = await axiosInstance.post(
                    `/machine/${oldData.idClient}`,
                    {
                      ...oldData,
                      ...newData,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  console.log(response);
                  if (response.data.statusCode === 200) {
                    getAllmachines();
                    resolve();
                  } else {
                    reject();
                  }
                } catch (err) {
                  console.log(err);
                  reject();
                }
              });
            },
          }}
          onRowClick={(event, rowData) => {
            navigate("/ADM/machines/" + rowData.idDistributeur);
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
          }}
        />
      </div>
    </div>
  );
};

export default ADMmachinesTable;
