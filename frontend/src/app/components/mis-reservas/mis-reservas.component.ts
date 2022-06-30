import { Component, OnInit } from '@angular/core';

import { Reserva } from 'src/app/interfaces/reserva';

import { ReservaService } from 'src/app/services/reserva/reserva.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

declare var window:any;

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.scss']
})
export class MisReservasComponent implements OnInit {
  modal: any;

  reservas:Array<Reserva> = [];

  reservaActual!: Reserva;

  idCliente!:number;

  constructor(private servicioReserva:ReservaService, private servicioUsuario:UsuarioService) {
    let usuarioActual = {
      email: this.servicioUsuario.getUsuarioLocalStorage()
    }

    this.servicioUsuario.obtenerIdConEmail(usuarioActual).subscribe(rta=>{
      this.idCliente = rta._id;
      this.actualizarReservas(rta._id);
    })
  }

  actualizarReservas(idCliente: number) {
    this.servicioReserva.obtenerReservasDeCliente(idCliente).subscribe(rta=>{
      this.reservas = rta;
    })
  }

  ngOnInit(): void {
  }

    // Funciones modal Reservas
  // Cancelar Reserva
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
        this.actualizarReservas(this.idCliente);
        this.close();
      }
    })
  }

  // Extra
  close() {
    this.modal.hide();
  }

}
