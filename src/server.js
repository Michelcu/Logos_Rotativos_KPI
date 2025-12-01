require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const config = require('./config');
const pool = require('./database/connection');
const migrate = require('./database/migrate');

const app = express();

// Configuración de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Sesiones con PostgreSQL
app.use(session({
  store: new pgSession({
    pool,
    tableName: 'session'
  }),
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: config.session.maxAge,
    httpOnly: true,
    secure: false, // Desactivar en Railway por problemas con proxy
    sameSite: 'lax'
  }
}));

// Rutas
app.use('/', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/api/creators', require('./routes/creators'));
app.use('/api/creatives', require('./routes/creatives'));
app.use('/obs', require('./routes/obs'));

// Ruta raíz
app.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

// 404
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Función para iniciar el servidor
async function startServer() {
  try {
    // Ejecutar migraciones primero
    console.log('📊 Ejecutando migraciones de base de datos...');
    await migrate();
    console.log('✅ Base de datos lista');

    // Iniciar servidor
    const PORT = config.server.port;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📊 Panel admin: /dashboard`);
      console.log(`🎥 OBS links: /obs/{code}`);
      console.log(`🌍 Environment: ${config.server.nodeEnv}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  }
}

// Iniciar servidor
startServer();
