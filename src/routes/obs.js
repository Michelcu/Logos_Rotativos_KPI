const express = require('express');
const router = express.Router();
const OBSController = require('../controllers/OBSController');

// Ruta pública para OBS (sin autenticación)
router.get('/:code', OBSController.display);

module.exports = router;
