const pool = require('../database/postgresql');

class ServicioUsuarios {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = `SELECT u._id, u.nombre_completo, u.alias_, u.rut, u.telefono, u.email, p.tipo
                   FROM usuarios u, perfiles p
                   WHERE u.id_perfil = p._id`;
    const rta = await this.pool.query(query);
    if(rta.rowCount == 0)
      return "No hay usuarios en el sistema";
    return rta.rows;
  }

  async getOne(id) {
    const query = `SELECT u._id, u.nombre_completo, u.alias_, u.rut, u.telefono, u.email, p.tipo
                   FROM usuarios u, perfiles p
                   WHERE u._id = $1 AND u.id_perfil = p._id`;
    try {
      const rta = await this.pool.query(query, [id]);
      if(rta.rowCount == 0)
        return "No se encontró ningún usuario con esa id";
      return rta.rows;
    }
    catch(error) {
      return "Formato de id incorrecto"; 
    }
  }

  async add(nombre, apellido, alias, rut, telefono, email, perfil) {
    const query = `INSERT INTO usuarios(nombre, apellido, alias_, rut, telefono, email, id_perfil) 
                   VALUES($1, $2, $3, $4, $5, $6, (SELECT _id FROM perfiles WHERE tipo = $7))`;
    try {
      await this.pool.query(query, [nombre, apellido, alias, rut, telefono, email, perfil]);
    }
    catch(error) {
      return "Error al intentar agregar el usuario. Verifique que el usuario ya exista";
    }
    return "Usuario agregado exitosamente";
  }

  async delete(id) {
    const query = 'DELETE FROM usuarios WHERE _id = $1';
    try {
      await this.pool.query(query, [id]);
    } catch(error) {
      return "Formato de id incorrecto"
    }
    if(rta.rowCount == 0)
      return "No se encontró ningún usuario para eliminar";
    return "Usuario eliminado exitosamente";
  }

  async update(id, nombre, apellido, alias, rut, telefono, email, perfil) {
    const query = `UPDATE usuarios SET
                    nombre = $2,
                    apellido = $3,
                    alias_ = $4,
                    rut = $5,
                    telefono = $6,
                    email = $7,
                    id_perfil = (SELECT _id FROM perfiles WHERE tipo = $8)
                  WHERE _id = $1`
    try {
      await this.pool.query(query, [id, nombre, apellido, alias, rut, telefono, email, perfil]);
    } catch(error) {
      return "Error al intentar actualizar el usuario";
    }
    if(rta.rowCount == 0)
      return "No se encontró ningún usuario con esa id";
    return "Usuario actualizado exitosamente";
  }
}

module.exports = ServicioUsuarios;