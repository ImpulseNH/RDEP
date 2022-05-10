const express = require('express');

const ServicioServicios = require('../services/serviceServicios');

const router = express.Router();
const service = new ServicioServicios();

router.get('/', async (req, res) => {
    const servicios = await service.getAll();
    res.json(servicios);
});
  
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const servicio = await service.getOne(id);
    res.json(servicio);
});

router.post('/', async (req, res) => {
    const body = req.body;
    const servicio = {
        nombre: body.nombre,
        duracion: body.duracion,
        capacidad_bloque: body.capacidad_bloque,
        valor_base: body.valor_base,
        recinto: body.recinto
    }

    const rta = await service.add(servicio.nombre, servicio.duracion, servicio.capacidad_bloque, servicio.valor_base, servicio.recinto);
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
    const servicio = {
        nombre: body.nombre,
        duracion: body.duracion,
        capacidad_bloque: body.capacidad_bloque,
        valor_base: body.valor_base,
        recinto: body.recinto
    }

    const rta = await service.update(id, servicio.nombre, servicio.duracion, servicio.capacidad_bloque, servicio.valor_base, servicio.recinto);
    res.send(rta);
})

module.exports = router;