import { React, useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./BaseTable/styles.module.css";
import { axiosInstance } from "../util/axios";
import { TextField } from "@material-ui/core"

const ADMusersTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const EDITABLE_COLUMNS = [
    { title: "id", field: "id", editable: "never", type: "numeric" },
    {
      title: "role",
      field: "role",
      lookup: {
        DECIDEUR: "DECIDEUR",
        AC: "AC",
        AM: "AM",
      },
      editable: "onAdd"
    },
    { title: "nom", field: "nom" },
    { title: "prenom", field: "prenom" },
    { title: "email", field: "email" },
    { title: "telephone", field: "telephone" },
    {
      title: "password",
      field: "password",
      editable: "always",
      editComponent: (props) => (
        <TextField
          placeholder="password"
          type="password"
          value={props.value || ""}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
    }
  ];

  async function getAllusers() {
    setLoading(true);

    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    if (response.data.statusCode === 200) {
      const newData = [];
      response.data.data.decideurs?.forEach((row) => {
        newData.push({
          id: row.idDecideur,
          role: "DECIDEUR",
          nom: row.nomDecideur,
          prenom: row.prenomDecideur,
          email: row.emailDecideur,
          telephone: row.telephoneDecideur,
          idClient: row.idClient,
        });
      });

      response.data.data.acs?.forEach((row) => {
        newData.push({
          id: row.idAC,
          role: "AC",
          nom: row.nomAC,
          prenom: row.prenomAC,
          email: row.emailAC,
          telephone: row.telephoneAC,
          idClient: row.idClient,
        });
      });

      response.data.data.ams?.forEach((row) => {
        newData.push({
          id: row.idAM,
          role: "AM",
          nom: row.nomAM,
          prenom: row.prenomAM,
          email: row.emailAM,
          telephone: row.telephoneAM,
          idClient: row.idClient,
        });
      });

      setData(newData);
    }

    setLoading(false);
  }

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className={classes.tableCore}>
        <MaterialTable
          isLoading={loading}
          columns={EDITABLE_COLUMNS}
          data={data}
          title=""
          editable={{
            onRowAdd: (newData) => {
              return new Promise(async (resolve, reject) => {
                const body = {
                  ...newData,
                };

                const token = localStorage.getItem("token");
                const response = await axiosInstance.post("/user", body, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                console.log(response);

                if (response.data.statusCode === 201) {
                  getAllusers();
                  resolve();
                } else {
                  reject();
                }
              });
            },
            onRowUpdate: (newData, oldData) => {
              return new Promise(async (resolve, reject) => {
                const body = {
                  ...newData,
                  client: oldData.idClient,
                  password: newData.password == "" ? null : newData.password
                }

                delete body.idClient;
                delete body.tableData;

                const token = localStorage.getItem("token");
                const response = await axiosInstance.patch("/user", body, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                console.log(response);

                if (response.data.statusCode === 200) {
                  getAllusers();
                  resolve();
                } else {
                  reject();
                }
              });
            },
            onRowDelete: (oldData) => {
              return new Promise(async (resolve, reject) => {
                const body = {
                  id: oldData.id,
                  role: oldData.role,
                };

                console.log("body", body);

                try {
                  const token = localStorage.getItem("token");
                  const response = await axiosInstance.delete("/user", {
                    data: body,
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                  console.log(response);

                  if (response.data.statusCode === 200) {
                    getAllusers();
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
            },
            editCellStyle: {
              padding: "10px",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "18px",
              color: "555555",
            },
            // selection: true,
          }}
        />
      </div>
    </div>
  );
};

export default ADMusersTable;
