const express = require('express');

const routerUsuarios = require('./routesUsuarios');
const routerRecintos = require('./routesRecintos');
const routerPerfiles = require('./routesPerfiles');

function routerApi(app) {
  app.use('/usuarios', routerUsuarios);
  app.use('/recintos', routerRecintos);
  app.use('/perfiles', routerPerfiles);
}

module.exports = routerApi;