const pool = require('../libs/postgresql');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

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
      throw boom.notFound("No hay usuarios en el sistema");
    else
      return rta.rows;
  }

  async getOneByID(id) {
    const query = `SELECT u._id, u.nombre_completo, u.alias_, u.rut, u.telefono, u.email, p.tipo
                   FROM usuarios u, perfiles p
                   WHERE u._id = $1 AND u.id_perfil = p._id`;
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún usuario con esa id");
    else
      return rta.rows;
  }

  async getProfile(email) {
    const query = `SELECT p.tipo
                   FROM usuarios u, perfiles p
                   WHERE u.email = $1 AND u.id_perfil = p._id`;
    const rta = await this.pool.query(query, [email]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún usuario con ese email");
    else
      return rta.rows[0];
  }

  async getPasswordHash(email) {
    const query = 'SELECT contraseña FROM usuarios WHERE email = $1';
    const rta = await this.pool.query(query, [email]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún usuario con ese email");
    else
      return rta.rows[0];
  }

  async add(nombre_completo, alias, rut, telefono, email, contraseña, perfil) {
    const query = `INSERT INTO usuarios(nombre_completo, alias_, rut, telefono, email, contraseña, id_perfil) 
                   VALUES($1, $2, $3, $4, $5, $6, (SELECT _id FROM perfiles WHERE tipo = $7))`;
    try {
      const hash = await bcrypt.hash(contraseña, 10);

      await this.pool.query(query, [nombre_completo, alias, rut, telefono, email, hash, perfil]);
    }
    catch(error) {
      throw boom.badRequest("Error al intentar agregar el usuario. Verifique que el usuario ya exista");
    }
  }

  async delete(id) {
    const query = 'DELETE FROM usuarios WHERE _id = $1';
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún usuario con esa id");
  }

  async update(id, nombre_completo, alias, rut, telefono, email, perfil) {
    const query = `UPDATE usuarios SET
                    nombre_completo = $2,
                    alias_ = $3,
                    rut = $4,
                    telefono = $5,
                    email = $6,
                    id_perfil = (SELECT _id FROM perfiles WHERE tipo = $7)
                  WHERE _id = $1`
    const rta = await this.pool.query(query, [id, nombre_completo, alias, rut, telefono, email, perfil]);

    if(rta.rowCount == 0)
      throw boom.notFound("No se encontró ningún usuario con esa id");
  }
}

module.exports = ServicioUsuarios;