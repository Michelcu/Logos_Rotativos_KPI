const Creator = require('../models/Creator');
const Creative = require('../models/Creative');

class DashboardController {
  static async index(req, res) {
    try {
      const creators = await Creator.findAll();
      const creatives = await Creative.findAll();
      
      res.render('dashboard', {
        user: { email: req.session.userEmail },
        creators,
        creatives
      });
    } catch (error) {
      console.error('Error al cargar dashboard:', error);
      res.status(500).send('Error al cargar el dashboard');
    }
  }
}

module.exports = DashboardController;
