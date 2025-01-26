const axios = require('axios');

const notify = async () => {
    try {
        await axios.get('http://localhost:3000/api/notify');
    } catch (error) {
        console.error('Failed to notify:', error);
    }
};

notify();