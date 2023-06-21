import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { axiosInstance } from "../util/axios";

/**
 * pie chart
 * @component
 * @returns {React.ReactElement}
 */
export function Chart({ title, data, regions }) {
	const chartRef = useRef(null);

	useEffect(() => {
		const options = {
			chart: {
				type: "pie",
			},
			series: data,
			labels: regions,
			title: {
				text: title,
				style: {
					fontSize: "18px",
					fontWeight: "bold",
					color: "#333",
				},
			},
			colors: generateRandomColors(data.length),
		};

		const chart = new ApexCharts(chartRef.current, options);
		chart.render();

		return () => {
			chart.destroy();
		};
	}, [data]);

	function generateRandomColors(count) {
		const colors = [];
		for (let i = 0; i < count; i++) {
			colors.push(getRandomColor());
		}
		return colors;
	}

	function getRandomColor() {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	return (
		<div className='chart-container w-full rounded shadow px-5 py-5 bg-gray-50'>
			<div ref={chartRef}></div>
			<div className='flex flex-row justify-between items-center space-x-4 pl-4'></div>
		</div>
	);
}
