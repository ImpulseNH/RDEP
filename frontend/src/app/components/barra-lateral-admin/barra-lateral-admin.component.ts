import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-lateral-admin',
  templateUrl: './barra-lateral-admin.component.html',
  styleUrls: ['./barra-lateral-admin.component.scss']
})
export class BarraLateralAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  clientes = [
    {
    id: 1,
    nombre: "esteban",
    alias: "estebandido",
    rut: "12345678-9",
    telefono: "995995959",
    email: "abc@gmail.com",
    perfil: 1
    },
    {
    id: 2,
    nombre: "carlos",
    alias: "carlitos",
    rut: "12222222-9",
    telefono: "969696969",
    email: "blabla@gmail.com",
    perfil: 1
    },
    {
    id: 3,
    nombre: "priscilla",
    alias: "pri",
    rut: "13098098-9",
    telefono: "912312342",
    email: "etc@gmail.com",
    perfil: 1
    },{
    id: 4,
    nombre: "monserrat",
    alias: "monse",
    rut: "19334358-5",
    telefono: "985209523",
    email: "ejemplo@gmail.com",
    perfil: 1
    }
  ]

  servicios = [
    {
    id: 1,
    nombre: "tenis",
    duracion: 60,
    capacidad_bloque: 1,
    valor_base: "5000",
    },
    {
    id: 2,
    nombre: "futbol",
    duracion: 90,
    capacidad_bloque: 5,
    valor_base: "7500",
    },
    {
    id: 3,
    nombre: "Voleyball",
    duracion: 45,
    capacidad_bloque: 3,
    valor_base: "8750",
    },
  ]

  recintos = [
    {
    id: 1,
    nombre: "San Miguel de Cafe",
    direccion: "Av. SiempreViva 123"
    },
    {
    id: 2,
    nombre: "Deportes Ticulo FC",
    direccion: "Avda. Ejército Libertador 171"
    },
  ]

  onCreate() {
    
  }
}
