import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Recinto } from 'src/app/interfaces/recinto';
import { Servicio } from 'src/app/interfaces/servicio';
import { Dia } from 'src/app/interfaces/dia';
import { Reserva } from 'src/app/interfaces/reserva';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { RecintoService } from '../../services/recinto/recinto.service';
import { ServicioService } from '../../services/servicio/servicio.service';
import { DiaService } from 'src/app/services/dia/dia.service';
import { ReservaService } from 'src/app/services/reserva/reserva.service';

declare var window:any;

@Component({
  selector: 'app-barra-lateral-admin',
  templateUrl: './barra-lateral-admin.component.html',
  styleUrls: ['./barra-lateral-admin.component.scss']
})
export class BarraLateralAdminComponent implements OnInit {
  modal: any;

  reservas:Array<Reserva> = [];

  clientes:Array<Usuario> = [];
  recintos:Array<Recinto> = [];
  servicios:Array<Servicio> = [];
  dias:Array<Dia> = [];

  clienteActual!: Usuario;
  recintoActual!: Recinto;
  servicioActual!: Servicio;
  reservaActual!: Reserva;

  constructor(private servicioUsuario:UsuarioService,
              private servicioRecinto:RecintoService,
              private servicioServicio:ServicioService,
              private servicioDia:DiaService,
              private servicioReserva:ReservaService) {
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

    // Días
    this.servicioDia.obtenerDias().subscribe(rta=>{
      this.dias = rta;
    })

    this.servicioReserva.obtenerReservas().subscribe(rta=>{
      this.reservas = rta;
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
        this.close();
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
        this.close();
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
        this.close();
      }
    })
  }

  // Eliminar Reserva
  modalCancelarReserva(reserva: Reserva) {
    this.modal = new window.bootstrap.Modal(
      document.getElementById("modalCancelarReserva")
    );
    this.reservaActual = reserva;
    this.modal.show();
  }

  confirmarCancelarReserva() {
    this.servicioReserva.cancelarReserva(this.reservaActual._id).subscribe(rta=>{
      if(rta == true) {
        this.actualizarDatos();
        this.close();
      }
    })
  }

  // Extra

  close() {
    this.modal.hide();
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
