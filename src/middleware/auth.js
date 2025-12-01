function requireAuth(req, res, next) {
  console.log('🔒 Verificando autenticación...');
  console.log('   Session ID:', req.sessionID);
  console.log('   User ID:', req.session?.userId);
  
  if (req.session && req.session.userId) {
    console.log('✅ Usuario autenticado:', req.session.userId);
    return next();
  }
  
  console.log('❌ Usuario no autenticado, redirigiendo a login');
  
  if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  
  res.redirect('/login');
}

module.exports = requireAuth;
