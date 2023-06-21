import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";

/**
 * statistic chart
 * @component
 * @returns {React.ReactElement}
 */
export function Chart2({ title, data }) {
	const chartRef = useRef(null);

	const labels = {
		Semaine: ["Semaine1", "Semaine2", "Semaine3", "Semaine4"],
		Mois: [
			"Janvier",
			"Février",
			"Mars",
			"Avril",
			"Mai",
			"Juin",
			"Juillet",
			"Aout",
			"Septembre",
			"Octobre",
			"Novembre",
			"Décembre",
		],
		Année: data.statistic2_Year.success.year,
	};

	const dataUsed = {
		Semaine: data.statistic2_Week,
		Mois: data.statistic2_Month,
		Année: data.statistic2_Year,
	};

	const [selectedPeriod, setSelectedPeriod] = useState("Semaine");

	useEffect(() => {
		const options = {
			chart: {
				type: "line",
			},
			series: [
				{
					name: "success",
					data:
						selectedPeriod === "Année"
							? dataUsed[selectedPeriod].success.count
							: dataUsed[selectedPeriod].success,
				},
				{
					name: "fail",
					data:
						selectedPeriod === "Année"
							? dataUsed[selectedPeriod].failed.count
							: dataUsed[selectedPeriod].failed,
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
			colors: ["#218261", "#FF0000"],
		};

		const chart = new ApexCharts(chartRef.current, options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, [selectedPeriod, data]);

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
