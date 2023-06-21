import { React, useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./BaseTable/styles.module.css";
import { axiosInstance } from "../util/axios";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";

/**
 * a table containing the list of ADMs of a client in SADM page
 * @component
 * @returns {React.ReactElement}
 */
export default function SADMclientADMTable() {
  const [loading, setLoading] = useState(false);

  const EDITABLE_COLUMNS = [
    { title: "ID", field: "idADM", type: "numeric", editable: "never" },
    { title: "nom", field: "nomADM" },
    { title: "prenom", field: "prenomADM" },
    { title: "telephone", field: "telephoneADM" },
    { title: "email", field: "emailADM" },
    { title: "ID client", field: "idClient", editable: "never" },
    {
      title: "client",
      field: "client",
      editable: "never",
      render: (rowData) => (<span>{clientData.nomClient}</span>)
    },
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
    },
  ];

	const { id: idClient } = useParams();
	let id = parseInt(idClient);

  const [data, setData] = useState([]);
  const [clientData, setClientData] = useState({});

  async function getAllADMs() {
    setLoading(true);
    const token = localStorage.getItem("token");

    const response = await axiosInstance.post(`/user/getadm`, {
        id,
        role: "ADM",
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data.statusCode === 200) {
      setData(response.data.data.adm);
      setClientData(response.data.data.client);
    }

    setLoading(false);
  }

  useEffect(() => {
    getAllADMs();
  }, []);


  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">ADMs of {'"'}{clientData.nomClient}{'" / id: '}  {id}</h1>
      <div className={classes.tableCore}>
        <MaterialTable
          isLoading={loading}
          columns={EDITABLE_COLUMNS}
          data={data}
          title=""
          editable={{
            onRowAdd: (newData) => {
              return new Promise((resolve, reject) => {
                const body = {
                  email: newData.emailADM,
                  nom: newData.nomADM,
                  prenom: newData.prenomADM,
                  password: newData.password == "" ? null : newData.password,
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
            onRowDelete: (oldData) => {
              return new Promise(async (resolve, reject) => {
                const body = {
                  id: oldData.idADM,
                  role: "ADM",
                };

                console.log("body", body);

                try {
                  const token = localStorage.getItem("token");
                  const response = await axiosInstance.delete("/user", {
                    data: body,
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                  console.log(response);

                  if (response.data.statusCode === 200) {
                    getAllADMs();
                    resolve();
                  } else {
                    reject();
                  }
                } catch (err) {
                  console.log(err);
                  reject();
                }
              })
            }
          }}
          options={{
            // actionsColumnIndex: -1,
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
