const pool = require('../database/postgresql');

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
      return "No hay servicios en el sistema";
    return rta.rows;
  }

  async getOne() {
    const query = `SELECT s._id, s.nombre, s.duracion, s.capacidad_bloque, s.valor_base, r.nombre
                   FROM servicios s, recintos r
                   WHERE s._id = $1 AND s.id_recinto = r._id`;
    try {
      const rta = await this.pool.query(query, [id]);
      if(rta.rowCount == 0)
        return "No se encontró ningún servicio con esa id";
      return rta.rows;
    }
    catch(error) {
      return "Formato de id incorrecto"; 
    }
  }

  async add(nombre, duracion, capacidad_bloque, valor_base, recinto) {
    const query = `INSERT INTO servicios(nombre, duracion, capacidad_bloque, valor_base, id_recinto) 
                   VALUES($1, $2, $3, $4, (SELECT _id FROM recintos WHERE nombre = $5))`;
    try {
      await this.pool.query(query, [nombre, duracion, capacidad_bloque, valor_base, recinto]);
    }
    catch(error) {
      return "Error al intentar agregar el servicio. Verifique que el servicio ya exista";
    }
    return "Servicio agregado exitosamente";
  }

  async delete(id) {
    const query = 'DELETE FROM servicios WHERE _id = $1';
    try {
      await this.pool.query(query, [id]);
    } catch(error) {
      return "Formato de id incorrecto"
    }
    if(rta.rowCount == 0)
      return "No se encontró ningún servicio para eliminar";
    return "Servicio eliminado exitosamente";
  }

  async update(id, nombre, duracion, capacidad_bloque, valor_base, recinto) {
    const query = `UPDATE servicios SET
                    nombre = $2,
                    duracion = $3,
                    capacidad_bloque = $4,
                    valor_base = $5,
                    recinto = (SELECT _id FROM recintos WHERE nombre = $6)
                  WHERE _id = $1`
    try {
      await this.pool.query(query, [id, nombre, duracion, capacidad_bloque, recinto]);
    } catch(error) {
      return "Error al intentar actualizar el servicio";
    }
    if(rta.rowCount == 0)
      return "No se encontró ningún servicio con esa id";
    return "Servicio actualizado exitosamente";
  }
}

module.exports = ServicioServicios;