import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

export function Chart({ title }) {
	const chartRef = useRef(null);

	const labels = {
		"Cette Semaine": [
			"Jour1",
			"Jour2",
			"Jour3",
			"Jour4",
			"Jour5",
			"Jour6",
			"Jour7",
		],
		"Mois dernier": ["Semaine1", "Semaine2", "Semaine3", "Semaine4"],
		"Cette année": [
			"Mois1",
			"Mois2",
			"Mois3",
			"Mois4",
			"Mois5",
			"Mois6",
			"Mois7",
			"Mois8",
			"Mois9",
			"Mois10",
			"Mois11",
			"Mois12",
		],
	};

	const regions = [
		"Alger",
		"Blida",
		"Boumerdes",
		"Tipaza",
		"Oran",
		"Sétif",
		"Constantine",
	];

	const data = {
		"Cette Semaine": [2, 6, 1, 12, 4, 2, 0],
		"Mois dernier": [2, 6, 1, 12],
		"Cette année": [2, 6, 1, 12, 4, 2, 0, 5, 0, 0, 0, 0],
	};

	const [selectedPeriod, setSelectedPeriod] = useState("Cette Semaine");

	useEffect(() => {
		const options = {
			chart: {
				type: "line",
			},
			series: [
				{
					name: "sales",
					data: data[selectedPeriod],
				},
			],
			xaxis: {
				categories: labels[selectedPeriod],
			},
			title: {
				text: title,
				style: {
					fontSize: "18px",
					fontWeight: "bold",
					color: "#333",
				},
			},
			colors: ["#218261"],
		};

		const chart = new ApexCharts(chartRef.current, options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, [selectedPeriod]);

	const handlePeriodChange = (e) => {
		setSelectedPeriod(e.target.value);
	};

	return (
		<div className='chart-container w-full rounded shadow px-5 py-5 bg-gray-50'>
			<div ref={chartRef}></div>
			<div className='flex flex-row justify-between items-center space-x-4 pl-4'>
				<div className='flex items-center'>
					<label htmlFor='labelSelect' className='font-semibold'>
						Région :
					</label>
					<select
						id='labelSelect'
						className='appearance-none ml-2 border text-center border-gray-300 rounded-md shadow-sm focus:border-success focus:outline-none px-2 py-1'
					>
						{regions.map((region, index) => (
							<option key={index} value={region}>
								{region}
							</option>
						))}
					</select>
				</div>
				<div className='flex items-center'>
					<label className='font-semibold'>Période : </label>
					<select
						className='appearance-none ml-2 border text-center border-gray-300 rounded-md shadow-sm focus:border-success focus:outline-none px-2 py-1 '
						value={selectedPeriod}
						onChange={handlePeriodChange}
					>
						{Object.keys(labels).map((key, index) => (
							<option key={index} value={key}>
								{key}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}
