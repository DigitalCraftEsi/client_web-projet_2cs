import React, { useState, useEffect } from "react";
import CoreTableBoisson from "./BaseTable/CoreTableBoisson";
import { axiosInsance } from "../util/axios";


let tmp = [];

const BoissonTableFirst = () => {

    const [distroList, setDirstroList] = useState([]);


    const fetchDist = async () => {
        try {
            const response = await axiosInsance.get('/machine');
            const fetchedData = response.data.data;
            setDirstroList(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        fetchDist();
    }, []);

    return (
        <div className="p-10">

            <h1 className="text-2xl font-bold mb-4">Annonceurs</h1>
            <div className="flex justify-start align-baseline p-2 gap-3 ">
                <h2 className=" text-2xl font-medium" > Distributeur</h2>
                <select className="w-80 border-2 border-black rounded">
                    {
                        distroList.map((dist,index) =>
                            <option value={dist.id} key={index} > {dist.adresse} </option>
                        )
                    }
                </select>
            </div>
            <CoreTableBoisson />

        </div>
    );
}
export default BoissonTableFirst;