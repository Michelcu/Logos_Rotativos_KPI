const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  connectionString: config.database.connectionString,
  ssl: config.database.ssl
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en PostgreSQL:', err);
  process.exit(-1);
});

module.exports = pool;
