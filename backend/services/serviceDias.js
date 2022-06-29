const pool = require('../libs/postgresql');
const boom = require('@hapi/boom');

class ServicioDias {
    constructor() {
        this.pool = pool;
        this.pool.on('error', (err) => console.error(err));
    }

    async getAll() {
      const query = `SELECT *
                     FROM dias
                     ORDER BY 
                      CASE
                        WHEN dia = 'Lunes' THEN 1
                        WHEN dia = 'Martes' THEN 2
                        WHEN dia = 'Miércoles' THEN 3
                        WHEN dia = 'Jueves' THEN 4
                        WHEN dia = 'Viernes' THEN 5
                        WHEN dia = 'Sábado' THEN 6
                        WHEN dia = 'Domingo' THEN 7
                      END ASC`;
      const rta = await this.pool.query(query);
      return rta.rows;
    }

    async getAllByService(id) {
        const query = `SELECT *
                       FROM dias
                       WHERE id_servicio = $1
                       ORDER BY 
                        CASE
                          WHEN dia = 'Lunes' THEN 1
                          WHEN dia = 'Martes' THEN 2
                          WHEN dia = 'Miércoles' THEN 3
                          WHEN dia = 'Jueves' THEN 4
                          WHEN dia = 'Viernes' THEN 5
                          WHEN dia = 'Sábado' THEN 6
                          WHEN dia = 'Domingo' THEN 7
                        END ASC`;
        const rta = await this.pool.query(query, [id]);
        return rta.rows;
    }

    async add(dia, hora_inicio, hora_termino, id_servicio) {
        const query = 'INSERT INTO dias(dia, hora_inicio, hora_termino, id_servicio) VALUES($1, $2, $3, $4)';
        try {
          await this.pool.query(query, [dia, hora_inicio, hora_termino, id_servicio]);
        }
        catch(error) {
          throw boom.badRequest("Error al intentar agregar el día");
        }
      }
}

module.exports = ServicioDias;