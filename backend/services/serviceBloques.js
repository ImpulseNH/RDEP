const pool = require('../database/postgresql');

class ServicioBloques {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = `SELECT b._id, b.fecha, b.hora_inicio, b.hora_termino, b.disponible, b.valor, s._id, s.nombre
                   FROM bloques_horarios b, servicios s
                   WHERE b.id_servicio = s._id`
    const rta = await this.pool.query(query);
    if(rta.rowCount == 0)
      return "No hay bloques en el sistema";
    return rta.rows;
  }

  async getOne() {
    const query = `SELECT b._id, b.fecha, b.hora_inicio, b.hora_termino, b.disponible, b.valor, s._id, s.nombre
                   FROM bloques_horarios b, servicios s
                   WHERE b._id = $1 AND b.id_servicio = s._id`;
    try {
      const rta = await this.pool.query(query, [id]);
      if(rta.rowCount == 0)
        return "No se encontró ningún bloque de horario con esa id";
      return rta.rows;
    }
    catch(error) {
      return "Formato de id incorrecto"; 
    }
  }

  async add(fecha, hora_inicio, hora_termino, disponible, valor, id_servicio) {
    const query = `INSERT INTO bloques_horarios(fecha, hora_inicio, hora_termino, disponible, valor, id_servicio) 
                   VALUES($1, $2, $3, $4, $5, $6)`;
    try {
      await this.pool.query(query, [fecha, hora_inicio, hora_termino, disponible, valor, id_servicio]);
    }
    catch(error) {
      return "Error al intentar agregar el bloque de horario";
    }
    return "Bloque de horario agregado exitosamente";
  }

  async delete(id) {
    const query = 'DELETE FROM bloques_horarios WHERE _id = $1';
    try {
      await this.pool.query(query, [id]);
    } catch(error) {
      return "Formato de id incorrecto"
    }
    if(rta.rowCount == 0)
      return "No se encontró ningún bloque de horario para eliminar";
    return "Bloque de horario eliminado exitosamente";
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
    try {
      await this.pool.query(query, [id, fecha, hora_inicio, hora_termino, disponible, valor, id_servicio]);
    } catch(error) {
      return "Error al intentar actualizar el bloque de horario";
    }
    if(rta.rowCount == 0)
      return "No se encontró ningún bloque de horario con esa id";
    return "Servicio actualizado exitosamente";
  }
}

module.exports = ServicioBloques;