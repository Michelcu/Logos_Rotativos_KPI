const Creator = require('../models/Creator');

class CreatorController {
  static async list(req, res) {
    try {
      const creators = await Creator.findAll();
      res.json(creators);
    } catch (error) {
      console.error('Error al listar creadores:', error);
      res.status(500).json({ error: 'Error al obtener creadores' });
    }
  }

  static async create(req, res) {
    try {
      const { name, twitch_username, notes } = req.body;
      
      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
      }

      const creator = await Creator.create({ name, twitch_username, notes });
      res.json(creator);
    } catch (error) {
      console.error('Error al crear creador:', error);
      res.status(500).json({ error: 'Error al crear creador' });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, twitch_username, notes, active } = req.body;

      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
      }

      const creator = await Creator.update(id, { 
        name, 
        twitch_username, 
        notes, 
        active: active !== undefined ? active : true 
      });

      if (!creator) {
        return res.status(404).json({ error: 'Creador no encontrado' });
      }

      res.json(creator);
    } catch (error) {
      console.error('Error al actualizar creador:', error);
      res.status(500).json({ error: 'Error al actualizar creador' });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await Creator.delete(id);
      res.json({ message: 'Creador eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar creador:', error);
      res.status(500).json({ error: 'Error al eliminar creador' });
    }
  }
}

module.exports = CreatorController;
