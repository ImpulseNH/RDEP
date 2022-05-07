const express = require('express');

const ServicioPerfiles = require('../services/servicePerfiles');

const router = express.Router();
const service = new ServicioPerfiles();

router.get('/', async (req, res) => {
    const perfiles = await service.getAll();
    res.json(perfiles);
});
  
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const perfil = await service.getOne(id);
    res.json(perfil);
});

router.post('/', async (req, res) => {
    const body = req.body;
    const tipo = body.tipo;

    const rta = await service.add(tipo);
    res.send(rta);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const rta = await service.delete(id);
    if(rta == 0)
        res.send(false)
    else
        res.send(true);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const tipo = body.tipo;

    const rta = await service.update(id, tipo);
    if(rta == 0)
        res.send(false)
    else
        res.send(true);
})

module.exports = router;