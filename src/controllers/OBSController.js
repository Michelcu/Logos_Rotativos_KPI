const Creative = require('../models/Creative');

class OBSController {
  static async display(req, res) {
    try {
      const { code } = req.params;
      const creative = await Creative.findByCode(code);

      if (!creative) {
        return res.status(404).send('Creatividad no encontrada');
      }

      if (!creative.active) {
        return res.status(404).send('Creatividad no activa');
      }

      res.render('obs', { creative });
    } catch (error) {
      console.error('Error al mostrar creatividad OBS:', error);
      res.status(500).send('Error al cargar la creatividad');
    }
  }
}

module.exports = OBSController;
