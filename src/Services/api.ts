import axios from "axios";


// const API_BASE_URL = 'http://localhost:5025/api';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5025/api';

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
