const routerUsuarios = require('./routesUsuarios');
const routerRecintos = require('./routesRecintos');
const routerPerfiles = require('./routesPerfiles');
const routerServicios = require('./routesServicios');
const routerDias = require('./routesDias');
const routerReservas = require('./routesReservas');
const routerAuth = require('./routerAuth');

function routerApi(app) {
  app.use('/usuarios', routerUsuarios);
  app.use('/recintos', routerRecintos);
  app.use('/perfiles', routerPerfiles);
  app.use('/servicios', routerServicios);
  app.use('/dias', routerDias);
  app.use('/reservas', routerReservas);
  app.use('/auth', routerAuth);
}

module.exports = routerApi;