import React, { useState, useEffect } from "react";
import CoreTableBoisson from "./BaseTable/CoreTableBoisson";
import { axiosInstance } from "../util/axios";


/**
 * the page that displays the beverages in AC page
 * @component
 * @returns {React.ReactElement}
 */
const BoissonTableFirst = () => {

    const [distroList, setDirstroList] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");



    const fetchDist = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
			const token = localStorage.getItem("token");
            const response = await axiosInstance.get('/machine', {
				headers: {
					Authorization: `${token}`
				}
			});

            const fetchedData = response.data.data.filter(dist => dist.idClient == user.clientId);
            setDirstroList(fetchedData);
			console.log(fetchedData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        fetchDist();
    }, []);
    
    function handleSelect(event) {
        setSelectedValue(event.target.value);
        console.log(selectedValue);
    }

    return (
        <div className="p-10">

            <h1 className="text-2xl font-bold mb-4">Boissons</h1>
            <div className="flex justify-start align-baseline p-2 gap-3 ">
                <h2 className=" text-2xl font-medium" > Distributeur</h2>
                <select className="w-80 border-2 border-black rounded" onChange={handleSelect}>
                    {
                        distroList.map((dist,index) =>
                            <option selected={index === 0} value={dist.idDistributeur} key={index} >{dist.idDistributeur} - {dist.adresse} </option>
                        )
                    }
                </select>
            </div>
            <CoreTableBoisson idMachine={selectedValue}/>

        </div>
    );
}
export default BoissonTableFirst;