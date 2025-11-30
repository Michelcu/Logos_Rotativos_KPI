require('dotenv').config();

module.exports = {
  database: {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  },
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  session: {
    secret: process.env.SESSION_SECRET || 'change-this-secret-in-production',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 días
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@kpigaming.es',
    password: process.env.ADMIN_PASSWORD || 'cambiar123'
  },
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  upload: {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ['video/mp4', 'video/webm', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']
  }
};
