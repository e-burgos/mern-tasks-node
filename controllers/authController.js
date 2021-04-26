const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const userController = {
    login: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        };
        const { email, password } = req.body;

        try {
            // Verificar si el usuario ya existe
            let user = await User.findOne({email});
            if(!user){
                return res.status(404).json({ msg: 'El usuario no existe' });
            };

            // Verificamos password
            const correctPassword = await bcryptjs.compare(password, user.password);
            if(!correctPassword){
                return res.status(400).json({ msg: 'La contraseña es incorrecta' });
            };
            
            // Crear y firmar el JWT
            const payload = {
                user: {
                    id: user.id
                }
            };

            // Firmar JWT
            jwt.sign(payload, process.env.SECRET, {
                expiresIn: 3600
            }, (error, token) => {
                if(error) throw error;
                res.status(200).json({ token: token });
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Hubo un error en el servidor'});
        }
    },

    // Obtener usuario
    authenticatedUser: async (req, res) => {
        try {
            // Obtenemos usuario su el password
            const user = await User.findById(req.user.id).select('-password')
            res.json({user});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Hubo un error en el servidor'});
        }
    }, 
};

module.exports = userController;