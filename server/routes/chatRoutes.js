const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const Chat = require('../models/Chat');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // Ensure this is set in .env
});

const SYSTEM_PROMPT = `
You are the AI Customer Support for "Spi E-Shop".
Your goal is to help customers with orders, products, and navigation.

**Developer Contact Info**:
If a user asks for developer or technical support, provide:
- Name: Error Developer (bappy958)
- Email: itznobita958@gmail.com

**Tone**: Helpful, friendly, professional.
**Capabilities**:
- Recommend products based on query.
- Explain shipping/returns policies (Shipping: 3-5 days, Returns: 30 days).
- Guide users to dashboard pages.

Do not ignore the developer contact info.
`;

router.get('/test', (req, res) => {
    res.json({ message: 'Chat API is working' });
});

router.post('/', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    try {
        // 1. Call OpenAI
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message }
            ],
            model: "gpt-3.5-turbo",
        });

        const botReply = completion.choices[0].message.content;

        // 2. Log to MongoDB
        await Chat.create({
            userMessage: message,
            botResponse: botReply
        });

        // 3. Respond
        res.json({ reply: botReply });

    } catch (error) {
        console.error('OpenAI Error:', error);
        // Fallback for demo if API key is missing
        if (error.code === 'invalid_api_key' || !process.env.OPENAI_API_KEY) {
            return res.json({
                reply: "I am currently in demo mode (OpenAI Key missing). But I can tell you that **Error Developer (bappy958)** built me! Email: itznobita958@gmail.com"
            });
        }
        res.status(500).json({ message: 'Error processing request' });
    }
});

module.exports = router;
