import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import MapComponent from "@/components/Maps";

const DriverForm: React.FC = () => {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const id = router.query.id;
    const status = [
        "Available",
        "Unavailable",
    ];

    const vechType = [
        "Car",
        "Truck",
        "Bike",
        "Cycle",
    ];

    const breakable = [
        "Breakable",
        "Durable",

    ];


    const drivers = [
        "Alice Johnson",
        "Bob Smith",
        "Charlie Brown",
        "Dana White",
        "Eva Martinez",
        "Frank Johnson",
        "Gina Lee",
        "Harry Davis",
        "Ivy Thompson",
        "Jack Wilson"
    ];

    type Item = {
        itemName: string;
        itemType: string;
        weight: string;
        volume: string;
        total: string;
    };


    const [formData, setFormData] = useState({
        name: '',
        Phone: '',
        email: '',
        VehicleType: '',
        LicenseNumber   : '',
        shiftStartTime: '',
        shiftEndTime: '',
        CurrentLocation: '',
        availability: false

    });


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {

            const method = isUpdating ? 'PUT' : 'POST';
            const url = isUpdating ? `http://localhost:5025/drivers/${id}` : 'http://localhost:5025/drivers';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log(`Order ${isUpdating ? 'updated' : 'created'} successfully!`);
                // Optionally: Reset the form after successful submission
                setFormData({
                    name: '',
                    Phone: '',
                    email: '',
                    VehicleType: '',
                    LicenseNumber: '',
                    shiftStartTime: '',
                    shiftEndTime: '',
                    CurrentLocation: '',
                    availability: false
                });
                setShowForm(false);
            } else {
                console.error(`Failed to ${isUpdating ? 'update' : 'create'} order:`, await response.text());
                // Handle error scenario: show error message to user
            }
        } catch (error) {
            console.error('Error ${isUpdating ? "updating": "creating"} order:', error);
            // Handle error scenario: show error message to user
        }
    };

    useEffect(() => {
        if (router.query.id && typeof router.query.id === 'string') {
            const id = router.query.id;
            console.log('update ID: ' + typeof id);
            fetch(`http://localhost:5025/drivers/${id}`)
                .then(response => response.json())
                .then(data => {
                    setFormData({
                        name: data.name,
                        Phone: data.Phone,
                        email: data.email,
                        VehicleType: data.VehicleType,
                        LicenseNumber: data.LicenseNumber,
                        shiftStartTime: data.shiftStartTime,
                        shiftEndTime: data.shiftEndTime,
                        CurrentLocation: data.CurrentLocation,
                        availability: data.availability,
                    });
                    setIsUpdating(true);
                })
                .catch(error => {
                    console.error('Error fetching order:', error);
                });
        } else {
            console.error('Failed to fetch data');
        }
    }, [router.query.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index?: number) => {
        const { name, value } = e.target;
        if (name === "availability") {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value === "Available" ? true : false, // Convert to boolean based on selection
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };


    const [showForm, setShowForm] = useState(true);

    return (

        <div className="isolate bg-white px-6 py-5 sm:py-5 lg:px-8 md:w-full rounded-lg mx-3 ">
            <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-8  sm:mt-8  md:w-full">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">
                            Full
                            Name</label>
                        <div className="mt-2.5">
                            <input type="text" name="name" id="firstName" autoComplete="given-name"
                                   value={formData.name} onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                            Phone No</label>
                        <div className="mt-2.5">
                            <input type="text" name="Phone" id="phoneNo" autoComplete="given-name"
                                   value={formData.Phone} onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="last-name"
                               className="block text-sm font-semibold leading-6 text-gray-900"> Email</label>
                        <div className="mt-2.5">
                            <input type="text" name="email" id="email" autoComplete="family-name"
                                   value={formData.email} onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">Vehicle
                            Licence</label>
                        <div className="mt-2.5">
                            <input type="text" name="LicenseNumber" id="phoneNo" autoComplete="given-name"
                                   value={formData.LicenseNumber} onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="orderstatus" className="block text-sm font-semibold leading-6 text-gray-900">Vehicle
                            Type</label>
                        <div className="mt-2.5">
                            <select id="VehicleType" name="VehicleType" autoComplete="country-name"
                                    value={formData.VehicleType} onChange={handleChange}
                                    className=" block bg-transparent w-full  border-0 px-3.5 py-3 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {vechType.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message"
                               className="block text-sm font-semibold leading-6 text-gray-900">Address</label>
                        <div className="mt-2.5">
                            <textarea name="CurrentLocation" id="Address"
                                      value={formData.CurrentLocation} onChange={handleChange}
                                      className="block w-full border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="orderstatus" className="block text-sm font-semibold leading-6 text-gray-900">
                            Status</label>
                        <div className="mt-2.5">
                            <select id="orderStatus" name="availability" autoComplete="country-name"
                                    value={formData.availability ? "Available" : "Unavailable"} onChange={handleChange}
                                    className=" block bg-transparent w-full  border-0 px-3.5 py-3 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {status.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-2 grid grid-cols-2 gap-2">
                        <div className="">
                            <label htmlFor="orderstatus"
                                   className="block text-sm font-semibold leading-6 text-gray-900">Shift Start
                                Time</label>
                            <div className="mt-2.5 bg-green-400 w-full">
                                <input type="datetime-local" name="shiftStartTime"
                                       id="deliveryTime"
                                       value={formData.shiftStartTime}
                                       onChange={handleChange}
                                       className="block w-full  border-0 px-3.5 pl-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="orderstatus"
                                   className="block text-sm font-semibold leading-6 text-gray-900">Shift End
                                Time</label>
                            <div className="mt-2.5 relative">
                                <input type="datetime-local" name="shiftEndTime"
                                       id="deliveryTime"
                                       value={formData.shiftEndTime}
                                       onChange={handleChange}
                                       className="w-full block  border-0 px-3.5 pl-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                    </div>
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

export default DriverForm;