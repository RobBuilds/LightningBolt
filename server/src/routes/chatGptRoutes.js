const express = require('express');
const router = express.Router();
const chatGptController = require('../controllers/chatGptController');

router.post('/analyze', chatGptController.analyzeContent);

module.exports = router;
