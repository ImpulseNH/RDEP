const express = require('express');

const ServicioBloques = require('../services/serviceBloques');

const router = express.Router();
const service = new ServicioBloques();

router.get('/', async (req, res) => {
    const bloques = await service.getAll();
    res.json(bloques);
});
  
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const bloque = await service.getOne(id);
    res.json(bloque);
});

router.post('/', async (req, res) => {
    const body = req.body;
    const bloque = {
        fecha: body.fecha,
        hora_inicio: body.hora_inicio,
        hora_termino: body.hora_termino,
        disponible: body.disponible,
        valor: body.valor,
        id_servicio: body.id_servicio
    }

    const rta = await service.add(bloque.fecha, bloque.hora_inicio, bloque.hora_termino, bloque.disponible, bloque.valor, bloque.id_servicio);
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
    const bloque = {
        fecha: body.fecha,
        hora_inicio: body.hora_inicio,
        hora_termino: body.hora_termino,
        disponible: body.disponible,
        valor: body.valor,
        id_servicio: body.id_servicio
    }

    const rta = await service.update(id, bloque.fecha, bloque.hora_inicio, bloque.hora_termino, bloque.disponible, bloque.valor, bloque.id_servicio);
    res.send(rta);
})

module.exports = router;