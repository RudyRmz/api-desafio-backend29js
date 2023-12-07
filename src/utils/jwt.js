const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const User = require('../models/users')

module.exports = {
    create: (data) => {
        let token = jwt.sign({_id: data._id}, JWT_SECRET, {expiresIn: 6000})//sign es la función que crea los tokens, es de JWT (payload, contraseña, tiempo de expiración)
        return token
    },

    //siempre verificamos el token con un middleware antes de la rutas par que si no se cumple no continúa el procesos de autenticación
    verify: (req, res, next) => {
        const token = req.headers['bearerauth']
        const dateNow = new Date() //new es la palabra recebada para crear objetos con Date(): la fecha actual en formato unix
        if (!token) {
            return res.status(401).send({msg: "Usuario no autorizado"})
        }
        jwt.verify(token, JWT_SECRET, async (err, decode) => {
            if (err) return res.status(401).send({msg: "Token invalido"})
            if (decode.exp < dateNow.getTime() / 1000){
                return res.status(401).send({msg: "Sesión expirada"})
            }
            req.loginUser = await User.findById(decode._id)
            next()
        })
    }
}