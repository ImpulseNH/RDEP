import { Time } from "@angular/common"

export interface Bloque {
    _id: number,
    fecha: Date,
    hora_inicio: Time,
    hora_termino: Time,
    disponible: boolean,
    valor: number,
    id_servicio: number
  }