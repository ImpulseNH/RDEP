const pool = require('../libs/postgresql');
const boom = require('@hapi/boom');

class ServicioReservas {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = `SELECT r._id, r.fecha_reserva, r.valor, u.nombre_completo, b._id AS id_bloque
                   FROM reservas r, usuarios u, bloques_horarios b
                   WHERE r.id_usuario = u._id AND r.id_bloqueHorario = b._id`
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async getOneByID(id) {
    const query = `SELECT r._id, r.fecha_reserva, r.valor, u.nombre_completo, b._id
                   FROM reservas r, usuarios u, bloques_horarios b
                   WHERE r._id = $1 AND r.id_usuario = u._id AND r.id_bloqueHorario = b._id`;
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ninguna reserva con esa id");
    else
      return rta.rows;
  }

  async add(fecha_reserva, valor, id_usuario, id_bloqueHorario) {
    const query = `INSERT INTO reservas(fecha_reserva, valor, id_usuario, id_bloqueHorario) 
                   VALUES($1, $2, $3, $4)`;
    try {
      await this.pool.query(query, [fecha_reserva, valor, id_usuario, id_bloqueHorario]);
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

  async update(id, valor) {
    const query = `UPDATE reservas SET
                    valor = $2,
                  WHERE _id = $1`
    const rta = await this.pool.query(query, [id, valor]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ninguna reserva con esa id");
  }
}

module.exports = ServicioReservas;