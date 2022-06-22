const pool = require('../libs/postgresql');
const boom = require('@hapi/boom');

class ServicioBloques {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = `SELECT b._id, b.fecha, b.hora_inicio, b.hora_termino, b.disponible, b.valor, b.id_servicio
                   FROM bloques_horarios b, servicios s
                   WHERE b.id_servicio = s._id`
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async getOneByID() {
    const query = `SELECT b._id, b.fecha, b.hora_inicio, b.hora_termino, b.disponible, b.valor, b.id_servicio
                   FROM bloques_horarios b, servicios s
                   WHERE b._id = $1 AND b.id_servicio = s._id`;
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún bloque de horario con esa id");
    else
      return rta.rows[0];
  }

  async getAllByServicio(id_servicio) {
    const query = `SELECT b._id, b.fecha, b.hora_inicio, b.hora_termino, b.disponible, b.valor, b.id_servicio
                   FROM bloques_horarios b, servicios s
                   WHERE b.id_servicio = s._id AND b.id_servicio = $1`
    const rta = await this.pool.query(query, [id_servicio]);
    return rta.rows;
  }

  async add(fecha, hora_inicio, hora_termino, disponible, valor, id_servicio) {
    const query = `INSERT INTO bloques_horarios(fecha, hora_inicio, hora_termino, disponible, valor, id_servicio) 
                   VALUES($1, $2, $3, $4, $5, $6)`;
    try {
      await this.pool.query(query, [fecha, hora_inicio, hora_termino, disponible, valor, id_servicio]);
    }
    catch(error) {
      throw boom.badRequest("Error al intentar agregar el bloque de horario");
    }
  }

  async delete(id) {
    const query = 'DELETE FROM bloques_horarios WHERE _id = $1';
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún bloque de horario con esa id");
  }

  async update(id, fecha, hora_inicio, hora_termino, disponible, valor, id_servicio) {
    const query = `UPDATE bloques_horarios SET
                    fecha = $2,
                    hora_inicio = $3,
                    hora_termino = $4,
                    disponible = $5,
                    valor = $6,
                    id_servicio = $7
                  WHERE _id = $1`
    const rta = await this.pool.query(query, [id, fecha, hora_inicio, hora_termino, disponible, valor, id_servicio]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún bloque de horario con esa id");
  }

  async updateAvailability(id, disponible) {
    const query = `UPDATE bloques_horarios SET
                    disponible = $2
                   WHERE _id = $1`
    const rta = await this.pool.query(query, [id, disponible]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún bloque de horario con esa id");
  }
}

module.exports = ServicioBloques;