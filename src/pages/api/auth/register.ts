import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    try {
        const response = await axios.post('http://localhost:5025/api/Users', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};
