import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/orders` : 'http://localhost:5000/api/orders';

export const fetchOrders = async (params = {}) => {
    try {
        const response = await axios.get(API_URL, { params });
        // Start simulated delay if needed for UI testing, but here we just return
        return response.data; // Expected { data: [], meta: {} }
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
