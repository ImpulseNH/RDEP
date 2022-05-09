const express = require('express');

const ServicioUsuarios = require('../services/serviceUsuarios');

const router = express.Router();
const service = new ServicioUsuarios();

router.get('/', async (req, res) => {
    const usuarios = await service.getAll();
    res.json(usuarios);
});
  
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const usuario = await service.getOne(id);
    res.json(usuario);
});

router.post('/', async (req, res) => {
    const body = req.body;
    const usuario = {
        nombre: body.nombre,
        apellido: body.apellido,
        alias: body.alias,
        rut: body.rut,
        telefono: body.telefono,
        email: body.email,
        perfil: body.perfil
    }

    const rta = await service.add(usuario.nombre, usuario.apellido, usuario.alias, usuario.rut, usuario.telefono, usuario.email, usuario.perfil);
    res.send(rta);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const rta = await service.delete(id);
    res.send(rta);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const usuario = {
        nombre: body.nombre,
        apellido: body.apellido,
        alias: body.alias,
        rut: body.rut,
        telefono: body.telefono,
        email: body.email,
        perfil: body.perfil
    }

    const rta = await service.update(id, usuario.nombre, usuario.apellido, usuario.alias, usuario.rut, usuario.telefono, usuario.email, usuario.perfil);
    res.send(rta);
})

module.exports = router;