const PRODUCTS_DATA = [
    { id: 'PROD-001', name: 'Lab Microscope X200', category: 'Equipment', price: 1250.00, stock: 15, status: 'in_stock' },
    { id: 'PROD-002', name: 'Safety Goggles', category: 'Safety', price: 25.00, stock: 150, status: 'in_stock' },
    { id: 'PROD-003', name: 'Arduino Starter Kit', category: 'Electronics', price: 85.00, stock: 45, status: 'in_stock' },
    { id: 'PROD-004', name: 'Chemical Beaker Set', category: 'Glassware', price: 45.00, stock: 8, status: 'low_stock' },
    { id: 'PROD-005', name: 'Soldering Iron Station', category: 'Electronics', price: 120.00, stock: 0, status: 'out_of_stock' },
    { id: 'PROD-006', name: 'Drafting Table', category: 'Furniture', price: 350.00, stock: 3, status: 'low_stock' },
];

export const fetchProducts = (params = {}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate random error for QA testing
            if (false) {
                reject(new Error("Failed to fetch products. Simulated network error."));
                return;
            }

            resolve({
                data: PRODUCTS_DATA,
                meta: {
                    total: PRODUCTS_DATA.length,
                    page: 1,
                    limit: 10
                }
            });
        }, 600);
    });
};
