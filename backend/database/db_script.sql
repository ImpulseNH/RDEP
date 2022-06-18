---------------------------- Creación de Tablas ----------------------------

DROP TABLE IF EXISTS perfiles CASCADE;
CREATE TABLE perfiles(
	_id SERIAL NOT NULL,
	tipo VARCHAR(15) NOT NULL,
	
	CONSTRAINT pk_perfiles PRIMARY KEY(_id),

	CONSTRAINT uq_perfiles_tipo UNIQUE(tipo)
);

DROP TABLE IF EXISTS usuarios CASCADE;
CREATE TABLE usuarios(
	_id SERIAL NOT NULL,
	nombre_completo VARCHAR(40) NOT NULL,
	alias_ VARCHAR(25),
	rut VARCHAR(15) NOT NULL,
	telefono VARCHAR(11) NOT NULL,
	email VARCHAR(40),
	contraseña VARCHAR(60),
	id_perfil SERIAL NOT NULL,
	
	CONSTRAINT pk_usuarios PRIMARY KEY(_id),
	
	CONSTRAINT uq_usuarios_alias UNIQUE(alias_),
	CONSTRAINT uq_usuarios_rut UNIQUE(rut),
	CONSTRAINT uq_usuarios_telefono UNIQUE(telefono),

	CONSTRAINT fk_usuarios_perfiles FOREIGN KEY(id_perfil)
	REFERENCES perfiles(_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

DROP TABLE IF EXISTS recintos CASCADE;
CREATE TABLE recintos(
	_id SERIAL NOT NULL,
	nombre VARCHAR(25) NOT NULL,
	direccion VARCHAR(100) NOT NULL,
	
	CONSTRAINT pk_recintos PRIMARY KEY(_id),

	CONSTRAINT uq_recintos_nombre UNIQUE(nombre)
);

DROP TABLE IF EXISTS servicios CASCADE;
CREATE TABLE servicios(
	_id SERIAL NOT NULL,
	nombre VARCHAR(25) NOT NULL,
	duracion VARCHAR(100) NOT NULL,
	capacidad_bloque INT NOT NULL,
	valor_base INT NOT NULL,
	id_recinto SERIAL NOT NULL,
	
	CONSTRAINT pk_servicios PRIMARY KEY(_id),
	
	CONSTRAINT fk_servicios_recintos FOREIGN KEY(id_recinto)
	REFERENCES recintos(_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

DROP TABLE IF EXISTS bloques_horario CASCADE;
CREATE TABLE bloques_horarios(
	_id SERIAL NOT NULL,
	fecha DATE NOT NULL,
	hora_inicio TIME NOT NULL,
	hora_termino TIME NOT NULL,
	disponible BOOLEAN NOT NULL,
	valor INT NOT NULL,
	id_servicio SERIAL NOT NULL,
	
	CONSTRAINT pk_bloques_horarios PRIMARY KEY(_id),
	
	CONSTRAINT fk_bloquesHorarios_servicios FOREIGN KEY(id_servicio)
	REFERENCES servicios(_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

DROP TABLE IF EXISTS reservas CASCADE;
CREATE TABLE reservas(
	_id SERIAL NOT NULL,
	fecha_reserva DATE NOT NULL,
	valor INT NOT NULL,
	id_usuario SERIAL NOT NULL,
	id_bloqueHorario SERIAL NOT NULL,
	
	CONSTRAINT pk_reservas PRIMARY KEY(_id),
	
	CONSTRAINT fk_reservas_usuarios FOREIGN KEY(id_usuario)
	REFERENCES usuarios(_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	
	CONSTRAINT fk_reservas_bloquesHorarios FOREIGN KEY(id_bloqueHorario)
	REFERENCES bloques_horarios(_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

---------------------------- Inserción de Perfiles ----------------------------

INSERT INTO perfiles(tipo)
VALUES ('Administrador'), ('Cliente'), ('Recepcionista');

---------------------------- sssssssssssssssss ----------------------------