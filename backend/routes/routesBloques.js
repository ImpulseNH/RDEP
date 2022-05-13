const express = require('express');

const ServicioBloques = require('../services/serviceBloques');

const router = express.Router();
const service = new ServicioBloques();

router.get('/', async (req, res, next) => {
    try {
        const bloques = await service.getAll();
        res.status(200).json(bloques);
    } catch (error) {
        next(error);
    }
});
  
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const bloque = await service.getOneByID(id);
        res.status(200).json(bloque);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const bloque = {
            fecha: body.fecha,
            hora_inicio: body.hora_inicio,
            hora_termino: body.hora_termino,
            disponible: body.disponible,
            valor: body.valor,
            id_servicio: body.id_servicio
        }
    
        await service.add(bloque.fecha, bloque.hora_inicio, bloque.hora_termino, bloque.disponible, bloque.valor, bloque.id_servicio);
        res.status(201).send("Bloque de horario agregado con éxito");
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await service.delete(id);
        res.status(200).send("Bloque de horario eliminado con éxito");
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
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
    
        await service.update(id, bloque.fecha, bloque.hora_inicio, bloque.hora_termino, bloque.disponible, bloque.valor, bloque.id_servicio);
        res.status(200).send("Bloque de horario actualizado con éxito");
    } catch (error) {
        next(error);
    }
})

module.exports = router;