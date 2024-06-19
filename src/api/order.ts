import fetch from 'node-fetch';

export default async function handler(req: any, res:any) {
    try {
        const response = await fetch('http://localhost:5025/Order'); // Replace with your actual backend URL
        const data = await response.json();
        console.log('Received data:', data);
        res.status(200).json(data);
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
}