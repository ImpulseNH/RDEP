const pool = require('../libs/postgresql');
const boom = require('@hapi/boom');

class ServicioServicios {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = `SELECT s._id, s.nombre, s.duracion, s.capacidad_bloque, s.valor_base, r.nombre
                   FROM servicios s, recintos r
                   WHERE s.id_recinto = r._id`
    const rta = await this.pool.query(query);
    if(rta.rowCount == 0)
      throw boom.notFound("No hay servicios en el sistema");
    else
      return rta.rows;
  }

  async getOneByID() {
    const query = `SELECT s._id, s.nombre, s.duracion, s.capacidad_bloque, s.valor_base, r.nombre
                   FROM servicios s, recintos r
                   WHERE s._id = $1 AND s.id_recinto = r._id`;
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún servicio con esa id");
    else
      return rta.rows;
  }

  async add(nombre, duracion, capacidad_bloque, valor_base, recinto) {
    const query = `INSERT INTO servicios(nombre, duracion, capacidad_bloque, valor_base, id_recinto) 
                   VALUES($1, $2, $3, $4, (SELECT _id FROM recintos WHERE nombre = $5))`;
    try {
      await this.pool.query(query, [nombre, duracion, capacidad_bloque, valor_base, recinto]);
    }
    catch(error) {
      throw boom.badRequest("Error al intentar agregar el servicio. Verifique que el servicio ya exista");
    }
  }

  async delete(id) {
    const query = 'DELETE FROM servicios WHERE _id = $1';
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún servicio con esa id");
  }

  async update(id, nombre, duracion, capacidad_bloque, valor_base, recinto) {
    const query = `UPDATE servicios SET
                    nombre = $2,
                    duracion = $3,
                    capacidad_bloque = $4,
                    valor_base = $5,
                    recinto = (SELECT _id FROM recintos WHERE nombre = $6)
                  WHERE _id = $1`
    const rta = await this.pool.query(query, [id, nombre, duracion, capacidad_bloque, recinto]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún servicio con esa id");
  }
}

module.exports = ServicioServicios;