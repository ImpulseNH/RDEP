const express = require('express');

const ServicioReservas = require('../services/serviceReservas');

const router = express.Router();
const service = new ServicioReservas();

router.get('/', async (req, res, next) => {
    try {
        const reservas = await service.getAll();
        res.status(200).json(reservas);
    } catch (error) {
        next(error);
    }
});
  
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const reservas = await service.getAllByClientID(id);
        res.status(200).json(reservas);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const reserva = {
            nombre_servicio: body.nombre_servicio,
            fecha: body.fecha,
            hora_inicio: body.hora_inicio,
            hora_termino: body.hora_termino,
            valor: body.valor,
            id_usuario: body.id_usuario,
            id_recinto: body.id_recinto,
            id_servicio: body.id_servicio
        }
    
        await service.add(reserva.nombre_servicio, reserva.fecha, reserva.hora_inicio, reserva.hora_termino, reserva.valor, reserva.id_usuario, reserva.id_recinto, reserva.id_servicio);
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
        const valor = req.body.valor;
    
        await service.updatePrice(id, valor);
        res.status(200).send(true);
    } catch (error) {
        next(error);
    }
})

module.exports = router;