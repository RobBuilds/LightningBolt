const spiderFootService = require('../services/spiderFootService');
const db = require('../services/databaseService');

const spiderFootController = {
    async analyzeDomain(req, res) {
        try {
            const { domain } = req.params;
            const result = await spiderFootService.analyzeDomain(domain);
            res.json(result);
        } catch (error) {
            res.status(500).send({ message: "Error processing your request", error: error.toString() });
        }
    },
};

module.exports = spiderFootController;
