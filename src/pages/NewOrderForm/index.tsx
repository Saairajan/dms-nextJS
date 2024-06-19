import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import MapComponent from "@/components/Maps";

const OrderForm: React.FC = () => {

    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const id = router.query.id;
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
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        pickUpAddress: '',
        pickUpTime: '',
        deliveryAddress: '',
        deliveryTime: '',
        distance: 0,
        items: [{
            itemName: '',
            itemType: 'Durable',
            weight: '',
            volume: '',
            total: ''
        }],
        orderStatus: 'pending',
        driver: '',
        overallCharge: 0,
        overallWeight: 0,
        overallVolume: 0,
        PaymentStatus: 'pending'
    });


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {

            const method = isUpdating ? 'PUT' : 'POST';
            const url = isUpdating ? `http://localhost:5025/Order/${id}` : 'http://localhost:5025/orders';
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
                    firstName: '',
                    lastName: '',
                    phoneNo: '',
                    email: '',
                    pickUpAddress: '',
                    pickUpTime: '',
                    deliveryAddress: '',
                    deliveryTime: '',
                    distance: 0,
                    items: [
                        {
                            itemName: '',
                            itemType: '',
                            weight: '',
                            volume: '',
                            total: ''
                        }
                    ],
                    orderStatus: '',
                    driver: '',
                    overallCharge: 0,
                    overallWeight: 0,
                    overallVolume: 0,
                    PaymentStatus: 'pending'
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
        if (router.query.id && typeof router.query.id === 'string') {
            const id = router.query.id;
            console.log('update ID: ' + typeof id);
            fetch(`http://localhost:5025/Order/${id}`)
                .then(response => response.json())
                .then(data => {
                    setFormData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        phoneNo: data.phoneNo,
                        email: data.email,
                        pickUpAddress: data.pickUpAddress,
                        pickUpTime: data.pickUpTime,
                        deliveryAddress: data.deliveryAddress,
                        deliveryTime: data.deliveryTime,
                        distance: data.distance,
                        items: data.items.map((item: any) => ({
                            itemName: item.itemName,
                            itemType: item.itemType,
                            weight: item.weight,
                            volume: item.volume,
                            total: item.total
                        })),
                        orderStatus: data.orderStatus,
                        driver: data.driver,
                        overallCharge: data.overallCharge,
                        overallWeight: data.overallWeight,
                        overallVolume: data.overallVolume,
                        PaymentStatus: data.paymentStatus
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
        const {name, value} = e.target;

        if (name.startsWith('items')) {
            const index = parseInt(name.split('.')[1]); // Get the index of the item
            const updatedItems = [...formData.items];
            updatedItems[index] = {
                ...updatedItems[index],
                [name.split('.')[2]]: value // Update the specific item field
            };

            const weight = updatedItems[index].weight || '0';
            const volume = updatedItems[index].volume || '0';
            const distance = parseFloat(String(formData.distance)) || 0;
            const isBreakable = updatedItems[index].itemType === 'Breakable';
            const total = calculateCost(weight, volume, distance, isBreakable).toFixed(2);
            updatedItems[index].total = total;
            const overallCharge: string = updatedItems.reduce((sum, item) => sum + parseFloat(item.total || '0'), 0).toFixed(2);
            const overallWeight = updatedItems.reduce((sum, item) => sum + parseFloat(item.weight || '0'), 0).toFixed(2);
            const overallVolume = updatedItems.reduce((sum, item) => sum + parseFloat(item.volume || '0'), 0).toFixed(2);
            setFormData(prevFormData => ({
                ...prevFormData,
                items: updatedItems,
                overallCharge: parseFloat(overallCharge.toString()),
                overallWeight: parseFloat(overallWeight.toString()),
                overallVolume: parseFloat(overallVolume.toString()),
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
                    itemName: '',
                    itemType: '',
                    weight: '',
                    volume: '',
                    total: ''
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
            updatedFormData.pickUpAddress = `Latitude: ${markers[0].lat}, Longitude: ${markers[0].lng}`;
        } else if (markers.length === 2) {
            // Update deliveryAddress if there are two markers
            updatedFormData.deliveryAddress = `Latitude: ${markers[1].lat}, Longitude: ${markers[1].lng}`;
        }
        // Update distance in formData
        updatedFormData.distance = distance !== null ? distance.toFixed(2) : '';
        // Set the updated formData in state
        setFormData(updatedFormData);
    };

    const calculateCost = (weight: string, volume: string, distance: number, isBreakable: boolean): number => {
        // Example calculation logic, adjust based on your pricing strategy
        const baseRatePerKm = 2; // Example base rate per kilometer
        const weightCoefficient = 0.5; // Example coefficient for weight
        const volumeCoefficient = 0.001; // Example coefficient for volume in cm^3
        const breakableCoefficient = breakable ? 1.5 : 1;

        const cost = (distance * baseRatePerKm
            + parseFloat(weight) * weightCoefficient
            + parseFloat(volume) * volumeCoefficient) * breakableCoefficient;


        return cost;
    };


    const [showForm, setShowForm] = useState(true);

    return (

        <div className="isolate bg-white px-6 py-5 sm:py-5 lg:px-8 md:w-full rounded-lg mx-3 ">
            <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-8  sm:mt-8  md:w-full">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">Recipient
                            First
                            Name</label>
                        <div className="mt-2.5">
                            <input type="text" name="firstName" id="firstName" autoComplete="given-name"
                                   value={formData.firstName} onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900">Recipient
                            Last
                            Name</label>
                        <div className="mt-2.5">
                            <input type="text" name="lastName" id="lastName" autoComplete="family-name"
                                   value={formData.lastName} onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">Recipient
                            Phone
                            No</label>
                        <div className="mt-2.5">
                            <input type="text" name="phoneNo" id="phoneNo" autoComplete="given-name"
                                   value={formData.phoneNo} onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name"
                               className="block text-sm font-semibold leading-6 text-gray-900">Recipient Email</label>
                        <div className="mt-2.5">
                            <input type="text" name="email" id="email" autoComplete="family-name"
                                   value={formData.email} onChange={handleChange}
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
                                <input type="text" name="pickUpAddress" id="pickUpAddress"
                                       autoComplete="given-name"
                                       value={formData.pickUpAddress} onChange={handleChange}
                                       className="block w-full pl-6 border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            <div className="mt-2.5 relative">
                                <input type="datetime-local" name="pickUpTime" id="pickUpTime"
                                       value={formData.pickUpTime} onChange={handleChange}
                                       className="c block  border-0 px-3.5 pl-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>

                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="mt-2.5 w-full">
                                <input type="text" name="deliveryAddress"
                                       id="deliveryAddress" autoComplete="given-name"
                                       value={formData.deliveryAddress}
                                       onChange={handleChange}
                                       className="block w-full pl-6 border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            <div className="mt-2.5 relative">
                                <input type="datetime-local" name="deliveryTime"
                                       id="deliveryTime"
                                       value={formData.deliveryTime}
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
                                <input type="text" name="distance" id="distance"
                                       value={formData.distance} onChange={handleChange}
                                       className="w-[150px] block  border-0 px-3.5 pl-6 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                <p className="absolute top-2 left-2 text-gray-400"><i className="fas fa-walking"></i>
                                </p>
                            </div>
                            <div className="mt-2.5 relative">
                                <input type="text" name="volume" id="volume"
                                       value={formData.overallVolume} onChange={handleChange}
                                       className="w-[150px] block  border-0 px-3.5 pl-7 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                <p className="absolute top-2 left-2 text-gray-400"><i className="fas fa-box"></i></p>
                            </div>
                            <div className="mt-2.5 relative">
                                <input type="text" name="weight" id="volume"
                                       value={formData.overallWeight} onChange={handleChange}
                                       className="w-[150px] block  border-0 px-3.5 pl-7 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                <p className="absolute top-2 left-2 text-gray-400"><i
                                    className="fas fa-weight-hanging"></i>
                                </p>
                            </div>
                            <div className="mt-2.5 relative">
                                <input type="text" name="Overall" id="total"
                                       value={formData.overallCharge}
                                       onChange={handleChange}
                                       className="w-[150px] block  border-0 px-3.5 pl-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                <p className="absolute top-2 left-2 text-gray-400">$</p>
                            </div>
                        </div>
                        {formData.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="mt-2.5 w-full">
                                    <input type="text" name={`items.${index}.itemName`} id="itemName"
                                           autoComplete="given-name"
                                           value={item.itemName} onChange={handleChange}
                                           className="block w-full pl-6 border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                                <div className="mt-2.5 relative">
                                    <select id="itemType" name={`items.${index}.itemType`} autoComplete="driver"
                                            value={item.itemType} onChange={handleChange}
                                            className=" block bg-transparent pl-6 border-0 pl-5 px-3.5 py-3 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                        {breakable.map((condition, index) => (
                                            <option key={index}>{condition}</option>
                                        ))}
                                    </select>
                                    <p className="absolute top-2 left-2 text-gray-400"><i
                                        className="fas fa-exclamation-triangle text-sm"></i></p>
                                </div>
                                <div className="mt-2.5 relative">
                                    <input type="text" name={`items.${index}.weight`} id="weight"
                                           value={item.weight} onChange={handleChange}
                                           className="w-[150px] block  border-0 px-3.5 pl-7 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    <p className="absolute top-2 left-2 text-gray-400"><i
                                        className="fas fa-weight-hanging"></i>
                                    </p>
                                </div>
                                <div className="mt-2.5 relative">
                                    <input type="text" name={`items.${index}.volume`} id="volume"
                                           value={item.volume} onChange={handleChange}
                                           className="w-[150px] block  border-0 px-3.5 pl-7 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    <p className="absolute top-2 left-2 text-gray-400"><i className="fas fa-box"></i>
                                    </p>
                                </div>
                                <div className="mt-2.5 relative">
                                    <input type="text" name={`items.${index}.total`} id="total"
                                           value={item.total}
                                           onChange={handleChange}
                                           className="w-[150px] block  border-0 px-3.5 pl-5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    <p className="absolute top-2 left-2 text-gray-400">$</p>
                                </div>
                                {index === formData.items.length - 1 && (
                                    <div className="mt-2.5 relative">
                                        <button className=" text-gray-400" onClick={handleAddItem}><i
                                            className="fas fa-plus custom-plus-icon"></i>
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
                            <select id="orderStatus" name="orderStatus" autoComplete="country-name"
                                    value={formData.orderStatus} onChange={handleChange}
                                    className=" block bg-transparent w-full  border-0 px-3.5 py-3 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {status.map((item, index) => (
                                    <option key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="orderstatus"
                               className="block text-sm font-semibold leading-6 text-gray-900">Driver</label>
                        <div className="mt-2.5">
                            <select id="driver" name="driver" autoComplete="country-name"
                                    value={formData.driver} onChange={handleChange}
                                    className=" block bg-transparent w-full  border-0 px-3.5 py-3 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {drivers.map((driver, index) => (
                                    <option key={index}>{driver}</option>
                                ))}
                            </select>
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

export default OrderForm;