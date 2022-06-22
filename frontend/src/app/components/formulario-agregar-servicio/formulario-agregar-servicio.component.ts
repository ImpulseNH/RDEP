import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recinto } from 'src/app/interfaces/recinto';

import { RecintoService } from 'src/app/services/recinto/recinto.service';
import { ServicioService } from 'src/app/services/servicio/servicio.service';

@Component({
  selector: 'app-formulario-agregar-servicio',
  templateUrl: './formulario-agregar-servicio.component.html',
  styleUrls: ['./formulario-agregar-servicio.component.scss']
})
export class FormularioAgregarServicioComponent implements OnInit {

  recintos:Array<Recinto> = [];

  formulario:FormGroup;
  registro:boolean=false;
  dias = [{ dia: 'Lunes' },
          { dia: 'Martes' },
          { dia: 'Miércoles' },
          { dia: 'Jueves' },
          { dia: 'Viernes' },
          { dia: 'Sábado' },
          { dia: 'Domingo' }]

  numberRegEx = /\-?\d*\.?\d{1,2}/;

  constructor(private fb:FormBuilder, private router:Router, private servicioRecinto:RecintoService, private servicioServicio:ServicioService) {
    this.formulario=this.fb.group({
      recinto:['',[Validators.required]],
      nombre:['',[Validators.required, Validators.minLength(3)]],
      duracion:['',[Validators.required]],
      capacidad_bloque:['',[Validators.required]],
      diasSeleccionados: this.fb.array([]),
      valor_base:['',[Validators.required, Validators.pattern(this.numberRegEx)]]
    });

    this.servicioRecinto.obtenerRecintos().subscribe(rta=>{
      this.recintos = rta;
    })
  }

  ngOnInit(): void {
  }

  onChange(dia: string, event: Event) {
    const diasFormArray = <FormArray>this.formulario.controls.diasSeleccionados;

    const isChecked = (<HTMLInputElement>event.target).checked;
    if (isChecked) {
      diasFormArray.push(new FormControl(dia));
    } else {
      let index = diasFormArray.controls.findIndex(x => x.value == dia)
      diasFormArray.removeAt(index);
    }
  }

  validar(){
    let servicio = {
      nombre: this.formulario.controls['nombre'].value,
      duracion: this.formulario.controls['duracion'].value,
      capacidad_bloque: this.formulario.controls['capacidad_bloque'].value,
      valor_base: this.formulario.controls['valor_base'].value,
      nombre_recinto: this.formulario.controls['recinto'].value
    }

    if (this.formulario.valid) {
      this.servicioServicio.agregarServicio(servicio).subscribe(rta=>{
        if(rta == true)
          this.registro = true;
        else
          alert("Error")
      })
    }
  }
}
