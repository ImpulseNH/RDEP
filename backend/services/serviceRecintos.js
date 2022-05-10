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
      return "No hay recintos en el sistema";
    return rta.rows;
  }

  async getOne(id) {
    const query = 'SELECT * FROM recintos WHERE _id = $1';
    try {
      const rta = await this.pool.query(query, [id]);
      if(rta.rowCount == 0)
        return "No se encontró ningún recinto con esa id";
      return rta.rows;
    }
    catch(error) {
      return "Formato de id incorrecto"; 
    }
  }

  async add(nombre, direccion) {
    const query = 'INSERT INTO recintos(nombre, direccion) VALUES($1, $2)';
    try {
      await this.pool.query(query, [nombre, direccion]);
    }
    catch(error) {
      return "Error al intentar agregar el recinto. Verifique que el recinto ya exista";
    }
    return "Recinto agregado exitosamente";
  }

  async delete(id) {
    const query = 'DELETE FROM recintos WHERE _id = $1';
    try {
      await this.pool.query(query, [id]);
    } catch(error) {
      return "Formato de id incorrecto"
    }
    if(rta.rowCount == 0)
      return "No se encontró ningún recinto con esa id";
    return "Recinto eliminado exitosamente";
  }

  async update(id, nombre, direccion) {
    const query = `UPDATE recintos SET
                    nombre = $2,
                    direccion = $3,
                  WHERE _id = $1`;
    try {
      await this.pool.query(query, [id, nombre, direccion]);
    } catch(error) {
      return "Error al intentar actualizar el recinto";
    }
    if(rta.rowCount == 0)
      return "No se encontró ningún recinto con esa id";
    return "Recinto actualizado exitosamente";
  }
}

module.exports = ServicioRecintos;