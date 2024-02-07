const axios = require('axios');

const spiderFootService = {
    async analyzeDomain(domain) {
        try {
            // Placeholder: Adjust URL and parameters according to SpiderFoot's API documentation
            const response = await axios.get(`https://api.spiderfoot.net/?domain=${domain}&apiKey=${process.env.SPIDERFOOT_API_KEY}`);
            return response.data;
        } catch (error) {
            console.error('Error calling SpiderFoot API:', error);
            throw error;
        }
    },
};

module.exports = spiderFootService;
