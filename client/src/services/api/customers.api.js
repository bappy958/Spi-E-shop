import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/customers` : 'http://localhost:5000/api/customers';

export const fetchCustomers = async (params = {}) => {
    try {
        const response = await axios.get(API_URL, { params });
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
