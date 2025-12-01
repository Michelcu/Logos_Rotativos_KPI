const bcrypt = require('bcrypt');
const User = require('../models/User');

class AuthController {
  static async showLogin(req, res) {
    if (req.session.userId) {
      return res.redirect('/dashboard');
    }
    res.render('login', { error: null });
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      console.log('🔐 Intento de login:', email);
      const user = await User.findByEmail(email);
      
      if (!user) {
        console.log('❌ Usuario no encontrado:', email);
        return res.render('login', { error: 'Email o contraseña incorrectos' });
      }

      console.log('✅ Usuario encontrado, verificando contraseña...');
      const validPassword = await bcrypt.compare(password, user.password);
      console.log('🔑 Contraseña válida:', validPassword);
      
      if (!validPassword) {
        console.log('❌ Contraseña incorrecta para:', email);
        return res.render('login', { error: 'Email o contraseña incorrectos' });
      }

      req.session.userId = user.id;
      req.session.userEmail = user.email;
      
      console.log('✅ Login exitoso, creando sesión...');
      
      req.session.save((err) => {
        if (err) {
          console.error('❌ Error al guardar sesión:', err);
          return res.render('login', { error: 'Error al iniciar sesión' });
        }
        console.log('✅ Sesión guardada, redirigiendo...');
        res.redirect('/dashboard');
      });
    } catch (error) {
      console.error('❌ Error en login:', error);
      res.render('login', { error: 'Error al iniciar sesión' });
    }
  }

  static async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/login');
    });
  }
}

module.exports = AuthController;
