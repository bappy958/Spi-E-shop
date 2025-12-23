const redis = require('redis');

let redisClient = null;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Redis Client Connected');
    });

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    console.error('Redis Connection Error:', error);
    // Return null if Redis is not available - app will work without caching
    return null;
  }
};

const getRedisClient = () => {
  return redisClient;
};

// Cache helper functions
const cacheMiddleware = async (req, res, next) => {
  const client = getRedisClient();
  if (!client) {
    return next(); // Skip caching if Redis is not available
  }

  try {
    // Create cache key from query parameters
    const cacheKey = `products:${JSON.stringify(req.query)}`;
    
    // Try to get from cache
    const cachedData = await client.get(cacheKey);
    
    if (cachedData) {
      console.log('Cache HIT:', cacheKey);
      return res.json(JSON.parse(cachedData));
    }
    
    // Store original json method
    const originalJson = res.json.bind(res);
    
    // Override json method to cache the response
    res.json = function (data) {
      // Cache for 1 hour (3600 seconds)
      client.setEx(cacheKey, 3600, JSON.stringify(data))
        .catch(err => console.error('Redis Set Error:', err));
      
      return originalJson(data);
    };
    
    next();
  } catch (error) {
    console.error('Cache Middleware Error:', error);
    next(); // Continue without caching on error
  }
};

module.exports = {
  connectRedis,
  getRedisClient,
  cacheMiddleware
};

