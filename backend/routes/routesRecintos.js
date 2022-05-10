const express = require('express');

const ServicioRecintos = require('../services/serviceRecintos');

const router = express.Router();
const service = new ServicioRecintos();

router.get('/', async (req, res) => {
    const recintos = await service.getAll();
    res.json(recintos);
});
  
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const recinto = await service.getOne(id);
    res.json(recinto);
});

router.post('/', async (req, res) => {
    const body = req.body;
    const recinto = {
        nombre: body.nombre,
        direccion: body.direccion
    }

    const rta = await service.add(recinto.nombre, recinto.direccion);
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
    const recinto = {
        nombre: body.nombre,
        direccion: body.direccion
    }

    const rta = await service.update(id, recinto.nombre, recinto.direccion);
    res.send(rta);
})

module.exports = router;