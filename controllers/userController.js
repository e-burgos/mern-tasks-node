const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const userController = {
    create: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        };
        try {
            const { email, password } = req.body;
            // Verificar si el usuario ya existe
            let user = await User.findOne({email});

            if(user){
                res.status(400).json({ msg: 'El usuario ya existe' });
            };
            // Crear usuario
            user = new User(req.body); 

            // Hashear el password
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);

            // Guardar en DB
            await user.save(); 

            // Crear JWT 
            const payload = {
                user: {
                    id: user.id
                }
            }

            // Firmar token 
            jwt.sign(payload, process.env.SECRET, {
                expiresIn: 3600 // 1 hour
            }, (error, token) => {
                if(error) throw error;
                res.json({ token: token });
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({msg: 'Hubo un error en el servidor'});
        }
    },
}

module.exports = userController;