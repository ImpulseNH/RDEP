import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Recinto } from 'src/app/interfaces/recinto';
import { Servicio } from 'src/app/interfaces/servicio';
import { Bloque } from 'src/app/interfaces/bloque';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { RecintoService } from '../../services/recinto/recinto.service';
import { ServicioService } from '../../services/servicio/servicio.service';
import { BloqueService } from 'src/app/services/bloque/bloque.service';

declare var window:any;

@Component({
  selector: 'app-barra-lateral-admin',
  templateUrl: './barra-lateral-admin.component.html',
  styleUrls: ['./barra-lateral-admin.component.scss']
})
export class BarraLateralAdminComponent implements OnInit {
  modal: any;

  clientes:Array<Usuario> = [];
  recintos:Array<Recinto> = [];
  servicios:Array<Servicio> = [];
  bloques:Array<Bloque> = [];

  clienteActual!: Usuario;
  recintoActual!: Recinto;
  servicioActual!: Servicio;

  constructor(private servicioUsuario:UsuarioService, private servicioRecinto:RecintoService, private servicioServicio:ServicioService, private servicioBloque:BloqueService) {
    this.actualizarDatos();
  }

  ngOnInit(): void {
  }

  onCreate() {
  }

  // Actualización de datos

  actualizarDatos() {
    // Usuarios
    this.servicioUsuario.obtenerClientes().subscribe(rta=>{
      this.clientes = rta;
    });

    // Recintos
    this.servicioRecinto.obtenerRecintos().subscribe(rta=>{
      this.recintos = rta;
    })

    // Servicios
    this.servicioServicio.obtenerServicios().subscribe(rta=>{
      this.servicios = rta;
    })

    // Bloques
    this.servicioBloque.obtenerBloques().subscribe(rta=>{
      this.bloques = rta;
    })
  }

  // Funciones modal Clientes
  // Eliminar Cliente
  modalEliminarCliente(cliente: Usuario) {
    this.modal = new window.bootstrap.Modal(
      document.getElementById("modalEliminarCliente")
    );
    this.clienteActual = cliente;
    this.modal.show();
  }

  confirmarEliminarCliente() {
    this.servicioUsuario.eliminarUsuario(this.clienteActual._id).subscribe(rta=>{
      if(rta == true) {
        this.actualizarDatos();
        this.modal.hide();
      }
    })
  }

  // Funciones modal Recintos
  // Eliminar Recinto
  modalEliminarRecinto(recinto: Recinto) {
    this.modal = new window.bootstrap.Modal(
      document.getElementById("modalEliminarRecinto")
    );
    this.recintoActual = recinto;
    this.modal.show();
  }

  confirmarEliminarRecinto() {
    this.servicioRecinto.eliminarRecinto(this.recintoActual._id).subscribe(rta=>{
      if(rta == true) {
        this.actualizarDatos();
        this.modal.hide();
      }
    })
  }

  // Funciones modal Servicios
  // Eliminar Servicio
  modalEliminarServicio(servicio: Servicio) {
    this.modal = new window.bootstrap.Modal(
      document.getElementById("modalEliminarServicio")
    );
    this.servicioActual = servicio;
    this.modal.show();
  }

  confirmarEliminarServicio() {
    this.servicioServicio.eliminarServicio(this.servicioActual._id).subscribe(rta=>{
      if(rta == true) {
        this.actualizarDatos();
        this.modal.hide();
      }
    })
  }

  close() {
    this.modal.hide();
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
