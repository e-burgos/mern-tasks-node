const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    // Leer el token del header
    const token = req.header('x-auth-token');

    // verificar si existe un token 
    if(!token){
        return res.status(401). json({ msg: "No hay Token, permiso no válido"})
    };

    // Validar token 
    try {
        const tokenValidate = jwt.verify(token, process.env.SECRET);
        req.user = tokenValidate.user;
        next();
    } catch (error) {
        res.status(401). json({ msg: "Token no válido"})
    }
}