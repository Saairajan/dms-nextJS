import React, {useEffect, useState} from "react";
import axios from "axios";
import shipment from "@/app/order/page";



const OrderForm: React.FC<OrderFormProps> = ({orderId}) => {
        console.log('print order ID type ' + typeof orderId);
        console.log('print order ID ' + orderId);
        const [orders, setOrders] = useState<Order>();
        const headers = ["Items", "Weight", "Volume", "Charge"];

    // useEffect(() => {
    //     axios.get('http://localhost:5133/api/Shipment').then(response => {
    //         const shipments = response.data.$values;
    //         console.log("Data received from API:", shipments);
    //         const proceedShipments = shipments.map((shipment: any) => ({
    //             ...shipment,
    //             shipmentItems: shipment.shipmentItems?.$values
    //         }));


        useEffect(() => {
            if (orderId) {
                console.log('receiving ID ' + orderId );
                axios.get(`http://localhost:5133/api/Shipment/${String(orderId)}`)
                    .then(response => {
                        console.log('shipment Info: ' + JSON.stringify(response.data));
                        const shipment = response.data;
                        const proceedShipment = {
                            ...shipment,
                            shipmentItems: shipment.shipmentItems?.$values || []
                        };

                        // Set the processed shipment in state
                        setOrders(proceedShipment);
                    })

                    .catch(error => {
                        console.error('Error fetching order:', error);
                    });
            } else {
                console.error('Failed to fetch data');
            }
        }, [orderId]);

        return (

            <div
                className=" py-5 sm:py-5 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-y-5">

                <div className="relative col-span-2">
                    <label htmlFor="lastName"
                           className="block text-lg font-semibold leading-6 text-gray-900">Item Lists</label>
                    <table className="w-full mt-2.5 divide-y divide-gray-100 bg-white shadow-lg">
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
                        {orders?.shipmentItems.map((item: any, itemIndex: any) => (
                            <tr key={itemIndex}>
                                <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-center">{item.productName}</td>
                                <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-center">{item.weight}</td>
                                <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-center">{item.volume}</td>
                                <td className="whitespace-nowrap  py-4 text-sm text-gray-500 text-center">{item.charge}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid col-span-2 grid-cols-2 gap-5 py-3">
                    <div className="py-3">
                        <div className="relative w-ful">
                            <label
                                className="block text-sm font-semibold leading-6 text-gray-900">PickUp point</label>
                            <div>
                                <p id="lastName"
                                   className="block mt-2.5 w-full border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.senderAddress}</p>
                            </div>
                        </div>
                        <div className=" relative w-full ">
                            <label
                                className="block text-sm font-semibold leading-6 text-gray-900">PickUp Time</label>
                            <div>
                                <p id="lastName"
                                   className="block mt-2.5 w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.sendingDate}</p>
                            </div>
                        </div>
                        <div className="relative w-full">
                            <label
                                className="block text-sm font-semibold leading-6 text-gray-900">Delivery point</label>
                            <div>
                                <p id="lastName"
                                   className="block mt-2.5 w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.recipientAddress}</p>
                            </div>
                        </div>
                        <div className=" relative w-full">
                            <label
                                className="block text-sm font-semibold leading-6 text-gray-900">Delivery Time</label>
                            <div>
                                <p id="lastName"
                                   className="block mt-2.5 w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.receivingDate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="py-3">
                        <div className="relative w-full">
                            <label
                                className="block mt-2.5 text-sm font-semibold leading-6 text-gray-900">Distance</label>
                            <div>
                                <p id="lastName"
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.distance}</p>
                            </div>
                        </div>
                        <div className=" relative w-full">
                            <label
                                className="block mt-2.5 text-sm font-semibold leading-6 text-gray-900">Volume</label>
                            <div>
                                <p id="lastName"
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.overallVolume}</p>
                            </div>
                        </div>
                        <div className=" relative w-full">
                            <label
                                className="block mt-2.5 text-sm font-semibold leading-6 text-gray-900">OverallWeight</label>
                            <div>
                                <p id="lastName"
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.overallWeight}</p>
                            </div>
                        </div>
                        <div className=" relative w-full">
                            <label
                                className="block mt-2.5 text-sm font-semibold leading-6 text-gray-900">Overall
                                Charge</label>
                            <div>
                                <p id="lastName"
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.overallCharge}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <label htmlFor="lastName"
                           className="block text-lg font-semibold leading-6 text-gray-900">Item Lists</label>
                    <div className="border-t-3 border p-3 ">
                        <nav aria-label="Progress">
                            <ol role="list" className="overflow-hidden">
                                <li className="relative pb-10">
                                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
                                         aria-hidden="true"></div>
                                    {/*Complete Step*/}
                                    <a href="#" className="group relative flex items-start">
                                    <span className="flex h-9 items-center">
                                      <span
                                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                                        <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"
                                             aria-hidden="true">
                                          <path fill-rule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clip-rule="evenodd"/>
                                        </svg>
                                      </span>
                                    </span>
                                        <span className="ml-4 flex min-w-0 flex-col">
                                      <span className="text-sm font-medium">Order is received</span>
                                      <span className="text-sm text-gray-500">Vitae sed mi luctus laoreet.</span>
                                    </span>
                                    </a>
                                </li>
                                <li className="relative pb-10">
                                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                                         aria-hidden="true"></div>
                                    {/*Current Step*/}
                                    <a href="#" className="group relative flex items-start" aria-current="step">
                                    <span className="flex h-9 items-center" aria-hidden="true">
                                      <span
                                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                                        <span className="h-2.5 w-2.5 rounded-full bg-indigo-600"></span>
                                      </span>
                                    </span>
                                        <span className="ml-4 flex min-w-0 flex-col">
                                      <span className="text-sm font-medium text-indigo-600">Processing</span>
                                      <span className="text-sm text-gray-500">Cursus semper viverra facilisis et et some more.</span>
                                    </span>
                                    </a>
                                </li>
                                <li className="relative pb-10">
                                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                                         aria-hidden="true"></div>
                                    {/*Upcoming Step*/}
                                    <a href="#" className="group relative flex items-start">
                                    <span className="flex h-9 items-center" aria-hidden="true">
                                      <span
                                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                        <span
                                            className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"></span>
                                      </span>
                                    </span>
                                        <span className="ml-4 flex min-w-0 flex-col">
                                      <span className="text-sm font-medium text-gray-500">Preparing your Order for Delivery</span>
                                      <span className="text-sm text-gray-500">Penatibus eu quis ante.</span>
                                    </span>
                                    </a>
                                </li>
                                <li className="relative pb-10">
                                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                                         aria-hidden="true"></div>
                                    {/*Upcoming Step*/}
                                    <a href="#" className="group relative flex items-start">
                                    <span className="flex h-9 items-center" aria-hidden="true">
                                      <span
                                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                        <span
                                            className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"></span>
                                      </span>
                                    </span>
                                        <span className="ml-4 flex min-w-0 flex-col">
                                      <span className="text-sm font-medium text-gray-500">Out for Delivery</span>
                                      <span className="text-sm text-gray-500">Faucibus nec enim leo et.</span>
                                    </span>
                                    </a>
                                </li>
                                <li className="relative pb-10">
                                    <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                                         aria-hidden="true"></div>
                                    {/*Upcoming Step*/}
                                    <a href="#" className="group relative flex items-start">
                                    <span className="flex h-9 items-center" aria-hidden="true">
                                      <span
                                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                        <span
                                            className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"></span>
                                      </span>
                                    </span>
                                        <span className="ml-4 flex min-w-0 flex-col">
                                      <span className="text-sm font-medium text-gray-500">Arrived to Destination</span>
                                      <span className="text-sm text-gray-500">Iusto et officia maiores porro ad non quas.</span>
                                    </span>
                                    </a>
                                </li>
                                <li className="relative ">
                                    {/*Upcoming Step*/}
                                    <a href="#" className="group relative flex items-start">
                                    <span className="flex h-9 items-center" aria-hidden="true">
                                      <span
                                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                        <span
                                            className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"></span>
                                      </span>
                                    </span>
                                        <span className="ml-4 flex min-w-0 flex-col">
                                      <span className="text-sm font-medium text-gray-500">Order Delivered</span>
                                      <span className="text-sm text-gray-500">Iusto et officia maiores porro ad non quas.</span>
                                    </span>
                                    </a>
                                </li>
                            </ol>
                        </nav>

                    </div>
                </div>
            </div>
        );
    }
;

export default OrderForm;
