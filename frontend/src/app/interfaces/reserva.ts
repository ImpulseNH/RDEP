export interface Reserva {
    _id: number;
    nombre_servicio: string,
    fecha: Date,
    hora_inicio: string,
    hora_termino: string,
    valor: number,
    nombre_completo: string,
    id_recinto: number,
    nombre_recinto: string,
    id_servicio: number
}