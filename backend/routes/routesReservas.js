const express = require('express');

const ServicioReservas = require('../services/serviceReservas');

const router = express.Router();
const service = new ServicioReservas();

// GET, POST, PUT, DELETE

module.exports = router;