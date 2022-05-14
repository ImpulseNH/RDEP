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

        const reserva = await service.getOneByID(id);
        res.status(200).json(reserva);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const reserva = {
            fecha_reserva: body.fecha_reserva,
            valor: body.valor,
            id_usuario: body.usuario,
            id_bloque: body.bloque
        }
    
        await service.add(reserva.fecha_reserva, reserva.valor, reserva.id_usuario, reserva.id_bloque);
        res.status(201).send("Reserva agregada con éxito");
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await service.delete(id);
        res.status(200).send("Reserva eliminada con éxito");
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const reserva = {
            fecha_reserva: body.fecha_reserva,
            valor: body.valor,
            id_usuario: body.usuario,
            id_bloque: body.bloque
        }
    
        await service.update(id, reserva.fecha_reserva, reserva.valor, reserva.id_usuario, reserva.id_bloque);
        res.status(200).send("Reserva actualizada con éxito");
    } catch (error) {
        next(error);
    }
})

module.exports = router;