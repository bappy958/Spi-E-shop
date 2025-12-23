const ORDERS_DATA = [
    { id: 'ORD-001', customer: 'John Doe', amount: 120.50, status: 'completed', date: '2024-03-15', items: 3 },
    { id: 'ORD-002', customer: 'Jane Smith', amount: 75.00, status: 'pending', date: '2024-03-16', items: 1 },
    { id: 'ORD-003', customer: 'Michael Brown', amount: 250.00, status: 'processing', date: '2024-03-16', items: 5 },
    { id: 'ORD-004', customer: 'Sarah Wilson', amount: 95.20, status: 'completed', date: '2024-03-14', items: 2 },
    { id: 'ORD-005', customer: 'David Lee', amount: 110.00, status: 'cancelled', date: '2024-03-13', items: 1 },
    { id: 'ORD-006', customer: 'Emily Davis', amount: 45.00, status: 'completed', date: '2024-03-12', items: 1 },
];

export const fetchOrders = (params = {}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random error for QA testing (toggle manually or use logic)
            if (false) {
                reject(new Error("Failed to fetch orders. Simulated network error."));
                return;
            }

            resolve({
                data: ORDERS_DATA,
                meta: {
                    total: ORDERS_DATA.length,
                    page: 1,
                    limit: 10
                }
            });
        }, 800);
    });
};
