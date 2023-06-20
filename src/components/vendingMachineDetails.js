import ChartComponent from "../components/ChartBar/ChartComponent";
import { Map } from "../components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosInstance } from "../util/axios";

export function VendingMachineDetails() {
  const { id } = useParams();

  const [data, setData] = useState({});

  async function getMachine(id) {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get("/machine/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    if (response.data.statusCode === 200) {
      setData(response.data.data);
    }
  }

  useEffect(() => {
    getMachine(id);
  }, []);

  return (
    <div className="w-full p-10 flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Vending Machine \ {id} </h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md shadow hover:shadow-lg border-solid border-2">
          <div className="font-medium">
            ID distributeur: {data.idDistributeur}
          </div>
          <div className="font-medium">Client: {data.idClient}</div>
          <div className="font-medium">Address: {data.adresse}</div>
          <div className="font-medium">Longitude: {data.longitude}</div>
          <div className="font-medium">Latitude: {data.latitude}</div>
        </div>

        <div className="col-span-1">
          <ChartComponent />
        </div>

        <div className="col-span-2 overflow-hidden bg-gray-50 gap-4 w-full h-[400px] rounded-md shadow hover:shadow-lg border-solid border-2">
          <Map data={data} />
        </div>
      </div>
    </div>
  );
}
