import * as mockOrders from './mocks/orders.mock';
// import * as apiOrders from './api/orders.api'; // TODO: Enable when API is ready

import * as mockProducts from './mocks/products.mock';
// import * as apiProducts from './api/products.api'; // TODO: Enable when API is ready

import * as mockCustomers from './mocks/customers.mock';
// import * as apiCustomers from './api/customers.api'; // TODO: Enable when API is ready

// Toggle this to switch between Mock and Real API
const USE_MOCK = false;

// Helper to switch
const getService = (mockService, apiService) => {
    return USE_MOCK ? mockService : apiService;
};

// Export unified services
// Note: We are currently ONLY using mocks because the API placeholders are just placeholders.
// Once API is implemented, we would import them and pass them to getService.
// For now, to prevent unused import errors if we imported them above, I'm just using the mocks directly if USE_MOCK is true, 
// but logically this is where the switch happens.

// To properly support the switch when ready:
/*
import * as apiOrders from './api/orders.api';
export const orderService = USE_MOCK ? mockOrders : apiOrders;
*/

// Current implementation (Mock-focused but ready for API import)
import * as apiOrders from './api/orders.api';
import * as apiProducts from './api/products.api';
import * as apiCustomers from './api/customers.api';
import * as apiChat from './api/chat.api';

export const orderService = USE_MOCK ? mockOrders : apiOrders;
export const productService = USE_MOCK ? mockProducts : apiProducts;
export const customerService = USE_MOCK ? mockCustomers : apiCustomers;
export const chatService = apiChat; // Chat always uses API (or we could mock it too if needed, but skipping for now)
