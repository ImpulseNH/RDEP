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
      return "No hay perfiles en el sistema";
    return rta.rows;
  }

  async getOne(id) {
    const query = 'SELECT * FROM perfiles WHERE _id = $1';
    try {
      const rta = await this.pool.query(query, [id]);
      if(rta.rowCount == 0)
        return "No se encontró ningún perfil con esa id";
      return rta.rows;
    }
    catch(error) {
      return "Formato de id incorrecto";
    }
  }

  async add(tipo) {
    const query = 'INSERT INTO perfiles(tipo) VALUES($1)';
    try {
      await this.pool.query(query, [tipo]);
    }
    catch(error) {
      return "Error al intentar agregar el perfil. Verifique que el perfil ya exista";
    }
    return "Perfil agregado exitosamente";
  }

  async delete(id) {
    const query = 'DELETE FROM perfiles WHERE _id = $1';
    try {
      await this.pool.query(query, [id]);
    } catch(error) {
      return "Formato de id incorrecto"
    }
    if(rta.rowCount == 0)
      return "No se encontró ningún perfil con esa id";
    return "Perfil eliminado exitosamente";
  }

  async update(id, tipo) {
    const query = 'UPDATE perfiles SET tipo = $2 WHERE _id = $1';
    try {
      await this.pool.query(query, [id, tipo]);
    } catch(error) {
      return "Error al intentar actualizar el perfil";
    }
    if(rta.rowCount == 0)
      return "No se encontró ningún usuario con esa id";
    return "Perfil actualizado exitosamente";
  }
}

module.exports = ServicioPerfiles;