import {useEffect, useState} from "react";
import OrderInfo from "@/components/OrderInfo";


export default function Blog() {
    let [showDriverForm, setShowDriverForm] = useState(false);
    let [showDriverInfo, setShowDriverInfo] = useState(false);

    const toggleDriverForm = () => {
        setShowDriverForm(!showDriverForm);
    };


    const headers = ["ID", "Name", "Phone", "Email", "Vehicle Type", "License Number", "Address", "Availability", "Shift-Start Time", "Shift-End Time", "Action"];


    // Array for table data
    const [drivers, setDrivers] = useState<Driver[]>([]);
    useEffect(() => {
        fetch('http://localhost:5025/drivers')
            .then(response => response.json())
            .then(data => setDrivers(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);


    return (
        <div className="px-4 sm:px-6 lg:px-4">

            {/*{showDriverInfo &&*/}
            {/*    <div>*/}
            {/*        <div onClick={() => setShowDriverInfo(false)}*/}
            {/*             className='absolute top-0 left-0 z-40 w-screen h-screen bg-black/20 '></div>*/}
            {/*        <div className="absolute left-0 right-0 top-0 flex items-center justify-end ">*/}
            {/*            <div className="bg-white z-50 rounded-lg shadow-md w-1/2">*/}
            {/*                <OrderInfo orderId={selectedDriverId}/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*}*/}


            {/*{showOrderForm && <components />}*/}
            <div className="md:flex md:items-center md:justify-end bg-white shadow-md md:p-4 -mx-4 sm:-mx-6 md:-mx-8">
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <a href="/NewDriverForm">
                        <button type="button" onClick={toggleDriverForm}
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
                            Driver
                        </button>
                    </a>
                </div>
            </div>
            <div className="mt-3 flow-root ">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 md:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle bg-pink-400 bg-white shadow-md">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        scope="col"
                                        className="py-3.5 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                                    >
                                        <div className="text-center pr-3 ">{header}</div>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {drivers.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="whitespace-nowrap text-center py-4 pl-2 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-4">{row.id}</td>
                                    <td className="whitespace-nowrap text-center pl-2 py-4 text-sm text-gray-500">{row.name}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.phone}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.email}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.vehicleType}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.licenseNumber}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.currentLocation}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.availability ? "Available" : "Unavailable"}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.shiftStartTime}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.shiftEndTime}</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                                        <div className="flex justify-center items-center space-x-3">
                                            <div></div>
                                            <a href={`/NewOrderForm?id=${row.id}`}
                                               className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                <i className="fas fa-edit"></i><span
                                                className="sr-only">, {row.id}</span>
                                            </a>
                                            
                                            <a href="/order" className="text-indigo-600 hover:text-indigo-900">
                                                <i className="fas fa-trash-alt"></i><span
                                                className="sr-only">, {row.id}</span>
                                            </a>

                                            <button>
                                                <i className="fas fa-info-circle text-blue-500"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}