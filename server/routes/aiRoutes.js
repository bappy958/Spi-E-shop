const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { getAIResponse, searchProductsWithAI } = require('../services/aiService');

/**
 * POST /api/ai/search
 * AI-powered product search with department context understanding
 */
router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    // Search products with AI
    const result = await searchProductsWithAI(query.trim(), Product);
    
    res.json(result);
  } catch (error) {
    console.error('AI Search Route Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing AI search',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * POST /api/ai/chat
 * AI chatbot endpoint for conversational queries
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }
    
    // Get AI response
    const aiResponse = await getAIResponse(message.trim());
    
    res.json({
      success: aiResponse.success,
      message: aiResponse.message,
      department: aiResponse.department,
      subCategory: aiResponse.subCategory,
      suggestions: aiResponse.suggestions
    });
  } catch (error) {
    console.error('AI Chat Route Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing AI chat',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;

