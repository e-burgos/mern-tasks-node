const User = require('../models/User');
const bcryptjs = require('bcryptjs');

const userController = {
    create: async (req, res) => {

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
            res.json({ msg: 'Usuario creado correctamente' });
        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error')
        }
    },
};

module.exports = userController;