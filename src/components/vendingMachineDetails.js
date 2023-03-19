import ChartComponent from "../components/ChartBar/ChartComponent";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const URL = "http://localhost:8000/machine"

export function VendingMachineDetails() {
  const { id } = useParams();

  const [data, setData] = useState({
      "idDistributeur": "",
      "adresse": "",
      "codeDeDeverrouillage": "",
      "idClient": null,
      "idAM": null,
      "longitude": null,
      "latitude": null
  });


  useEffect(() => {
    fetch(`${URL}/${id}`)
    .then(response => response.json())
    .then(result => {
        setData(result.data);
    });
  }, [id])

  return (
    <div className="w-full p-10 flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Vending Machine \ {id} </h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md shadow hover:shadow-lg border-solid border-2">
          <div className="font-medium">ID distributeur: {data.idDistributeur}</div>
          <div className="font-medium">Client: {data.idClient}</div>
          <div className="font-medium">Address: {data.adresse}</div>
          <div className="font-medium">Longitude: {data.longitude}</div>
          <div className="font-medium">Latitude: {data.latitude}</div>
          <div className="font-medium">Code de deverrouillage: {data.codeDeDeverrouillage}</div>
        </div>

        <div className="col-span-1">
            <ChartComponent />
        </div>

        <div className="col-span-2 bg-gray-50 flex flex-col gap-4 w-full h-full p-4 rounded-md shadow hover:shadow-lg border-solid border-2">
            map goes here
        </div>
      </div>
    </div>
  );
}
