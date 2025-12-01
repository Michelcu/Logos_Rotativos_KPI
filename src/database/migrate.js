const pool = require('./connection');
const bcrypt = require('bcrypt');
const config = require('../config');

async function migrate() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Iniciando migraciones...');
    
    await client.query('BEGIN');

    // Tabla de usuarios (admin)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla users creada');

    // Tabla de creadores
    await client.query(`
      CREATE TABLE IF NOT EXISTS creators (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        twitch_username VARCHAR(255),
        notes TEXT,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla creators creada');

    // Tabla de creatividades
    await client.query(`
      CREATE TABLE IF NOT EXISTS creatives (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        file_path VARCHAR(500) NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        unique_code VARCHAR(50) UNIQUE NOT NULL,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabla creatives creada');

    // Tabla de asignaciones (relación muchos a muchos)
    await client.query(`
      CREATE TABLE IF NOT EXISTS creative_assignments (
        id SERIAL PRIMARY KEY,
        creative_id INTEGER REFERENCES creatives(id) ON DELETE CASCADE,
        creator_id INTEGER REFERENCES creators(id) ON DELETE CASCADE,
        assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(creative_id, creator_id)
      )
    `);
    console.log('✅ Tabla creative_assignments creada');

    // Crear índices para mejor rendimiento
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_creatives_unique_code ON creatives(unique_code);
      CREATE INDEX IF NOT EXISTS idx_creative_assignments_creative ON creative_assignments(creative_id);
      CREATE INDEX IF NOT EXISTS idx_creative_assignments_creator ON creative_assignments(creator_id);
    `);
    console.log('✅ Índices creados');

    // Crear usuario admin si no existe
    const hashedPassword = await bcrypt.hash(config.admin.password, 10);
    await client.query(`
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      ON CONFLICT (email) DO NOTHING
    `, [config.admin.email, hashedPassword]);
    console.log(`✅ Usuario admin creado: ${config.admin.email}`);

    await client.query('COMMIT');
    console.log('🎉 Migraciones completadas exitosamente');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error en migraciones:', error);
    throw error;
  } finally {
    client.release();
    // No cerrar el pool en producción, solo cuando se ejecuta directamente
    if (require.main === module) {
      await pool.end();
    }
  }
}

// Ejecutar migraciones si se llama directamente
if (require.main === module) {
  migrate()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = migrate;
