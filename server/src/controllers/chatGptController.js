const chatGptService = require('../services/chatGptService');

const chatGptController = {
    async analyzeContent(req, res) {
        try {
            const { content } = req.body;
            const result = await chatGptService.analyzeContent(content);
            res.json(result);
        } catch (error) {
            res.status(500).send({ message: "Error processing your request", error: error.toString() });
        }
    },
};

module.exports = chatGptController;
