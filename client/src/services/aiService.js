import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * AI-powered product search with department context understanding
 * @param {string} query - User search query (e.g., "Laptop for CST", "Cement for Civil")
 * @returns {Promise<Object>} Search results with products and AI suggestions
 */
export const aiSearch = async (query) => {
  try {
    const response = await api.post('/ai/search', { query });
    return response.data;
  } catch (error) {
    console.error('AI Search Error:', error);
    return {
      success: false,
      message: 'Error performing AI search. Please try again.',
      products: [],
      department: null,
      subCategory: null
    };
  }
};

/**
 * AI chatbot message
 * @param {string} message - User message
 * @param {Array} conversationHistory - Previous conversation messages
 * @returns {Promise<Object>} AI response
 */
export const aiChat = async (message, conversationHistory = []) => {
  try {
    const response = await api.post('/ai/chat', { message, conversationHistory });
    return response.data;
  } catch (error) {
    console.error('AI Chat Error:', error);
    return {
      success: false,
      message: 'Error processing your message. Please try again.',
      department: null,
      subCategory: null,
      suggestions: []
    };
  }
};

export default {
  aiSearch,
  aiChat
};

