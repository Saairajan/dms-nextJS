"use client";


import React, {useEffect, useState} from "react";
import MapComponent from "@/components/Maps";
import {useRouter, useSearchParams} from "next/navigation";

const OrderForm: React.FC = () => {

    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');
    console.log('id received: ' + id);
    const status = [
        "Order Received",
        "Processing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
    ];

    const breakable = [
        "Breakable",
        "Durable",

    ];

    type Item = {
        itemName: string;
        itemType: string;
        weight: string;
        volume: string;
        total: string;
    };


    const [formData, setFormData] = useState({
        RecipientName: '',
        RecipientPhone: '',
        RecipientEmail: '',
        SenderAddress: '',
        SendingDate: '',
        RecipientAddress: '',
        ReceivingDate: '',
        Distance: 0,
        items: [{
            ProductName: '',
            ItemType: 'Durable',
            Weight: '',
            Volume: '',
            Charge: ''
        }],
        ShipmentStatus: 'pending',
        OverallCharge: 0,
        OverallWeight: 0,
        OverallVolume: 0,
    });

    const token = localStorage.getItem('authToken');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {

            const method = isUpdating ? 'PUT' : 'POST';
            const url = isUpdating ? `http://localhost:5133/Order/${id}` : 'http://localhost:5133/api/Shipment';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log(`Shipment ${isUpdating ? 'updated' : 'created'} successfully!`);
                // Optionally: Reset the form after successful submission
                setFormData({
                    RecipientName: '',
                    RecipientPhone: '',
                    RecipientEmail: '',
                    SenderAddress: '',
                    SendingDate: '',
                    RecipientAddress: '',
                    ReceivingDate: '',
                    Distance: 0,
                    items: [{
                        ProductName: '',
                        ItemType: 'Durable',
                        Weight: '',
                        Volume: '',
                        Charge: ''
                    }],
                    ShipmentStatus: 'pending',
                    OverallCharge: 0,
                    OverallWeight: 0,
                    OverallVolume: 0,
                });
                setShowForm(false);
            } else {
                console.error(`Failed to ${isUpdating ? 'update' : 'create'} order:`, await response.text());
                // Handle error scenario: show error message to user
            }
        } catch (error) {
            console.error('Error ${isUpdating ? \'updating\' : \'creating\'} order:', error);
            // Handle error scenario: show error message to user
        }
    };

    useEffect(() => {
        // if (id) {
        //     const id = router.query.id;
        //     console.log('update ID: ' + typeof id);
        //     fetch(`http://localhost:5025/Order/${id}`)
        //         .then(response => response.json())
        //         .then(data => {
        //             setFormData({
        //                 RecipientName: data.Name,
        //                 RecipientPhone: data.phoneNo,
        //                 RecipientEmail: data.email,
        //                 SenderAddress: data.pickUpAddress,
        //                 SendingDate: data.pickUpTime,
        //                 RecipientAddress: data.deliveryAddress,
        //                 ReceivingDate: data.deliveryTime,
        //                 Distance: data.distance,
        //                 items: data.items.map((item: any) => ({
        //                     ProductName: item.itemName,
        //                     itemType: item.itemType,
        //                     weight: item.weight,
        //                     volume: item.volume,
        //                     total: item.total
        //                 })),
        //                 ShipmentStatus: data.orderStatus,
        //                 OverallCharge: data.OverallCharge,
        //                 OverallWeight: data.OverallWeight,
        //                 OverallVolume: data.OverallVolume,
        //             });
        //             setIsUpdating(true);
        //         })
        //         .catch(error => {
        //             console.error('Error fetching order:', error);
        //         });
        // } else {
        //     console.error('Failed to fetch data');
        // }
        const fetchData = async () => {
            if (id) {
                try {
                    const response = await fetch(`http://localhost:5025/Order/${id}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();

                    setFormData({
                        RecipientName: data.RecipientName,
                        RecipientPhone: data.RecipientPhone,
                        RecipientEmail: data.RecipientEmail,
                        SenderAddress: data.SenderAddress,
                        SendingDate: data.SendingDate,
                        RecipientAddress: data.RecipientAddress,
                        ReceivingDate: data.ReceivingDate,
                        Distance: data.Distance,
                        items: data.items.map((item: any) => ({
                            ProductName: item.ProductName,
                            itemType: item.itemType,
                            weight: item.weight,
                            volume: item.volume,
                            total: item.total
                        })),
                        ShipmentStatus: data.ShipmentStatus,
                        OverallCharge: data.OverallCharge,
                        OverallWeight: data.OverallWeight,
                        OverallVolume: data.OverallVolume,
                    });
                    setIsUpdating(true);
                } catch (error) {
                    console.error('Error fetching order:', error);
                }
            } else {
                console.error('No ID found in query parameters');
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
        const {name, value} = e.target;

        if (name.startsWith('items')) {
            const index = parseInt(name.split('.')[1]); // Get the index of the item
            const updatedItems = [...formData.items];
            updatedItems[index] = {
                ...updatedItems[index],
                [name.split('.')[2]]: value // Update the specific item field
            };

            const weight = updatedItems[index].Weight || '0';
            const volume = updatedItems[index].Volume || '0';
            const distance = parseFloat(String(formData.Distance)) || 0;
            const isBreakable = updatedItems[index].ItemType === 'Breakable';
            const total = calculateCost(weight, volume, distance, isBreakable).toFixed(2);
            updatedItems[index].Charge = total;
            const overallCharge: string = updatedItems.reduce((sum, item) => sum + parseFloat(item.Charge || '0'), 0).toFixed(2);
            const overallWeight = updatedItems.reduce((sum, item) => sum + parseFloat(item.Weight || '0'), 0).toFixed(2);
            const overallVolume = updatedItems.reduce((sum, item) => sum + parseFloat(item.Volume || '0'), 0).toFixed(2);
            setFormData(prevFormData => ({
                ...prevFormData,
                items: updatedItems,
                OverallCharge: parseFloat(overallCharge.toString()),
                OverallWeight: parseFloat(overallWeight.toString()),
                OverallVolume: parseFloat(overallVolume.toString()),
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };


    const handleAddItem = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            items: [
                ...prevFormData.items,
                {
                    ProductName: '',
                    ItemType: 'Durable',
                    Weight: '',
                    Volume: '',
                    Charge: ''
                }
            ]
        }));
    };

    const handleRemoveItem = (indexToRemove: number) => {
        setFormData(prevState => ({
            ...prevState,
            items: prevState.items.filter((item, index) => index !== indexToRemove)
        }));
    };


    const handleMapUpdate = (markers: string | any[], distance: any) => {


        const updatedFormData = {...formData};

        // Update pickUpAddress if there is only one marker
        if (markers.length === 1) {
            updatedFormData.SenderAddress = `Latitude: ${markers[0].lat}, Longitude: ${markers[0].lng}`;
        } else if (markers.length === 2) {
            // Update deliveryAddress if there are two markers
            updatedFormData.RecipientAddress = `Latitude: ${markers[1].lat}, Longitude: ${markers[1].lng}`;
        }
        // Update distance in formData
        updatedFormData.Distance = distance !== null ? distance.toFixed(2) : '';
        // Set the updated formData in state
        setFormData(updatedFormData);
    };

    const calculateCost = (Weight: string, Volume: string, Distance: number, isBreakable: boolean): number => {
        // Example calculation logic, adjust based on your pricing strategy
        const baseRatePerKm = 2; // Example base rate per kilometer
        const weightCoefficient = 0.5; // Example coefficient for weight
        const volumeCoefficient = 0.001; // Example coefficient for volume in cm^3
        const breakableCoefficient = breakable ? 1.5 : 1;

        const cost = (Distance * baseRatePerKm
            + parseFloat(Weight) * weightCoefficient
            + parseFloat(Volume) * volumeCoefficient) * breakableCoefficient;


        return cost;
    };


    const [showForm, setShowForm] = useState(true);

    return (

        <div className="isolate bg-white px-6 py-5 sm:py-5 lg:px-8 md:w-full rounded-lg mx-3 ">
            <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-8  sm:mt-8  md:w-full">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">Recipient
                            Recipient Name</label>
                        <div className="mt-2.5">
                            <input type="text" name="RecipientName" id="firstName" autoComplete="given-name"
                                   value={formData.RecipientName} onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">Recipient
                           Recipient Phone
                            No</label>
                        <div className="mt-2.5">
                            <input type="text" name="RecipientPhone" id="phoneNo" autoComplete="given-name"
                                   value={formData.RecipientPhone} onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name"
                               className="block text-sm font-semibold leading-6 text-gray-900">Recipient Email</label>
                        <div className="mt-2.5">
                            <input type="text" name="RecipientEmail" id="email" autoComplete="family-name"
                                   value={formData.RecipientEmail} onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message"
                               className="block text-sm font-semibold leading-6 text-gray-900">Address</label>
                        <div>
                            <MapComponent onMapClick={handleMapUpdate}/>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="mt-2.5 w-full">
                                <input type="text" name="SenderAddress" id="pickUpAddress"
                                       autoComplete="given-name"
                                       value={formData.SenderAddress} onChange={handleChange}
                                       className="block w-full pl-6 border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            <div className="mt-2.5 relative">
                                <input type="datetime-local" name="SendingDate" id="pickUpTime"
                                       value={formData.SendingDate} onChange={handleChange}
                                       className="c block  border-0 px-3.5 pl-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="mt-2.5 w-full">
                                <input type="text" name="RecipientAddress"
                                       id="deliveryAddress" autoComplete="given-name"
                                       value={formData.RecipientAddress}
                                       onChange={handleChange}
                                       className="block w-full pl-6 border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            <div className="mt-2.5 relative">
                                <input type="datetime-local" name="ReceivingDate"
                                       id="deliveryTime"
                                       value={formData.ReceivingDate}
                                       onChange={handleChange}
                                       className="c block  border-0 px-3.5 pl-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-3 md:col-span-2">
                        <label htmlFor="company"
                               className="block text-sm font-semibold leading-6 text-gray-900">Items</label>
                        <div className="flex justify-first space-x-4 ">
                            <div className="mt-2.5 relative">
                                <input type="text" name="Distance" id="distance"
                                       value={formData.Distance} onChange={handleChange}
                                       className="w-[150px] block  border-0 px-3.5 pl-6 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                <p className="absolute top-2 left-2 text-gray-400"><i className="fas fa-walking"></i>
                                </p>
                            </div>
                            <div className="mt-2.5 relative">
                                <input type="text" name="OverallVolume" id="volume"
                                       value={formData.OverallVolume} onChange={handleChange}
                                       className="w-[150px] block  border-0 px-3.5 pl-7 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                <p className="absolute top-2 left-2 text-gray-400"><i className="fas fa-box"></i></p>
                            </div>
                            <div className="mt-2.5 relative">
                                <input type="text" name="OverallWeight" id="volume"
                                       value={formData.OverallWeight} onChange={handleChange}
                                       className="w-[150px] block  border-0 px-3.5 pl-7 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                <p className="absolute top-2 left-2 text-gray-400"><i
                                    className="fas fa-weight-hanging"></i>
                                </p>
                            </div>
                            <div className="mt-2.5 relative">
                                <input type="text" name="OverallCharge" id="total"
                                       value={formData.OverallCharge}
                                       onChange={handleChange}
                                       className="w-[150px] block  border-0 px-3.5 pl-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                <p className="absolute top-2 left-2 text-gray-400">$</p>
                            </div>
                        </div>

                        {/*ITEM SECTION*/}
                        {formData.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="mt-2.5 w-full">
                                    <input type="text" name={`items.${index}.ProductName`} id="itemName"
                                           autoComplete="given-name"
                                           value={item.ProductName} onChange={handleChange}
                                           className="block w-full pl-6 border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                                <div className="mt-2.5 relative">
                                    <select id="itemType" name={`items.${index}.ItemType`} autoComplete="driver"
                                            value={item.ItemType} onChange={handleChange}
                                            className=" block bg-transparent pl-6 border-0 px-3.5 py-3 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        {breakable.map((condition, index) => (
                                            <option key={index}>{condition}</option>
                                        ))}
                                    </select>
                                    <p className="absolute top-2 left-2 text-gray-400"><i
                                        className="fas fa-exclamation-triangle text-sm"></i></p>
                                </div>
                                <div className="mt-2.5 relative">
                                    <input type="text" name={`items.${index}.Weight`} id="weight"
                                           value={item.Weight} onChange={handleChange}
                                           className="w-[150px] block  border-0 px-3.5 pl-7 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    <p className="absolute top-2 left-2 text-gray-400"><i
                                        className="fas fa-weight-hanging"></i>
                                    </p>
                                </div>
                                <div className="mt-2.5 relative">
                                    <input type="text" name={`items.${index}.Volume`} id="volume"
                                           value={item.Volume} onChange={handleChange}
                                           className="w-[150px] block  border-0 px-3.5 pl-7 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    <p className="absolute top-2 left-2 text-gray-400"><i className="fas fa-box"></i>
                                    </p>
                                </div>
                                <div className="mt-2.5 relative">
                                    <input type="text" name={`items.${index}.Charge`} id="total"
                                           value={item.Charge}
                                           onChange={handleChange}
                                           className="w-[150px] block  border-0 px-3.5 pl-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    <p className="absolute top-2 left-2 text-gray-400">$</p>
                                </div>
                                {index === formData.items.length - 1 && (
                                    <div className="mt-2.5 relative">
                                        <button className=" text-gray-400" onClick={handleAddItem}><i
                                            className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                )}
                                {index !== formData.items.length - 1 && (
                                    <div className="mt-2.5 relative">
                                        <button className="text-gray-400" onClick={() => handleRemoveItem(index)}>
                                            <i className="fas fa-minus"></i>
                                        </button>
                                    </div>
                                )}

                            </div>
                        ))}

                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="orderstatus" className="block text-sm font-semibold leading-6 text-gray-900">Order
                            Status</label>
                        <div className="mt-2.5">
                            <select id="orderStatus" name="ShipmentStatus" autoComplete="country-name"
                                    value={formData.ShipmentStatus} onChange={handleChange}
                                    className=" block bg-transparent w-full  border-0 px-3.5 py-3 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {status.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/*<div className="sm:col-span-2">*/}
                    {/*    <label htmlFor="orderstatus"*/}
                    {/*           className="block text-sm font-semibold leading-6 text-gray-900">Driver</label>*/}
                    {/*    <div className="mt-2.5">*/}
                    {/*        <select id="driver" name="driver" autoComplete="country-name"*/}
                    {/*                value={formData.driver} onChange={handleChange}*/}
                    {/*                className=" block bg-transparent w-full  border-0 px-3.5 py-3 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">*/}
                    {/*            {drivers.map((driver, index) => (*/}
                    {/*                <option key={index}>{driver}</option>*/}
                    {/*            ))}*/}
                    {/*        </select>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="mt-10 w-full flex justify-end">
                    <a>
                        <button type="submit"
                                className="block  bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-40">{isUpdating ? 'Update' : 'Save'}
                        </button>
                    </a>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;