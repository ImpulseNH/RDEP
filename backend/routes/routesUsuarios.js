const express = require('express');
const bcrypt = require('bcrypt');

const ServicioUsuarios = require('../services/serviceUsuarios');

const router = express.Router();
const service = new ServicioUsuarios();

router.get('/', async (req, res, next) => {
    try {
        const usuarios = await service.getAll();
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
});
  
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const usuario = await service.getOneByID(id);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
});

router.post('/registrarse', async (req, res, next) => {
    try {
        const body = req.body;
        const usuario = {
            nombre_completo: body.nombre_completo,
            alias: body.alias,
            rut: body.rut,
            telefono: body.telefono,
            email: body.email,
            contraseña: body.contraseña,
            perfil: body.perfil
        }
    
        const hash = await bcrypt.hash(usuario.contraseña, 10);
    
        await service.add(usuario.nombre_completo, usuario.alias, usuario.rut, usuario.telefono, usuario.email, hash, usuario.perfil);
        res.status(201).send("Usuario registrado con éxito");
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await service.delete(id);
        res.status(200).send("Usuario eliminado con éxito");
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const usuario = {
            nombre_completo: body.nombre_completo,
            alias: body.alias,
            rut: body.rut,
            telefono: body.telefono,
            email: body.email,
            perfil: body.perfil
        }
    
        await service.update(id, usuario.nombre_completo, usuario.alias, usuario.rut, usuario.telefono, usuario.email, usuario.perfil);
        res.status(200).send("Usuario actualizado con éxito");
    } catch (error) {
        next(error);
    }
})

module.exports = router;