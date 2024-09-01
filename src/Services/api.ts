import axios from "axios";


// const API_BASE_URL = 'http://localhost:5025/api';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api';
const API_CUSTOMER_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5280/api';
const API_URL = 'http://localhost:5001/api/Role';

// Function to handle user registration
export const registerUser = async (userData: {
    FirstName: string;
    LastName: string;
    Address: string;
    Email: string;
    PhoneNumber: string;
    Country: string;
    PostalCode: string;
    Province: string;
    City: string;
    Password: string;
    roleId: number,

}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Users`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.error('User Passed to API.TS successfully');
        return response.data;

    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const RegisterCustomer = async (customerData: {
    FullName: string;
    Address: string;
    Email: string;
    Phone: string;
    Password: string;
}) => {
    try {
        const response = await axios.post(`${API_CUSTOMER_URL}/Customer`, customerData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.error('Customer Passed to API.TS successfully');
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}


export const loginUser = async (loginData: { Email: string; Password: string }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Login/login`, loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const token = response.data.token;
        console.log("JWT Token:", token);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error; // Re-throw the error for handling in handleSubmit
    }
};

export const loginCustomer = async (loginData: {
    Email: string;
    Password: String;
}) => {
    try {
        const response = await axios.post(`${API_CUSTOMER_URL}/Login/login`, loginData, {
            headers: {
                'Content-Type' : 'application/json',
            }
        });

        const token = response.data.token;
        console.log("JWT customer Token: " + token);
        if(token){
            localStorage.setItem("AuthToken", token);
            console.log("JWT Token stored in local storage" + token);
        }
        return response.data;
    } catch (error){
        console.error('Error Logging in Customer: ' + error);
        throw error;
    }
};


export interface Role {
    roleId: number;
    roleName: string;
}


// Function to fetch roles from the API
export const fetchRoles = async (): Promise<Role[]> => {
    try {
        const response = await axios.get<Role[]>(API_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Fetched roles:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error; // Rethrow the error to handle it where the function is called
    }
};

