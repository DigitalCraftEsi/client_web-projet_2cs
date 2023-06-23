import { React, useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./styles.module.css";
import { axiosInstance } from "../../util/axios";
import {
  Select,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";

const DisTable = () => {
  const [clientsArray, setClientsArray] = useState([]);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const EDITABLE_COLUMNS = [
    {
      title: "ID distributeur",
      field: "idDistributeur",
      type: "numeric",
      editable: "never",
    },
    { title: "ID client", field: "idClient", type: "numeric", editable: "never" },
    {
      title: "nom client",
      field: "client.nomClient",
      type: "string",
      editable: "never",
    },
    {
      title: "distUID",
      field: "distuid",
      type: "string",
      editable: "onAdd"
    },
    {
      title: "odbUID",
      field: "odbuid",
      type: "string",
      editable: "onAdd"
    }
  ];




  async function getAllmachines() {
    setLoading(true);
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(`/machine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const clientsResponse = await axiosInstance.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    console.log(clientsResponse);

    if (
      response.data.statusCode === 200 &&
      clientsResponse.data.statusCode === 200
    ) {
      setClientsArray(clientsResponse.data.data.clients);

      // response.data.data.forEach((machine) => {
      //   machine.nomClient = "";
      //   const clientIndex = clientsResponse.data.data.findIndex(
      //     (client) => client.idClient === machine.idClient
      //   );

      //   if (clientIndex >= 0) {
      //     machine.nomClient = clientsResponse.data.data[clientIndex].nomClient;
      //     // console.log("nomClient", machine.nomClient)
      //   }
      // });

      setData(response.data.data);
      // console.log(data);
    }

    setLoading(false);
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
          <div
            style={{
              display: "flex",
              "flex-direction": "column",
              gap: "30px",
            }}
          >
            <TextField
              label="ID distributeur"
              variant="outlined"
              type="number"
              value={editedRow.idDistributeur}
              InputProps={{
                readOnly: true,
              }}
            />

            <select
              label="id_client"
              variant="outlined"
              autoFocus={false}
              value={editedRow.idClient}
              onChange={(e) =>
                setEditRow((prevData) => ({
                  ...prevData,
                  idClient: e.target.value,
                }))
              }
            >
              {clientsArray.map((client, index) => (
                <option key={index} value={client.idClient}  >
                  {client.idClient} - {client.nomClient}
                </option>
              ))}
            </select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            cancel
          </Button>

          <Button
            color="success"
            onClick={async () => {
              setDialogOpen(false);

              const body = {
                client: parseInt(editedRow.idClient),
                machines: [parseInt(editedRow.idDistributeur)],
              };

              console.log("assign body:", body);

              console.log("id client", editedRow.idClient);
              console.log("edit body", body);
              const token = localStorage.getItem("token");

              const response = await axiosInstance.post(
                "/machine/client/assignation",
                body,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("assign client response", response);

              if (response.data.statusCode === 200) {
                getAllmachines();
              }
            }}
          >
            assign
          </Button>
        </DialogActions>
      </Dialog>



      <MaterialTable
        isLoading={loading}
        columns={EDITABLE_COLUMNS}
        data={data}
        title=""
        onRowClick={(event, rowData) => {
          if(!rowData.idClient) {
            setEditRow(rowData);
            setDialogOpen(true);
          }
        }}
        editable={{
          onRowAdd: async (newData) => {
            return new Promise((resolve, reject) => {

              const body = {
                distuid: newData.distuid,
                odbuid: newData.odbuid,
              };

              const token = localStorage.getItem("token");

              axiosInstance
                .post("/machine", body, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                .then((response) => {
                  console.log(response);

                  if (response.data.statusCode === 200) {
                    // setData([...data, response.data.data]);
                    getAllmachines();
                    resolve();
                  } else {
                    reject();
                  }
                });
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
          selection: true,
        }}
      />
    </div>
  );
};

export default DisTable;
