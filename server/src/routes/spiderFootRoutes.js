const express = require('express');
const router = express.Router();
const spiderFootController = require('../controllers/spiderFootController');

router.get('/analyze/:domain', spiderFootController.analyzeDomain);

module.exports = router;
