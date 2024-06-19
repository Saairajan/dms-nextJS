import React, {useEffect, useState} from "react";
import {it} from "node:test";
import {router} from "next/client";


const OrderForm: React.FC<OrderFormProps> = ({orderId}) => {
        console.log('print order ID ' + typeof orderId);
        const [orders, setOrders] = useState<Order>();

        useEffect(() => {
            if (orderId) {
                fetch(`http://localhost:5025/Order/${String(orderId)}`)
                    .then(response => response.json())
                    .then(data => setOrders(data))
                    .catch(error => {
                        console.error('Error fetching order:', error);
                    });
            } else {
                console.error('Failed to fetch data');
            }
        }, [orderId]);

        console.log('order Data: ' + JSON.stringify(orders))
        return (

            <div
                className="isolate  px-6 py-5 sm:py-5 lg:px-8  mx-3 grid grid-cols-1 md:grid-cols-2 gap-y-5 overflow-auto">

                <div className=" relative border-r-2 ml-3">
                    <label htmlFor="lastName"
                           className="block text-sm font-semibold leading-6 text-gray-900">Items</label>
                    {orders?.items.map((item: any, itemIndex: any) => (
                        <div key={itemIndex} className="mt-2.5 w-full">
                            <div className="flex items-center justify-between mr-3">
                                <div>
                                    <p id="lastName"
                                       className="block w-full  px-3.5 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{item.itemName}</p>
                                </div>
                                <div className="grid grid-cols-4 gap-5">
                                    <div>{item.weight}</div>
                                    <div>{item.volume}</div>
                                    <div>{item.total}</div>
                                    <div>{item.itemType}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className=" relative">
                    <label htmlFor="lastName"
                           className="block text-sm font-semibold leading-6 text-gray-900">Overall Order</label>
                    <div className="mt-2.5 w-1/2">
                        <div className="flex items-center justify-between space-x-5">
                            <div>
                                <p id="lastName"
                                   className="block w-full px-3.5 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">Distance</p>
                            </div>
                            <div>{orders?.distance}</div>
                        </div>
                        <div className="flex items-center justify-between space-x-5">
                            <div>
                                <p id="lastName"
                                   className="block w-full  px-3.5 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">Volume</p>
                            </div>
                            <div>{orders?.overallVolume}</div>
                        </div>
                        <div className="flex items-center justify-between space-x-5">
                            <div>
                                <p id="lastName"
                                   className="block w-full  px-3.5 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">Weight</p>
                            </div>
                            <div>{orders?.overallWeight}</div>
                        </div>
                        <div className="flex items-center justify-between space-x-5">
                            <div>
                                <p id="lastName"
                                   className="block w-full  px-3.5 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">Weight</p>
                            </div>
                            <div>{orders?.overallWeight}</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 grid gap-5 ">
                    <div className=" relative">
                        <label
                            className="block text-sm font-semibold leading-6 text-gray-900">PickUp point</label>
                        <div>
                            <p id="lastName"
                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.pickUpAddress}</p>
                        </div>
                    </div>
                    <div className=" relative w-full md:w-1/2">
                        <label
                            className="block text-sm leading-6 text-gray-900">PickUp Time</label>
                        <div>
                            <p id="lastName"
                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.pickUpTime}</p>
                        </div>
                    </div>
                    <div className=" relative">
                        <label
                            className="block text-sm font-semibold leading-6 text-gray-900">Delivery point</label>
                        <div>
                            <p id="lastName"
                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.deliveryAddress}</p>
                        </div>
                    </div>
                    <div className=" relative w-full md:w-1/2">
                        <label
                            className="block text-sm leading-6 text-gray-900">Delivery Time</label>
                        <div>
                            <p id="lastName"
                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{orders?.deliveryTime}</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 border-t-3 border p-3 ">
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
        );
    }
;

export default OrderForm;
