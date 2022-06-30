import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recinto } from 'src/app/interfaces/recinto';
import { Servicio } from 'src/app/interfaces/servicio';
import { Dia } from 'src/app/interfaces/dia';
import { Reserva } from 'src/app/interfaces/reserva';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { RecintoService } from 'src/app/services/recinto/recinto.service';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { ReservaService } from 'src/app/services/reserva/reserva.service'
import { DiaService } from 'src/app/services/dia/dia.service'

declare var window:any;

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservasComponent implements OnInit {
  modal: any;

  reservas:Array<Reserva> = [];

  recintos:Array<Recinto> = [];
  servicios_recinto:Array<Servicio> = [];
  capacidad_bloque:Array<Number> = [];
  dias_servicio:Array<Dia> = [];
  dias_validos:Array<number> = [];
  horario:Array<string> = [];

  recinto_seleccionado!: Recinto;
  servicio_seleccionado!: Servicio;
  fecha_seleccionada!: Date;
  dia_seleccionado: Dia | undefined;
  hora_inicio_seleccionada!: string;
  hora_termino_seleccionada!: string;
  bloque_seleccionado!: number;

  minDate = new Date();
  dateFilter: (date: Date | null) => boolean =
  (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day == this.dias_validos[0] ||
           day == this.dias_validos[1] ||
           day == this.dias_validos[2] ||
           day == this.dias_validos[3] ||
           day == this.dias_validos[4] ||
           day == this.dias_validos[5] ||
           day == this.dias_validos[6];
  };

  constructor(private servicioUsuario:UsuarioService,
              private servicioRecinto:RecintoService,
              private servicioServicio:ServicioService,
              private servicioReserva:ReservaService,
              private servicioDia:DiaService,
              private router:Router) {
    this.actualizarReservas();
    this.actualizarRecintos();
  }

  ngOnInit(): void {
    
  }

  // Actualización de datos
  // Reservas
  actualizarReservas() {
    this.servicioReserva.obtenerReservas().subscribe(rta=>{
      this.reservas = rta;
    })
  }

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

  // Dias de servicio
  actualizarDias(servicio: Servicio) {
    this.servicioDia.obtenerDiasDeServicio(servicio._id).subscribe(rta=>{
      this.dias_servicio = rta;

      this.dias_validos = [];
      rta.forEach((dia: { dia: string; }) => {
        if(dia.dia == "Lunes")
          this.dias_validos[1] = 1;
        if(dia.dia == "Martes")
          this.dias_validos[2] = 2;
        if(dia.dia == "Miércoles")
          this.dias_validos[3] = 3;
        if(dia.dia == "Jueves")
          this.dias_validos[4] = 4;
        if(dia.dia == "Viernes")
          this.dias_validos[5] = 5;
        if(dia.dia == "Sábado")
          this.dias_validos[6] = 6;
        if(dia.dia == "Domingo")
          this.dias_validos[0] = 0;
      });
      this.dias_validos.sort();
    })
  }

  // Dia seleccionado
  actualizarDia(dia: Date) {
    switch(dia.getDay()) {
      case 0: {
        this.dia_seleccionado = this.dias_servicio.find(x => x.dia === "Domingo");
        break;
      } 
      case 1: { 
        this.dia_seleccionado = this.dias_servicio.find(x => x.dia === "Lunes");
        break; 
      }
      case 2: {
        this.dia_seleccionado = this.dias_servicio.find(x => x.dia === "Martes");
        break;
      }
      case 3: {
        this.dia_seleccionado = this.dias_servicio.find(x => x.dia === "Miércoles");
        break;
      }
      case 4: {
        this.dia_seleccionado = this.dias_servicio.find(x => x.dia === "Jueves");
        break;
      }
      case 5: {
        this.dia_seleccionado = this.dias_servicio.find(x => x.dia === "Viernes");
        break;
      }
      case 6: {
        this.dia_seleccionado = this.dias_servicio.find(x => x.dia === "Sábado");
        break;
      }
   }
  }

  // Agenda
  actualizarHorario() {
    let horaInicial = String(this.dia_seleccionado?.hora_inicio).slice(0,-3);
    let horaTerminal = String(this.dia_seleccionado?.hora_termino.slice(0,-3));
    let i = horaInicial;

    this.horario = [];

    while(i < horaTerminal && i >= horaInicial) {
      this.horario.push(i);
      i = this.calcularSiguienteBloque(i);
    }
  }

  calcularSiguienteBloque(horaActual: string) {
    return new Date(new Date("1970/01/01 " + horaActual).getTime() + this.servicio_seleccionado.duracion * 60000).toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  // Detección de cambios

  selectRecinto(recinto: Recinto) {
    this.recinto_seleccionado = recinto;
    this.actualizarServicios(this.recinto_seleccionado._id);
  }

  selectServicio(servicio: Servicio) {
    this.servicio_seleccionado = servicio;
    this.actualizarDias(this.servicio_seleccionado);
    this.capacidad_bloque = new Array(this.servicio_seleccionado.capacidad_bloque);
    this.horario = [];
  }

  dateChanged(date: any) {
    this.fecha_seleccionada = date.value;
    this.actualizarDia(date.value);
    this.actualizarHorario();
  }

  compararFechas(fechaBloque: Date) {
    const date1 = new Date(fechaBloque).getTime();
    const date2 = new Date(this.fecha_seleccionada).getTime();
    return date1 == date2;
  }

  existeReserva(hora:string, i:number) {
    let bloqueActual = {
      hora_inicio: hora,
      hora_termino: this.calcularSiguienteBloque(hora),
      id_recinto: this.recinto_seleccionado._id,
      id_servicio: this.servicio_seleccionado._id,
      nombre_servicio: this.servicio_seleccionado.nombre + ' ' + i
    }

    var existe = null;
    existe = this.reservas.find(reserva =>
      this.compararFechas(reserva.fecha) &&
      reserva.hora_inicio.slice(0,-3) == bloqueActual.hora_inicio &&
      reserva.hora_termino.slice(0,-3) == bloqueActual.hora_termino &&
      reserva.id_recinto == bloqueActual.id_recinto &&
      reserva.id_servicio == bloqueActual.id_servicio &&
      reserva.nombre_servicio == bloqueActual.nombre_servicio);

    if(existe)
      return true;
    else
      return false;
  }

  // Funciones modal Reserva
  // Reservar
  modalReservar(hora:string, i:number) {
    this.hora_inicio_seleccionada = hora;
    this.hora_termino_seleccionada = this.calcularSiguienteBloque(hora);
    this.bloque_seleccionado = i;
    this.modal = new window.bootstrap.Modal(
      document.getElementById("modalReservar")
    );
    this.modal.show();
  }

  confirmarReserva() {
    let usuarioActual = {
      email: this.servicioUsuario.getUsuarioLocalStorage()
    }

    this.servicioUsuario.obtenerIdConEmail(usuarioActual).subscribe(rta=>{
      let reserva = {
        nombre_servicio: this.servicio_seleccionado.nombre + ' ' + this.bloque_seleccionado,
        fecha: this.fecha_seleccionada,
        hora_inicio: this.hora_inicio_seleccionada,
        hora_termino: this.hora_termino_seleccionada,
        valor: this.servicio_seleccionado.valor_base,
        id_usuario: rta._id,
        id_recinto: this.recinto_seleccionado._id,
        id_servicio: this.servicio_seleccionado._id
      }

      this.servicioReserva.agregarReserva(reserva).subscribe(rta=>{
        if(rta == true) {
          this.actualizarReservas();
          this.close();
          this.modalReservaRealizada();
        }
      })
    })
  }

  modalReservaRealizada() {
    this.modal = new window.bootstrap.Modal(
      document.getElementById("modalReservaRealizada")
    );
    this.modal.show();
  }

  irReservas() {
    this.close();
    this.router.navigate(['/mis-reservas']);
  }

  close() {
    this.modal.hide();
  }
}