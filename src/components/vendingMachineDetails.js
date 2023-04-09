import ChartComponent from "../components/ChartBar/ChartComponent";

export function VendingMachineDetails() {
	const data = {
		client: "",
		address: "",
	};

	return (
		<div className='w-full p-10 flex flex-col gap-8'>
			<h1 className='text-2xl font-bold'>Vending Machine \ 223 </h1>
			<div className='grid grid-cols-3 gap-8'>
				<div className='col-span-3 bg-gray-50 flex flex-col gap-4 w-full p-4 rounded-md shadow hover:shadow-lg border-solid border-2'>
					<div className='font-medium'>Client: {data.client}</div>
					<div className='font-medium'>Address: {data.address}</div>
				</div>

				<div className='col-span-1'>
					<ChartComponent />
				</div>

				<div className='col-span-2 bg-gray-50 flex flex-col gap-4 w-full h-full p-4 rounded-md shadow hover:shadow-lg border-solid border-2'>
					map goes here
				</div>
			</div>
		</div>
	);
}
