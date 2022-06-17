const express = require('express');

const ServicioServicios = require('../services/serviceServicios');

const router = express.Router();
const service = new ServicioServicios();

router.get('/', async (req, res, next) => {
    try {
        const servicios = await service.getAll();
        res.status(200).json(servicios);
    } catch (error) {
        next(error);
    }
});
  
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const servicio = await service.getOneByID(id);
        res.status(200).json(servicio);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const servicio = {
            nombre: body.nombre,
            duracion: body.duracion,
            capacidad_bloque: body.capacidad_bloque,
            valor_base: body.valor_base,
            recinto: body.recinto
        }
    
        await service.add(servicio.nombre, servicio.duracion, servicio.capacidad_bloque, servicio.valor_base, servicio.recinto);
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
        const servicio = {
            nombre: body.nombre,
            duracion: body.duracion,
            capacidad_bloque: body.capacidad_bloque,
            valor_base: body.valor_base,
            recinto: body.recinto
        }
    
        await service.update(id, servicio.nombre, servicio.duracion, servicio.capacidad_bloque, servicio.valor_base, servicio.recinto);
        res.status(200).send(true);
    } catch (error) {
        next(error);
    }
})

module.exports = router;