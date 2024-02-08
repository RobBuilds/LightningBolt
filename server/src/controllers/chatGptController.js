const chatGptService = require('../services/chatGptService');

const chatGptController = {
    async analyzeContent(req, res) {
        try {
            const { content, useBrowser = false } = req.body; // Extract useBrowser flag from request body, defaulting to false
            const result = await chatGptService.analyzeContent(content, useBrowser); // Pass the useBrowser flag to the service method
            res.json(result);
        } catch (error) {
            res.status(500).send({ message: "Error processing your request", error: error.toString() });
        }
    },
};

module.exports = chatGptController;
