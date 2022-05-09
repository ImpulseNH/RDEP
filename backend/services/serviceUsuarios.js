const { query } = require('express');
const getConnection = require('../database/postgresql');

const pool = require('../database/postgresql');

class ServicioUsuarios {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async getAll() {
    const query = 'SELECT * FROM usuarios';
    const rta = await this.pool.query(query);
    if(rta.rowCount == 0)
      return false;
    return rta.rows;
  }

  async getOne(id) {
    const query = 'SELECT * FROM usuarios WHERE _id = $1';
    try {
      const rta = await this.pool.query(query, [id]);
      if(rta.rowCount == 0)
        return false;
      return rta.rows;
    }
    catch(error) {
      return false; 
    }
  }

  async add(nombre, apellido, alias, rut, telefono, email, perfil) {
    const query = `INSERT INTO usuarios(nombre, apellido, alias_, rut, telefono, email, id_perfil) 
                   VALUES($1, $2, $3, $4, $5, $6, (SELECT _id FROM perfiles WHERE tipo = $7))`;
    try {
      await this.pool.query(query, [nombre, apellido, alias, rut, telefono, email, perfil]);
    }
    catch(error) {
      return false;
    }
    return true;
  }

  async delete(id) {
    const query = 'DELETE FROM usuarios WHERE _id = $1';
    const rta = await this.pool.query(query, [id]);
    if(rta.rowCount == 0)
      return false;
    return true;
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
      const rta = await this.pool.query(query, [id, nombre, apellido, alias, rut, telefono, email, perfil]);
    } catch(error) {
      return false;
    }
    if(rta.rowCount == 0)
      return false;
    return true;
  }
}

module.exports = ServicioUsuarios;