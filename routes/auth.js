const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');

// api/auth
router.post('/', 
[
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es un correo válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6})
],
authController.login);

module.exports = router;