const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Department and category mapping
const DEPARTMENT_INFO = {
  departments: [
    {
      code: 'CST',
      fullName: 'Computer Science & Technology',
      aliases: ['CST', 'Computer Science', 'Computer Technology', 'CS', 'Computer'],
      subCategories: ['Computer Components', 'Hardware', 'Software', 'Sensors'],
      keywords: ['laptop', 'computer', 'microcontroller', 'arduino', 'raspberry pi', 'sensor', 'software', 'hardware', 'processor', 'ram', 'memory']
    },
    {
      code: 'Civil',
      fullName: 'Civil Technology',
      aliases: ['Civil', 'Civil Engineering', 'Civil Tech'],
      subCategories: ['Surveying Tools', 'Drafting Gear', 'Materials'],
      keywords: ['cement', 'surveying', 'theodolite', 'drafting', 'construction', 'materials', 'steel', 'concrete', 'ruler', 'measurement']
    },
    {
      code: 'Electronics',
      fullName: 'Electronics Technology',
      aliases: ['Electronics', 'Electronics Engineering', 'ENT', 'Electronics & Telecommunication'],
      subCategories: ['Components', 'Devices', 'Testing Equipment'],
      keywords: ['multimeter', 'oscilloscope', 'circuit', 'electronic', 'component', 'device', 'testing', 'equipment']
    },
    {
      code: 'RAC',
      fullName: 'Refrigeration and Air Conditioning',
      aliases: ['RAC', 'Refrigeration', 'Air Conditioning', 'HVAC'],
      subCategories: ['HVAC Systems', 'RAC Components', 'Tools'],
      keywords: ['refrigeration', 'air conditioning', 'hvac', 'compressor', 'cooling', 'climate control']
    }
  ]
};

/**
 * Extract department from user query
 */
const extractDepartment = (query) => {
  const lowerQuery = query.toLowerCase();
  
  for (const dept of DEPARTMENT_INFO.departments) {
    // Check aliases
    for (const alias of dept.aliases) {
      if (lowerQuery.includes(alias.toLowerCase())) {
        return dept;
      }
    }
    
    // Check keywords
    for (const keyword of dept.keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        return dept;
      }
    }
  }
  
  return null;
};

/**
 * Generate AI prompt with department context
 */
const generatePrompt = (userQuery, detectedDepartment = null) => {
  const basePrompt = `You are an AI shopping assistant for Spi E-shop, an institute e-commerce platform. Your role is to help users find products from specific departments.

DEPARTMENT INFORMATION:
${DEPARTMENT_INFO.departments.map(dept => `
${dept.code} - ${dept.fullName}
  Sub-categories: ${dept.subCategories.join(', ')}
  Common keywords: ${dept.keywords.join(', ')}
`).join('\n')}

IMPORTANT RULES:
1. If the user mentions a department (by code, full name, or keywords), ONLY suggest products from that specific department.
2. Do NOT suggest products from other departments.
3. If department context is unclear, ask the user to clarify which department they're interested in.
4. Be concise and helpful.
5. Format your response as a JSON object with this structure:
{
  "department": "department code or null",
  "subCategory": "sub-category name or null",
  "suggestions": ["product suggestion 1", "product suggestion 2"],
  "message": "helpful message to the user"
}

User Query: "${userQuery}"
${detectedDepartment ? `\nDetected Department: ${detectedDepartment.code} - ${detectedDepartment.fullName}` : ''}

Provide a helpful response:`;

  return basePrompt;
};

/**
 * Get AI response from Gemini
 */
const getAIResponse = async (userQuery) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Extract department from query
    const detectedDepartment = extractDepartment(userQuery);
    
    // Generate prompt with context
    const prompt = generatePrompt(userQuery, detectedDepartment);
    
    // Get AI response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON response
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/```\s*([\s\S]*?)\s*```/);
      const jsonText = jsonMatch ? jsonMatch[1] : text;
      const parsed = JSON.parse(jsonText);
      
      return {
        success: true,
        department: parsed.department || detectedDepartment?.code || null,
        subCategory: parsed.subCategory || null,
        suggestions: parsed.suggestions || [],
        message: parsed.message || text,
        rawResponse: text
      };
    } catch (parseError) {
      // If JSON parsing fails, return the text response
      return {
        success: true,
        department: detectedDepartment?.code || null,
        subCategory: null,
        suggestions: [],
        message: text,
        rawResponse: text
      };
    }
  } catch (error) {
    console.error('Gemini AI Error:', error);
    return {
      success: false,
      error: error.message,
      department: null,
      subCategory: null,
      suggestions: [],
      message: 'I apologize, but I encountered an error. Please try again or contact support.'
    };
  }
};

/**
 * Search products based on AI analysis
 */
const searchProductsWithAI = async (userQuery, productModel) => {
  try {
    // Get AI response
    const aiResponse = await getAIResponse(userQuery);
    
    if (!aiResponse.success) {
      return {
        success: false,
        message: aiResponse.message,
        products: []
      };
    }
    
    // Build query based on AI analysis
    const query = { isActive: true };
    
    if (aiResponse.department) {
      const deptMap = {
        'CST': 'Computer Science & Technology',
        'Civil': 'Civil Technology',
        'Electronics': 'Electronics Technology',
        'RAC': 'Refrigeration and Air Conditioning'
      };
      query.department = deptMap[aiResponse.department] || aiResponse.department;
    }
    
    if (aiResponse.subCategory) {
      query.subCategory = aiResponse.subCategory;
    }
    
    // If no department detected, search by name/description
    if (!aiResponse.department) {
      query.$or = [
        { name: { $regex: userQuery, $options: 'i' } },
        { description: { $regex: userQuery, $options: 'i' } }
      ];
    }
    
    // Fetch products
    const products = await productModel.find(query).limit(10).lean();
    
    return {
      success: true,
      department: aiResponse.department,
      subCategory: aiResponse.subCategory,
      message: aiResponse.message,
      suggestions: aiResponse.suggestions,
      products: products
    };
  } catch (error) {
    console.error('AI Search Error:', error);
    return {
      success: false,
      message: 'Error processing your search. Please try again.',
      products: []
    };
  }
};

module.exports = {
  getAIResponse,
  searchProductsWithAI,
  extractDepartment,
  DEPARTMENT_INFO
};

