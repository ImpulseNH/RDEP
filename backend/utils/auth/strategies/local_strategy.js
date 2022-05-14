const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const ServicioUsuarios = require('../../../services/serviceUsuarios');
const service = new ServicioUsuarios();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'contraseña'
    },
    async (email, contraseña, done) => {
    try {
        const hash_contraseña = await service.getPasswordHash(email);

        const isMatch = await bcrypt.compare(contraseña, hash_contraseña.contraseña);
        if(!isMatch)
            throw boom.unauthorized("Contraseña incorrecta");
        else
            done(null, true);
    } catch (error) {
        done(error, false);
    }
});

module.exports = LocalStrategy;