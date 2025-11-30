require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const config = require('./config');
const pool = require('./database/connection');

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
    secure: config.server.nodeEnv === 'production'
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

// Iniciar servidor
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Panel admin: http://localhost:${PORT}/dashboard`);
  console.log(`🎥 OBS links: http://localhost:${PORT}/obs/{code}`);
});
