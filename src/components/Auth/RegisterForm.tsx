"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";
import {fetchRoles, registerUser, Role} from "@/Services/api";
import {useRouter, useSearchParams} from "next/navigation";


const RegisterForm: React.FC = () => {
    const router = useRouter();
    const [isUpdating, setIsUpdating] = useState(false);
    const searchParams = useSearchParams();
    const id = searchParams?.get('id');
    const [showForm, setShowForm] = useState(true);
    const [rePassword, setRePassword] = useState('');
    const [roles, setRoles] = useState<Role[]>([]);

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Address: '',
        Email: '',
        PhoneNumber: '',
        Country   : '',
        PostalCode: '',
        Province: '',
        City: '',
        Password: '',
        roleId: 0,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Registration Handle Submit method triggered');
        if (formData.Password !== rePassword) {
            console.error('Passwords do not match');
            // Optionally: show error message to user
            return;
        }

        console.log('Form Data:', formData);
        try {

            const response = await registerUser(formData);

            if (response.data) {
                console.log(`User ${isUpdating ? 'updated' : 'Registered'} successfully!`);
                // Optionally: Reset the form after successful submission
                setFormData({
                    FirstName: '',
                    LastName: '',
                    Address: '',
                    Email: '',
                    PhoneNumber: '',
                    Country   : '',
                    PostalCode: '',
                    Province: '',
                    City: '',
                    Password: '',
                    roleId: 0,
                });
                setShowForm(false);
            } else {
                console.error(`Failed to ${isUpdating ? 'update' : 'create'} user:`, await response.data);
                // Handle error scenario: show error message to user
            }
        } catch (error) {
            console.error('Error ${isUpdating ? \'updating\' : \'Registering\'} user:', error);
            // Handle error scenario: show error message to user
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        console.log(`Selected ${name}: ${value}`);
        const newValue = name === 'roleId' ? parseInt(value, 10) : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleRePasswordChange = (e: any) => {
        setRePassword(e.target.value);
    };

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const fetchedRoles = await fetchRoles();
                setRoles(fetchedRoles);
            } catch (error) {
                console.error('Failed to fetch roles');
            }
        };
        loadRoles();
    }, []);

    return (
        <div className="isolate bg-gray-100 shadow-md px-6 py-5 sm:py-5 lg:px-8 md:w-full rounded-lg overflow-hidden mx-auto">
            <div className="mx-auto text-left">
                <h2 className="text-lg tracking-tight text-gray-900 sm:text-4xl">Registration Form</h2>
            </div>
            <form action="#" onSubmit={handleSubmit} method="POST" className="mt-4 w-full ">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                    <div>
                        <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">First
                            name</label>
                        <div className="mt-2.5">
                            <input type="text" name="FirstName" id="FirstName" autoComplete="given-name"
                                   onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Last
                            name</label>
                        <div className="mt-2.5">
                            <input type="text" name="LastName" id="LastName" autoComplete="family-name"
                                   onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="first-name"
                               className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                        <div className="mt-2.5">
                            <input type="text" name="Email" id="Email" autoComplete="given-name" onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Phone
                            Number</label>
                        <div className="relative mt-2.5">
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <label htmlFor="country" className="sr-only">Country</label>
                                <select id="country" name="PhoneNumber"
                                        className="h-full  border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                    <option>US</option>
                                    <option>CA</option>
                                    <option>EU</option>
                                </select>
                                {/*<svg className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"*/}
                                {/*     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">*/}
                                {/*    <path fill-rule="evenodd"*/}
                                {/*          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"*/}
                                {/*          clip-rule="evenodd"/>*/}
                                {/*</svg>*/}
                            </div>
                            <input type="text" name="PhoneNumber" id="PhoneNumber" autoComplete="tel"
                                   onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>


                    <div className="sm:col-span-2">
                        <label htmlFor="message"
                               className="block text-sm font-semibold leading-6 text-gray-900">Address</label>
                        <div className="mt-2.5">
                            <textarea name="Address" id="message" onChange={handleChange}
                                      className="block w-full h-[40px] border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="company"
                               className="block text-sm font-semibold leading-6 text-gray-900">Country Session</label>
                        <div className="mt-2.5">
                            <label htmlFor="company"
                                   className="block text-sm leading-6 text-gray-900">Country</label>
                            <input type="text" name="Country" id="Country" autoComplete="organization"
                                   onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                        <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-3">
                            <div>
                                <label htmlFor="company"
                                       className="block text-sm leading-6 text-gray-900">Province</label>
                                <div className="mt-2.5">
                                    <input type="text" name="Province" id="Province" autoComplete="organization"
                                           onChange={handleChange}
                                           className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="company"
                                       className="block text-sm leading-6 text-gray-900">City</label>
                                <div className="mt-2.5">
                                    <input type="text" name="City" id="City" autoComplete="organization"
                                           onChange={handleChange}
                                           className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="company"
                                       className="block text-sm leading-6 text-gray-900">Postal</label>
                                <div className="mt-2.5">
                                    <input type="text" name="PostalCode" id="PostalCode" autoComplete="organization"
                                           onChange={handleChange}
                                           className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <div>
                            <label htmlFor="company"
                                   className="block text-sm font-semibold leading-6 text-gray-900">Roles</label>
                            <select id="roleId"
                                    name="roleId"
                                    onChange={handleChange}
                                    value={formData.roleId}
                                    className="block w-full bg-white  border-0 px-3.5 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                {roles.map((role: any) => (
                                    <option key={role.roleId} value={role.roleId} className="p-4">
                                        {role.roleName}
                                    </option>
                                ))};
                            </select>
                        </div>
                    </div>
                    {formData.roleId === 3 && (
                        <div className="sm:col-span-2">
                            <label htmlFor="company"
                                   className="block text-sm font-semibold leading-6 text-gray-900">Driver
                                Session</label>
                            <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-3">
                                <div className="mt-2.5">
                                    <label htmlFor="company"
                                           className="block text-sm leading-6 text-gray-900">license Number</label>
                                    <input type="text" name="licenseNumber" id="licenseNumber"
                                           autoComplete="organization"
                                           onChange={handleChange}
                                           className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                </div>
                                <div>
                                    <label htmlFor="company"
                                           className="block text-sm leading-6 text-gray-900">License Expirations Date</label>
                                    <div className="mt-2.5">
                                        <input type="datetime-local" name="licenseExpirationDate" id="licenseExpirationDate"
                                               autoComplete="organization"
                                               onChange={handleChange}
                                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="company"
                                           className="block text-sm leading-6 text-gray-900">Years of Experience</label>
                                    <div className="mt-2.5">
                                        <input type="text" name="yearsOfExperience" id="yearsOfExperience"
                                               autoComplete="organization"
                                               onChange={handleChange}
                                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="company"
                                           className="block text-sm leading-6 text-gray-900">Date of Hire</label>
                                    <div className="mt-2.5">
                                        <input type="datetime-local" name="dateOfHire" id="dateOfHire" autoComplete="organization"
                                               onChange={handleChange}
                                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="company"
                                           className="block text-sm leading-6 text-gray-900">Emergency Contact</label>
                                    <div className="mt-2.5">
                                        <input type="text" name="emergencyContact" id="emergencyContact"
                                               autoComplete="organization"
                                               onChange={handleChange}
                                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="company"
                                           className="block text-sm leading-6 text-gray-900">Shift Starting time</label>
                                    <div className="mt-2.5">
                                        <input type="datetime-local" name="shiftStartTime" id="shiftStartTime"
                                               autoComplete="organization"
                                               onChange={handleChange}
                                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="company"
                                           className="block text-sm leading-6 text-gray-900">Shift Ending Time</label>
                                    <div className="mt-2.5">
                                        <input type="datetime-local" name="shiftEndTime" id="shiftEndTime"
                                               autoComplete="organization"
                                               onChange={handleChange}
                                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="company"
                                           className="block text-sm leading-6 text-gray-900">Availability</label>
                                    <div className="mt-2.5">
                                        <input type="text" name="availabilityStatus" id="availabilityStatus"
                                               autoComplete="organization"
                                               onChange={handleChange}
                                               className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                    <div className="sm:col-span-2">
                        <label htmlFor="email"
                               className="block text-sm font-semibold leading-6 text-gray-900">Password Session</label>
                        <div className="mt-2.5">
                            <label htmlFor="email"
                                   className="block text-sm leading-6 text-gray-900">Password</label>
                            <input type="password" name="Password" id="Password" autoComplete="Password"
                                   onChange={handleChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="email"
                               className="block text-sm leading-6 text-gray-900">Re-Enter Password</label>
                        <div className="mt-2.5">
                            <input type="password" name="Re-Password" id="Re-Password" autoComplete="email"
                                   onChange={handleRePasswordChange}
                                   className="block w-full  border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div className="flex gap-x-4 sm:col-span-2">
                        <div className="flex h-6 items-center">
                            <button type="button"
                                    className="flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    role="switch" aria-checked="false" aria-labelledby="switch-1-label">
                                <span className="sr-only">Agree to policies</span>
                                <span aria-hidden="true"
                                      className="h-4 w-4 translate-x-0 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"></span>
                            </button>
                        </div>
                        <label className="text-sm leading-6 text-gray-600" id="switch-1-label">
                            By selecting this, you agree to our
                            <a href="#" className="font-semibold text-indigo-600">privacy&nbsp;policy</a>.
                        </label>
                    </div>
                </div>
                <div className="mt-10 w-full flex justify-end">
                    <button type="submit"
                            className="block  bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
