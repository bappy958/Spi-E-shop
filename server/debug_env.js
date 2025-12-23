const result = require('dotenv').config({ debug: true });
if (result.error) {
    throw result.error;
}
console.log('Dotenv parsed:', result.parsed);
console.log('Testing .env loading...');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Defined' : 'UNDEFINED');
if (process.env.MONGODB_URI) {
    console.log('Wait, let me try connecting...');
    const mongoose = require('mongoose');
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Backend connected to MongoDB Atlas ✅');
            process.exit(0);
        })
        .catch(err => {
            console.error('Connection Failed:', err.message);
            process.exit(1);
        });
} else {
    console.error('Environment variable not loaded.');
}
