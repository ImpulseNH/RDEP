import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { Recinto } from 'src/app/interfaces/recinto';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { RecintoService } from '../../services/recinto/recinto.service';

@Component({
  selector: 'app-barra-lateral-admin',
  templateUrl: './barra-lateral-admin.component.html',
  styleUrls: ['./barra-lateral-admin.component.scss']
})
export class BarraLateralAdminComponent implements OnInit {

  clientes:Array<Cliente> = [];
  recintos:Array<Recinto> = [];

  constructor(private servicioUsuario:UsuarioService, private servicioRecinto:RecintoService) {
    servicioUsuario.getClientes().subscribe(rta=>{
      this.clientes = rta;
    });
    servicioRecinto.getRecintos().subscribe(rta=>{
      this.recintos = rta;
    })
  }

  ngOnInit(): void {
  }

  onCreate() {
  }
}
