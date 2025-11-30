const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const DashboardController = require('../controllers/DashboardController');

router.get('/', requireAuth, DashboardController.index);

module.exports = router;
