const pool = require('../libs/postgresql');
const boom = require('@hapi/boom');

class ServicioRecintos {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = 'SELECT * FROM recintos';
    const rta = await this.pool.query(query);
    if(rta.rowCount == 0)
      throw boom.notFound("No hay recintos en el sistema");
    else
      return rta.rows;
  }

  async getOneByID(id) {
    const query = 'SELECT * FROM recintos WHERE _id = $1';
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún recinto con esa id");
    else
      return rta.rows;
  }

  async add(nombre, direccion) {
    const query = 'INSERT INTO recintos(nombre, direccion) VALUES($1, $2)';
    try {
      await this.pool.query(query, [nombre, direccion]);
    }
    catch(error) {
      throw boom.badRequest("Error al intentar agregar el recinto. Verifique que el recinto ya exista");
    }
  }

  async delete(id) {
    const query = 'DELETE FROM recintos WHERE _id = $1';
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún recinto con esa id");
  }

  async update(id, nombre, direccion) {
    const query = `UPDATE recintos SET
                    nombre = $2,
                    direccion = $3,
                  WHERE _id = $1`;
    const rta = await this.pool.query(query, [id, nombre, direccion]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún recinto con esa id");
  }
}

module.exports = ServicioRecintos;