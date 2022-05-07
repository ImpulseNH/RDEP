const getConnection = require('../database/postgresql');

const pool = require('../database/postgresql');

class ServicioUsuarios {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = 'SELECT * FROM usuarios';
    const rta = await this.pool.query(query);
    if(rta.rowCount == 0)
      return false;
    return rta.rows;
  }

  async getOne(id) {
    const query = 'SELECT * FROM usuarios WHERE _id = $1';
    try {
      const rta = await this.pool.query(query, [id]);
      if(rta.rowCount == 0)
        return false;
      return rta.rows;
    }
    catch(error) {
      return false; 
    }
  }
}

module.exports = ServicioUsuarios;