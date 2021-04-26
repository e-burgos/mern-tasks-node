const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth')
const { check } = require('express-validator');

// Iniciar sesion
// api/auth 

// login
router.post('/', 
[
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es un correo válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6})
],
authController.login);

// Obtener usuario autenticado
router.get('/', 
auth,
authController.authenticatedUser);



module.exports = router;