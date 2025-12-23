const CUSTOMERS_DATA = [
    { id: 'CUST-001', name: 'Alice Johnson', email: 'alice@example.com', role: 'Student', status: 'active', joinDate: '2024-01-15', orders: 5 },
    { id: 'CUST-002', name: 'Bob Smith', email: 'bob@example.com', role: 'Faculty', status: 'active', joinDate: '2023-11-20', orders: 12 },
    { id: 'CUST-003', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Student', status: 'inactive', joinDate: '2024-02-10', orders: 0 },
    { id: 'CUST-004', name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active', joinDate: '2023-09-05', orders: 25 },
    { id: 'CUST-005', name: 'Evan Wright', email: 'evan@example.com', role: 'Student', status: 'suspended', joinDate: '2024-03-01', orders: 1 },
];

export const fetchCustomers = (params = {}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random error (5% chance) or manually toggle for testing
            if (false) { // Set to true to test error handling
                reject(new Error("Failed to fetch customers. Network error simulated."));
                return;
            }

            resolve({
                data: CUSTOMERS_DATA,
                meta: {
                    total: CUSTOMERS_DATA.length,
                    page: 1,
                    limit: 10
                }
            });
        }, 700);
    });
};
