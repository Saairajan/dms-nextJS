import {useState} from "react";


export default function Blog() {

    const headers = ["ID", "Name", "Phone", "Email", "Vehicle Type", "License Number", "Current Location", "Availability", "Shift-Start Time", "Shift-End Time", "Edit"];

    // Array for table data
    const data = [
        {
            id: "101",
            name: "Alice Johnson",
            contactNumber: "555-1234",
            email: "alice.johnson@example.com",
            vehicleType: "Car",
            licenseNumber: "AB123456",
            currentLocation: "123 Maple Street, Springfield",
            availability: "Available",
            shiftStartTime: "08:00",
            shiftEndTime: "16:00"
        },
        {
            id: "102",
            name: "Bob Smith",
            contactNumber: "555-5678",
            email: "bob.smith@example.com",
            vehicleType: "Bike",
            licenseNumber: "XY789012",
            currentLocation: "456 Oak Avenue, Metropolis",
            availability: "Unavailable",
            shiftStartTime: "09:00",
            shiftEndTime: "17:00"
        },
        {
            id: "103",
            name: "Charlie Brown",
            contactNumber: "555-8765",
            email: "charlie.brown@example.com",
            vehicleType: "Truck",
            licenseNumber: "CD345678",
            currentLocation: "789 Pine Road, Smallville",
            availability: "Available",
            shiftStartTime: "10:00",
            shiftEndTime: "18:00"
        },
        {
            id: "104",
            name: "Dana White",
            contactNumber: "555-4321",
            email: "dana.white@example.com",
            vehicleType: "Car",
            licenseNumber: "EF901234",
            currentLocation: "101 Birch Lane, Gotham",
            availability: "Available",
            shiftStartTime: "11:00",
            shiftEndTime: "19:00"
        }
        // Add more data objects as needed
    ];


    return (
        <div className="px-4 sm:px-6 lg:px-4">
            {/*{showOrderForm && <components />}*/}
            <div className="md:flex md:items-center md:justify-end bg-white shadow-md md:p-4 -mx-4 sm:-mx-6 md:-mx-8">
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
                        Driver
                    </button>
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
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="whitespace-nowrap text-center py-4 pl-2 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-4">{row.id}</td>
                                    <td className="whitespace-nowrap text-center pl-2 py-4 text-sm text-gray-500">{row.name}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.contactNumber}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.email}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.vehicleType}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.licenseNumber}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.currentLocation}</td>
                                    <td className="whitespace-nowrap text-center py-4 text-sm text-gray-500">{row.availability}</td>
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