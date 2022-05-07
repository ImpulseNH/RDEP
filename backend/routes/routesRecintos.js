const express = require('express');

const ServicioRecintos = require('../services/serviceRecintos');

const router = express.Router();
const service = new ServicioRecintos();



module.exports = router;