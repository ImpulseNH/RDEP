const pool = require('../database/postgresql');

class ServicioReservas {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }
}

module.exports = ServicioReservas;