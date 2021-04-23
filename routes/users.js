const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// Crear usuarios
router.post('/', 
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es un correo válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6})
],
userController.create);

module.exports = router;