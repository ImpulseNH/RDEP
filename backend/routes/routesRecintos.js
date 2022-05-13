const express = require('express');

const ServicioRecintos = require('../services/serviceRecintos');

const router = express.Router();
const service = new ServicioRecintos();

router.get('/', async (req, res, next) => {
    try {
        const recintos = await service.getAll();
        res.status(200).json(recintos);
    } catch (error) {
        next(error);
    }
});
  
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const recinto = await service.getOneByID(id);
        res.status(200).json(recinto);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const recinto = {
            nombre: body.nombre,
            direccion: body.direccion
        }
    
        await service.add(recinto.nombre, recinto.direccion);
        res.status(201).send("Recinto agregado con éxito");
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        await service.delete(id);
        res.status(200).send("Recinto eliminado con éxito");
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const recinto = {
            nombre: body.nombre,
            direccion: body.direccion
        }
    
        await service.update(id, recinto.nombre, recinto.direccion);
        res.status(200).send("Recinto actualizado con éxito");
    } catch (error) {
        next(error);
    }
})

module.exports = router;