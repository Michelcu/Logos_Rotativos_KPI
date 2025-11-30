const pool = require('../database/connection');
const crypto = require('crypto');

class Creative {
  static generateUniqueCode() {
    return crypto.randomBytes(8).toString('hex');
  }

  static async findAll() {
    const result = await pool.query(
      'SELECT * FROM creatives ORDER BY created_at DESC'
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM creatives WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async findByCode(code) {
    const result = await pool.query(
      'SELECT * FROM creatives WHERE unique_code = $1',
      [code]
    );
    return result.rows[0];
  }

  static async create({ name, description, file_path, file_type }) {
    const unique_code = this.generateUniqueCode();
    const result = await pool.query(
      `INSERT INTO creatives (name, description, file_path, file_type, unique_code)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description || null, file_path, file_type, unique_code]
    );
    return result.rows[0];
  }

  static async update(id, { name, description, file_path, file_type, active }) {
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      values.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }
    if (file_path !== undefined) {
      updates.push(`file_path = $${paramCount++}`);
      values.push(file_path);
    }
    if (file_type !== undefined) {
      updates.push(`file_type = $${paramCount++}`);
      values.push(file_type);
    }
    if (active !== undefined) {
      updates.push(`active = $${paramCount++}`);
      values.push(active);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await pool.query(
      `UPDATE creatives
       SET ${updates.join(', ')}
       WHERE id = $${paramCount}
       RETURNING *`,
      values
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM creatives WHERE id = $1', [id]);
  }

  // Gestión de asignaciones
  static async assignCreators(creativeId, creatorIds) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Eliminar asignaciones anteriores
      await client.query(
        'DELETE FROM creative_assignments WHERE creative_id = $1',
        [creativeId]
      );

      // Crear nuevas asignaciones
      if (creatorIds && creatorIds.length > 0) {
        const values = creatorIds.map((creatorId, i) => 
          `($1, $${i + 2})`
        ).join(', ');
        
        await client.query(
          `INSERT INTO creative_assignments (creative_id, creator_id)
           VALUES ${values}`,
          [creativeId, ...creatorIds]
        );
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getAssignedCreatorIds(creativeId) {
    const result = await pool.query(
      'SELECT creator_id FROM creative_assignments WHERE creative_id = $1',
      [creativeId]
    );
    return result.rows.map(row => row.creator_id);
  }
}

module.exports = Creative;
