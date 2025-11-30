const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const CreatorController = require('../controllers/CreatorController');

router.get('/', requireAuth, CreatorController.list);
router.post('/', requireAuth, CreatorController.create);
router.put('/:id', requireAuth, CreatorController.update);
router.delete('/:id', requireAuth, CreatorController.delete);

module.exports = router;
