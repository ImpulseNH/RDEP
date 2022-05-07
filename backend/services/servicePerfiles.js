const getConnection = require('../database/postgresql');

const pool = require('../database/postgresql');

class ServicioPerfiles {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = 'SELECT * FROM perfiles';
    const rta = await this.pool.query(query);
    if(rta.rowCount == 0)
      return false;
    return rta.rows;
  }

  async getOne(id) {
    const query = 'SELECT * FROM perfiles WHERE _id = $1';
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

  async add(tipo) {
    const query = 'INSERT INTO perfiles(tipo) VALUES($1)'
    try {
      await this.pool.query(query, [tipo]);
    }
    catch(error) {
      return false;
    }
    return true;
  }

  async delete(id) {
    const query = 'DELETE FROM perfiles WHERE _id = $1';
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      return false;
    return true;
  }

  async update(id, tipo) {
    const query = 'UPDATE perfiles SET tipo = $2 WHERE _id = $1';
    const rta = await this.pool.query(query, [id, tipo]);
    if(rta.rowCount == 0)
      return false;
    return true;
  }
}

module.exports = ServicioPerfiles;