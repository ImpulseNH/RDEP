import { Component, OnInit } from '@angular/core';
import { Bloque } from 'src/app/interfaces/bloque';
import { Recinto } from 'src/app/interfaces/recinto';
import { Servicio } from 'src/app/interfaces/servicio';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { RecintoService } from 'src/app/services/recinto/recinto.service';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { BloqueService } from 'src/app/services/bloque/bloque.service';
import { ReservaService } from 'src/app/services/reserva/reserva.service'

declare var window:any;

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {
  modal: any;

  recintos:Array<Recinto> = [];
  servicios_recinto:Array<Servicio> = [];
  bloques_servicio:Array<Bloque> = [];

  recinto_seleccionado!: Recinto;
  servicio_seleccionado!: Servicio;
  fecha_seleccionada!: Date;

  bloqueActual!: Bloque;

  constructor(private servicioUsuario:UsuarioService,
              private servicioRecinto:RecintoService,
              private servicioServicio:ServicioService,
              private servicioBloque:BloqueService,
              private servicioReserva:ReservaService) {
    this.actualizarRecintos();
  }

  ngOnInit(): void {
    
  }

  // Actualización de datos
  // Recintos

  actualizarRecintos() {
    this.servicioRecinto.obtenerRecintos().subscribe(rta=>{
      this.recintos = rta;
    })
  }

  // Servicios
  actualizarServicios(idRecinto: number) {
    this.servicioServicio.obtenerServiciosDeRecinto(idRecinto).subscribe(rta=>{
      this.servicios_recinto = rta;
    })
  }

  // Bloques de Horarios
  actualizarBloques(idServicio: number) {
    this.servicioBloque.obtenerBloquesDeServicio(idServicio).subscribe(rta=>{
      this.bloques_servicio = rta;
    })
  }

  // Detección de cambios

  selectRecinto(recinto: Recinto) {
    this.recinto_seleccionado = recinto;
    this.actualizarServicios(this.recinto_seleccionado._id);
  }

  selectServicio(servicio: Servicio) {
    this.servicio_seleccionado = servicio;
    this.actualizarBloques(this.servicio_seleccionado._id);
  }

  dateChanged(date: any) {
    this.fecha_seleccionada = date.value;
  }

  compararFechas(fechaBloque: Date) {
    const date1 = new Date(fechaBloque).getTime();
    const date2 = new Date(this.fecha_seleccionada).getTime();
    return date1 == date2;
  }

  // Funciones modal Reserva
  // Reservar
  modalReservar(bloque: Bloque) {
    this.modal = new window.bootstrap.Modal(
      document.getElementById("modalReservar")
    );
    this.bloqueActual = bloque;
    this.modal.show();
  }

  confirmarReserva() {
    let usuarioActual = {
      email: this.servicioUsuario.getUsuarioLocalStorage()
    }

    this.servicioUsuario.obtenerIdConEmail(usuarioActual).subscribe(rta=>{
      let reserva = {
        fecha_reserva: new Date(),
        valor: this.bloqueActual.valor,
        id_usuario: rta._id,
        id_bloque: this.bloqueActual._id
      }

      this.servicioReserva.agregarReserva(reserva).subscribe(rta=>{
        if(rta == true) {
          let datos = {
            disponible: false
          }
          this.servicioBloque.cambiarDisponibilidadBloque(this.bloqueActual._id, datos).subscribe(rta=>{
            if(rta == true) {
              this.actualizarBloques(this.servicio_seleccionado._id);
              this.modal.hide();
            }
            else
              alert("Error");
          });
        }
      })
    })
  }

  close() {
    this.modal.hide();
  }
}
