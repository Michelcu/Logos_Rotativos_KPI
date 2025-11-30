const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const requireAuth = require('../middleware/auth');
const CreativeController = require('../controllers/CreativeController');
const config = require('../config');

// Configuración de Multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: config.upload.maxSize },
  fileFilter: (req, file, cb) => {
    if (config.upload.allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'));
    }
  }
});

router.get('/', requireAuth, CreativeController.list);
router.post('/', requireAuth, upload.single('file'), CreativeController.create);
router.put('/:id', requireAuth, upload.single('file'), CreativeController.update);
router.delete('/:id', requireAuth, CreativeController.delete);

module.exports = router;
