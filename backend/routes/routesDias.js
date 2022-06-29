const express = require('express');

const ServicioDias = require('../services/serviceDias');

const router = express.Router();
const service = new ServicioDias();

router.get('/', async (req, res, next) => {
    try {
        const dias = await service.getAll();
        res.json(dias);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const dias = await service.getAllByService(id);
        res.json(dias);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const dia = {
            dia: body.dia,
            hora_inicio: body.hora_inicio,
            hora_termino: body.hora_termino,
            id_servicio: body.id_servicio
        }
    
        await service.add(dia.dia, dia.hora_inicio, dia.hora_termino, dia.id_servicio);
        res.status(201).send(true);
    } catch (error) {
        next(error);
    }
});

module.exports = router;