const pool = require('../database/connection');

class Creator {
  static async findAll() {
    const result = await pool.query(
      'SELECT * FROM creators ORDER BY name ASC'
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      'SELECT * FROM creators WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async create({ name, twitch_username, notes }) {
    const result = await pool.query(
      `INSERT INTO creators (name, twitch_username, notes)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, twitch_username || null, notes || null]
    );
    return result.rows[0];
  }

  static async update(id, { name, twitch_username, notes, active }) {
    const result = await pool.query(
      `UPDATE creators
       SET name = $1, twitch_username = $2, notes = $3, active = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [name, twitch_username || null, notes || null, active, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM creators WHERE id = $1', [id]);
  }

  static async findByCreativeId(creativeId) {
    const result = await pool.query(
      `SELECT c.* FROM creators c
       INNER JOIN creative_assignments ca ON c.id = ca.creator_id
       WHERE ca.creative_id = $1
       ORDER BY c.name ASC`,
      [creativeId]
    );
    return result.rows;
  }
}

module.exports = Creator;
