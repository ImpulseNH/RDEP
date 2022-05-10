const express = require('express');

const routerUsuarios = require('./routesUsuarios');
const routerRecintos = require('./routesRecintos');
const routerPerfiles = require('./routesPerfiles');
const routerServicios = require('./routesServicios');
const routerBloques = require('./routesBloques');
const routerReservas = require('./routesReservas');

function routerApi(app) {
  app.use('/usuarios', routerUsuarios);
  app.use('/recintos', routerRecintos);
  app.use('/perfiles', routerPerfiles);
  app.use('./servicios', routerServicios);
  app.use('/bloques', routerBloques);
  app.use('/reservas', routerReservas);
}

module.exports = routerApi;