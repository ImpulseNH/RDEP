import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  servicios = [
    {id: 1, nombre: "tenis", duracion: 60, capacidad_bloque: 5, valor: 5000},
    {id: 2, nombre: "futbol", duracion: 90, capacidad_bloque: 1, valor: 10000}
  ]

  recintos = [
    {id: 1, nombre:"Recinto Santa Juana", direccion:"Av. 123", Servicios: [
      {id: 1, nombre: "tenis", duracion: 60, capacidad_bloque: 5, valor: 5000},
      {id: 2, nombre: "futbol", duracion: 90, capacidad_bloque: 1, valor: 10000}]
    },
    {id: 2, nombre:"Recinto Maravilla", direccion:"Calle ejemplo 6314", Servicios:[
      {id: 1, nombre: "tenis", duracion: 60, capacidad_bloque: 5, valor: 5000}]
    }
  ]

  dateChanged($event: any) {
    console.log($event.target.value)
  }

  recinto_seleccionado = this.recintos[0]
  servicio_seleccionado = this.servicios[0]
  

}
