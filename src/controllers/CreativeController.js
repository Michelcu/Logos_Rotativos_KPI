const Creative = require('../models/Creative');
const Creator = require('../models/Creator');
const config = require('../config');
const path = require('path');
const fs = require('fs').promises;

class CreativeController {
  static async list(req, res) {
    try {
      const creatives = await Creative.findAll();
      
      // Añadir información de creadores asignados a cada creatividad
      const creativesWithCreators = await Promise.all(
        creatives.map(async (creative) => {
          const creators = await Creator.findByCreativeId(creative.id);
          return {
            ...creative,
            creators,
            obs_url: `${config.baseUrl}/obs/${creative.unique_code}`
          };
        })
      );
      
      res.json(creativesWithCreators);
    } catch (error) {
      console.error('Error al listar creatividades:', error);
      res.status(500).json({ error: 'Error al obtener creatividades' });
    }
  }

  static async create(req, res) {
    try {
      const { name, description, creator_ids } = req.body;
      
      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'El nombre es obligatorio' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Debes subir un archivo' });
      }

      const creative = await Creative.create({
        name,
        description,
        file_path: `/uploads/${req.file.filename}`,
        file_type: req.file.mimetype
      });

      // Asignar creadores si se proporcionaron
      if (creator_ids) {
        const ids = Array.isArray(creator_ids) ? creator_ids : [creator_ids];
        await Creative.assignCreators(creative.id, ids.map(id => parseInt(id)));
      }

      const creators = await Creator.findByCreativeId(creative.id);
      
      res.json({
        ...creative,
        creators,
        obs_url: `${config.baseUrl}/obs/${creative.unique_code}`
      });
    } catch (error) {
      console.error('Error al crear creatividad:', error);
      res.status(500).json({ error: 'Error al crear creatividad' });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, active, creator_ids } = req.body;

      const updateData = { name, description, active };

      // Si se subió un nuevo archivo
      if (req.file) {
        const oldCreative = await Creative.findById(id);
        
        // Eliminar archivo anterior
        if (oldCreative && oldCreative.file_path) {
          const oldFilePath = path.join(__dirname, '../../public', oldCreative.file_path);
          try {
            await fs.unlink(oldFilePath);
          } catch (err) {
            console.warn('No se pudo eliminar archivo anterior:', err.message);
          }
        }

        updateData.file_path = `/uploads/${req.file.filename}`;
        updateData.file_type = req.file.mimetype;
      }

      const creative = await Creative.update(id, updateData);

      if (!creative) {
        return res.status(404).json({ error: 'Creatividad no encontrada' });
      }

      // Actualizar asignaciones de creadores
      if (creator_ids !== undefined) {
        const ids = Array.isArray(creator_ids) ? creator_ids : creator_ids ? [creator_ids] : [];
        await Creative.assignCreators(creative.id, ids.map(id => parseInt(id)));
      }

      const creators = await Creator.findByCreativeId(creative.id);

      res.json({
        ...creative,
        creators,
        obs_url: `${config.baseUrl}/obs/${creative.unique_code}`
      });
    } catch (error) {
      console.error('Error al actualizar creatividad:', error);
      res.status(500).json({ error: 'Error al actualizar creatividad' });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const creative = await Creative.findById(id);

      if (!creative) {
        return res.status(404).json({ error: 'Creatividad no encontrada' });
      }

      // Eliminar archivo físico
      if (creative.file_path) {
        const filePath = path.join(__dirname, '../../public', creative.file_path);
        try {
          await fs.unlink(filePath);
        } catch (err) {
          console.warn('No se pudo eliminar archivo:', err.message);
        }
      }

      await Creative.delete(id);
      res.json({ message: 'Creatividad eliminada correctamente' });
    } catch (error) {
      console.error('Error al eliminar creatividad:', error);
      res.status(500).json({ error: 'Error al eliminar creatividad' });
    }
  }
}

module.exports = CreativeController;
