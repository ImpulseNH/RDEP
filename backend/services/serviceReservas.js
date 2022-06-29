const pool = require('../libs/postgresql');
const boom = require('@hapi/boom');

class ServicioReservas {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = `SELECT r._id, r.nombre_servicio, r.fecha, r.hora_inicio, r.hora_termino, r.valor, u.nombre_completo, re._id AS id_recinto, re.nombre_recinto, s._id AS id_servicio
                   FROM reservas r, usuarios u, recintos re, servicios s
                   WHERE r.id_usuario = u._id AND r.id_recinto = re._id AND r.id_servicio = s._id`
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async getOneByID(id) {
    const query = `SELECT r._id, r.nombre_servicio, r.fecha, r.hora_inicio, r.hora_termino, r.valor, u.nombre_completo, re._id AS id_recinto, s._id AS id_servicio
                   FROM reservas r, usuarios u, recintos re, servicios s
                   WHERE r._id = $1 AND r.id_usuario = u._id AND r.id_recinto = re._id AND r.id_servicio = s._id`;
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ninguna reserva con esa id");
    else
      return rta.rows;
  }

  async add(nombre_servicio, fecha, hora_inicio, hora_termino, valor, id_usuario, id_recinto, id_servicio) {
    const query = `INSERT INTO reservas(nombre_servicio, fecha, hora_inicio, hora_termino, valor, id_usuario, id_recinto, id_servicio) 
                   VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
    try {
      await this.pool.query(query, [nombre_servicio, fecha, hora_inicio, hora_termino, valor, id_usuario, id_recinto, id_servicio]);
    }
    catch(error) {
      throw boom.badRequest("Error al intentar agregar la reserva");
    }
  }

  async delete(id) {
    const query = 'DELETE FROM reservas WHERE _id = $1';
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ninguna reserva con esa id");
  }

  async updatePrice(id, valor) {
    const query = `UPDATE reservas SET
                    valor = $2,
                  WHERE _id = $1`
    const rta = await this.pool.query(query, [id, valor]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ninguna reserva con esa id");
  }
}

module.exports = ServicioReservas;