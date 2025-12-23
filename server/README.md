# Spi E-shop Backend Server

Express.js backend server with MongoDB and Redis caching for the Spi E-shop e-commerce platform.

## Features

- MongoDB database with Mongoose ODM
- Redis caching for improved performance
- RESTful API endpoints
- Department and sub-category filtering
- Product pagination support

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB and Redis connection strings:
```
MONGODB_URI=mongodb://localhost:27017/spi-eshop
REDIS_URL=redis://localhost:6379
PORT=5000
NODE_ENV=development
```

4. Make sure MongoDB and Redis are running:
   - MongoDB: `mongod` (or use MongoDB Atlas)
   - Redis: `redis-server` (optional - app works without Redis)

5. Seed the database with sample products:
```bash
node scripts/seedProducts.js
```

6. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## API Endpoints

### GET /api/products
Get products with optional filtering.

**Query Parameters:**
- `dept` - Filter by department code (CST, Civil, Electronics, RAC)
- `subCategory` - Filter by sub-category
- `category` - Alternative to dept (for backward compatibility)
- `limit` - Number of products per page (default: 100)
- `page` - Page number (default: 1)

**Examples:**
```
GET /api/products?dept=CST
GET /api/products?dept=CST&subCategory=Computer Components
GET /api/products?dept=Civil&subCategory=Surveying Tools&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "products": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### GET /api/products/:id
Get a single product by ID.

**Response:**
```json
{
  "success": true,
  "product": {...}
}
```

### GET /health
Health check endpoint.

## Product Model

The Product model includes:
- `name` - Product name
- `description` - Product description
- `price` - Current price
- `originalPrice` - Original price (for discounts)
- `image` - Product image URL
- `category` - Department code (CST, Civil, Electronics, RAC)
- `department` - Full department name
- `subCategory` - Sub-category name
- `rating` - Product rating (0-5)
- `reviews` - Number of reviews
- `stock` - Available stock
- `isActive` - Product active status

## Caching

Redis is used to cache department-wise product queries for 1 hour (3600 seconds). The cache key is based on the query parameters, so different filters will have separate cache entries.

If Redis is not available, the app will continue to work without caching.

## Department Codes

- `CST` - Computer Science & Technology
- `Civil` - Civil Technology
- `Electronics` - Electronics Technology
- `RAC` - Refrigeration and Air Conditioning

## AI Integration

The server includes Gemini AI integration for intelligent product search and chatbot functionality.

### Setup
1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env` file:
```
GEMINI_API_KEY=your-gemini-api-key-here
```

### AI Endpoints

#### POST /api/ai/search
AI-powered product search with department context understanding.

**Request:**
```json
{
  "query": "Laptop for CST"
}
```

**Response:**
```json
{
  "success": true,
  "department": "CST",
  "subCategory": "Computer Components",
  "message": "I found some great laptops in the Computer Science & Technology department...",
  "suggestions": ["Raspberry Pi 4", "Arduino Uno"],
  "products": [...]
}
```

#### POST /api/ai/chat
AI chatbot for conversational queries.

**Request:**
```json
{
  "message": "I need cement for construction",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "success": true,
  "message": "I can help you find cement in the Civil Technology department...",
  "department": "Civil",
  "subCategory": "Materials",
  "suggestions": ["Cement Bag (50kg)", "Steel Reinforcement Bars"]
}
```

### How It Works

The AI service:
1. Extracts department context from user queries (e.g., "CST", "Civil", keywords like "laptop", "cement")
2. Uses structured prompts with department and category information
3. Returns only relevant products from the detected department
4. Provides helpful suggestions and navigation options

## Sub-Categories

### CST
- Computer Components
- Hardware
- Software
- Sensors

### Civil
- Surveying Tools
- Drafting Gear
- Materials

### Electronics
- Components
- Devices
- Testing Equipment

### RAC
- HVAC Systems
- Components
- Tools

