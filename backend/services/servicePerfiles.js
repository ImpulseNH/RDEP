const pool = require('../libs/postgresql');
const boom = require('@hapi/boom');

class ServicioPerfiles {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = 'SELECT * FROM perfiles';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async getOneByID(id) {
    const query = 'SELECT * FROM perfiles WHERE _id = $1';
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún perfil con esa id");
    return rta.rows;
  }

  async add(tipo) {
    const query = 'INSERT INTO perfiles(tipo) VALUES($1)';
    try {
      await this.pool.query(query, [tipo]);
    }
    catch(error) {
      throw boom.badRequest("Error al intentar agregar el perfil. Verifique que el perfil ya exista");
    }
  }

  async delete(id) {
    const query = 'DELETE FROM perfiles WHERE _id = $1';
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún perfil con esa id");
  }

  async update(id, tipo) {
    const query = 'UPDATE perfiles SET tipo = $2 WHERE _id = $1';
    const rta = await this.pool.query(query, [id, tipo]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún usuario con esa id");
  }
}

module.exports = ServicioPerfiles;