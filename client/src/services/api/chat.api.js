import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/chat` : 'http://localhost:5000/api/chat';

export const sendMessage = async (message) => {
    try {
        const response = await axios.post(API_URL, { message });
        return response.data; // Expected { reply: "..." }
    } catch (error) {
        console.error('Chat API Error:', error);
        throw error;
    }
};
