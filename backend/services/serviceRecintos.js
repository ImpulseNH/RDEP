const getConnection = require('../database/postgresql');

const pool = require('../database/postgresql');

class ServicioRecintos {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = 'SELECT * FROM recintos';
    const rta = await this.pool.query(query);
    if(rta.rowCount == 0)
      return false;
    return rta.rows;
  }

  async getOne(id) {
    const query = 'SELECT * FROM recintos WHERE _id = $1';
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

module.exports = ServicioRecintos;