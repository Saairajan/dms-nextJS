"use client";


import {useEffect, useState} from "react";
import OrderInfo from "@/components/OrderInfo";
import axios from "axios";



export default function Shipment() {
    let [showOrderForm, setShowOrderForm] = useState(false);
    let [showOrderInfo, setShowOrderInfo] = useState(false);
    const [error, setError] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    const toggleOrderForm = () => {
        setShowOrderForm(!showOrderForm);
    };

    const toggleOrderInfo = (orderId: number) => {
        setSelectedOrderId(orderId);
        setShowOrderInfo(!showOrderInfo);
    }

    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {
            axios.get('http://localhost:5133/api/Shipment').then(response => {
            const shipments = response.data.$values;
            console.log("Data received from API:", shipments);
            const proceedShipments = shipments.map((shipment: any) => ({
                ...shipment,
                shipmentItems: shipment.shipmentItems?.$values
            })
            );
            console.log("shipment Items : ", proceedShipments);
            setOrders(proceedShipments);

            // setOrders(processedShipments);
        }).catch(error => {
            console.error('error fetching data in orders' + error);
        })
    }, []);

    const deleteOrder = async (orderId: number) => {
        try {
            const response = await fetch(`http://localhost:5133/api/Shipment/${orderId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the order');
            }

            // Optionally handle the response data
            const data = await response.json();
            console.log('Order deleted:', data);

            // Redirect or update the UI accordingly
        } catch (err: any) {
            setError(err.message);
        }
    };


    const headers = ["ID", "Recipient Name", "Phone Number", "PickUp Time", "Delivery Time", "Status", "Tracking Number", "Actions"];


    return (
        <div className="overflow-hidden">
            {showOrderInfo &&
                <div className="flex justify-center items-center">
                    <div onClick={() => setShowOrderInfo(false)}
                         className='absolute top-0 left-0 z-40 w-screen h-screen bg-black/20 '></div>
                    <div className="absolute top-3 flex">
                        <div className="bg-white z-50 rounded-lg shadow-md w-full max-h-[90vh] overflow-y-auto">
                            <OrderInfo orderId={selectedOrderId}/>
                        </div>
                    </div>
                </div>
            }

            <div className="px-4 sm:px-6 lg:px-4 relative">
                <div
                    className="md:flex md:items-center md:justify-end bg-white shadow-md md:p-4 -mx-4 sm:-mx-6 md:-mx-8">
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <a href="/order/newOrder">
                            <button type="button" onClick={toggleOrderForm}
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <p>Add Order</p>
                            </button>
                        </a>
                    </div>
                </div>
                <div className="mt-3 flow-root ">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 md:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle bg-white shadow-md">
                            <table className="min-w-full divide-y divide-gray-300 bg-white shadow-lg">
                                <thead>
                                <tr>
                                    {headers.map((header, index) => (
                                        <th
                                            key={index}
                                            scope="col"
                                            className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8 "
                                        >
                                            <div className="text-center pr-4">{header}</div>
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {orders.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="whitespace-nowrap text-center text-sm font-medium text-gray-900 sm:pl-6 lg:pl-3">{row.shipmentId}</td>
                                        <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-center">{row.recipientName}</td>
                                        <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-center">{row.recipientPhone}</td>
                                        <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-center">{row.sendingDate}</td>
                                        <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-center">{row.receivingDate}</td>

                                        {/*<td className="whitespace-nowrap py-4 text-sm text-gray-500 text-center">*/}
                                        {/*    {row.shipmentItems.map((item: any, index: number) => (*/}
                                        {/*        <div key={index}>{item.$id}</div>*/}
                                        {/*    ))}*/}
                                        {/*</td>*/}
                                        <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-center">{row.shipmentStatus}</td>
                                        <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-center">{row.trackingNumber}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-2">
                                            <div className="flex justify-center items-center space-x-3">
                                                <div></div>
                                                <a href={`/NewOrderForm?id=${row.shipmentId}`}
                                                   className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    <i className="fas fa-edit"></i><span
                                                    className="sr-only">, {row.shipmentId}</span></a>
                                                <a href="/order" className="text-indigo-600 hover:text-indigo-900"
                                                   onClick={() => deleteOrder(Number(row.shipmentId))}><i
                                                    className="fas fa-trash-alt"></i><span
                                                    className="sr-only">, {row.shipmentId}</span></a>

                                                <button onClick={() => toggleOrderInfo(Number(row.shipmentId))}>
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

        </div>
    );
}
