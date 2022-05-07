const express = require('express');

const ServicioUsuarios = require('../services/serviceUsuarios');

const router = express.Router();
const service = new ServicioUsuarios();



module.exports = router;