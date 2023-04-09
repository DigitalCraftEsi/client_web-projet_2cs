import { React, useState, useEffect } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const dummyData1 = {
	Day1: "2",
	Day2: "5",
	Day3: "6",
	Day4: "9",
	Day5: "2",
	Day6: "4",
	Day7: "2",
};

const dummyData2 = {
	Day1: "2",
	Day2: "6",
	Day3: "1",
	Day4: "12",
	Day5: "4",
	Day6: "2",
	Day7: "0",
};

const labels = ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"];
const regions = [
	"Alger",
	"Blida",
	"Boumerdes",
	"Tipaza",
	"Oran",
	"Sétif",
	"Constantine",
];

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Taux d'utilisation ",
		},
	},
};

export const data0 = {
	labels,
	datasets: [
		{
			label: "Dataset 1",
			data: dummyData1,
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "rgba(255, 99, 132, 0.5)",
		},
		{
			label: "Dataset 2",
			data: dummyData2,
			borderColor: "rgb(53, 162, 235)",
			backgroundColor: "rgba(53, 162, 235, 0.5)",
		},
	],
};

export function LineChart() {
	const [data, setData] = useState(data0);

	useEffect(() => {
		fetch("data.json")
			.then((response) => response.json())
			.then((data) => setData(data));
	}, []);

	return (
		<div className='w-1/3 h-1/2 border-2 ml-10 rounded p-5 bg-gray-50'>
			<div className='flex justify-between'>
				<div className='flex flex-row items-center gap-6'>
					<p>Région</p>
					<select className='w-20 p-1 border-solid border-[#49454F] border-2 rounded-lg'>
						{regions.map((region) => (
							<option value={region} key={region}>
								{region}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-row items-center gap-6'>
					<p>Période</p>
					<select className='w-20 p-1 border-solid border-[#49454F] border-2 rounded-lg'>
						{regions.map((region) => (
							<option value={region} key={region}>
								{region}
							</option>
						))}
					</select>
				</div>
			</div>
			<Line options={options} data={data} />
		</div>
	);
}