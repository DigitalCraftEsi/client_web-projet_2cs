import { React, useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import "@fontsource/poppins";
import classes from "./BaseTable/styles.module.css";
import { axiosInsance } from "../util/axios";

const ADMusersTable = () => {
  const [data, setData] = useState([]);

  const EDITABLE_COLUMNS = [
    { title: "id", field: "id", editable: "never", type: "numeric" },
    { title: "role", field: "role", lookup: {
        "DECIDEUR": "DECIDEUR",
        "AC": "AC",
        "AM": "AM",
    } },
    { title: "nom", field: "nom" },
    { title: "prenom", field: "prenom" },
    { title: "email", field: "email" },
    { title: "telephone", field: "telephone" },
  ];

  async function getAllusers() {
    const token = localStorage.getItem("token")
    const response = await axiosInsance.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    if (response.data.statusCode === 200) {
        const { decideurs, acs, ams } =  response.data.data;

        decideurs.forEach(decideur => {
            decideur.role = "DECIDEUR"
            decideur.nom = decideur.nomDecideur
            decideur.id = decideur.idDecideur
            decideur.prenom = decideur.prenomDecideur
            decideur.email = decideur.emailDecideur
            decideur.telephone = decideur.telephoneDecideur
        });

        acs.forEach(ac => {
            ac.role = "AC"
            ac.id = ac.idAC
            ac.nom = ac.nomAC
            ac.prenom = ac.prenomAC
            ac.email = ac.emailAC
            ac.telephone = ac.telephoneAC
        });

        ams.forEach(am => {
            am.role = "AM"
            am.id = am.idAM
            am.nom = am.nomAM
            am.prenom = am.prenomAM
            am.email = am.emailAM
            am.telephone = am.telephoneAM
        });

        setData([ ...decideurs, ...acs, ...ams ]);
    }
  }

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className={classes.tableCore}>
        <MaterialTable
          columns={EDITABLE_COLUMNS}
          data={data}
          title=""
          editable={{
            onRowAdd: (newData) => {
                return new Promise(async (resolve, reject) => {
                    const body = {
                        ...newData,
                        password: "chamsou2002"
                    };

                    const token = localStorage.getItem("token");
                    const response = await axiosInsance.post("/user", body, {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    });
                    console.log(response);

                    if(response.data.statusCode === 201) {
                        getAllusers();
                        resolve();
                    } else {
                        reject();
                    }
                });
            },
            onRowDelete: (oldData) => {
                return new Promise(async(resolve, reject) => {
                    const body = {
                        id: oldData.id,
                        role: oldData.role
                    };

                    console.log("body", body)

                    try {
                        const token = localStorage.getItem("token");
                        const response = await axiosInsance.delete("/user", {
                          data: body,
                          headers: {
                            Authorization: `Bearer ${token}`
                          }
                        });
                        console.log(response);
    
                        if(response.data.statusCode === 200) {
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
            }
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
