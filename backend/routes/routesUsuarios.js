const express = require('express');

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

router.post('/isAdmin', async (req, res, next) => {
    try {
        const email = req.body.email;

        const rta = await service.getProfile(email);

        if(rta.tipo == "Administrador")
            res.status(200).send(true);
        else
            res.status(200).send(false);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
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
    
        await service.add(usuario.nombre_completo, usuario.alias, usuario.rut, usuario.telefono, usuario.email, usuario.contraseña, usuario.perfil);
        res.status(201).send(true);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await service.delete(id);
        res.status(200).send(true);
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
        res.status(200).send(true);
    } catch (error) {
        next(error);
    }
})

module.exports = router;