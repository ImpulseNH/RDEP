const express = require('express');

const ServicioPerfiles = require('../services/servicePerfiles');

const router = express.Router();
const service = new ServicioPerfiles();

router.get('/', async (req, res, next) => {
    try {
        const perfiles = await service.getAll();
        res.json(perfiles);
    } catch (error) {
        next(error);
    }
});
  
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const perfil = await service.getOneByID(id);
        res.status(200).json(perfil);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const tipo = body.tipo;
    
        await service.add(tipo);
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
        const tipo = body.tipo;
    
        const rta = await service.update(id, tipo);
        res.status(200).send(true);
    } catch (error) {
        next(error);
    }
})

module.exports = router;