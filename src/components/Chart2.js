import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

export function Chart2({ title }) {
	const chartRef = useRef(null);

	const labels = {
		Semaine: ["Semaine1", "Semaine2", "Semaine3", "Semaine4"],
		Mois: ["Janvier", "Février", "Mars", "Avril"],
		Année: [2020, 2021, 2022, 2023],
	};

	const data = {
		Semaine: [2, 6, 1, 12],
		Mois: [2, 6, 1, 3],
		Année: [60, 75, 1, 12],
	};

	const [selectedPeriod, setSelectedPeriod] = useState("Semaine");

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
			<div className='flex flex-row justify-end space-x-4 pl-5'>
				<div className='flex items-center'>
					<label className='font-semibold'>Par : </label>
					<select
						className='appearance-none ml-2 border text-center border-gray-300 rounded-md shadow-sm focus:border-success focus:outline-none px-2 py-1'
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
