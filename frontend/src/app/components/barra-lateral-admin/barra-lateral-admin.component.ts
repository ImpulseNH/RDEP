import { Component, OnInit } from '@angular/core';
import { Cliente, ListaClientes } from 'src/app/interfaces/cliente';
import { ListaRecintos, Recinto } from 'src/app/interfaces/recinto';

@Component({
  selector: 'app-barra-lateral-admin',
  templateUrl: './barra-lateral-admin.component.html',
  styleUrls: ['./barra-lateral-admin.component.scss']
})
export class BarraLateralAdminComponent implements OnInit {

  constructor() { }

  Recintos:Array<Recinto>=ListaRecintos;
  Clientes: Array<Cliente>=ListaClientes;

  ngOnInit(): void {
  }

  onCreate() {
  }
}
