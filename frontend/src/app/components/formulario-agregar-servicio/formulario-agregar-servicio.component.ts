import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-agregar-servicio',
  templateUrl: './formulario-agregar-servicio.component.html',
  styleUrls: ['./formulario-agregar-servicio.component.scss']
})
export class FormularioAgregarServicioComponent implements OnInit {

  formulario:FormGroup;
  registro:boolean=false;
  dias = [{ dia: 'Lunes' },
          { dia: 'Martes' },
          { dia: 'Miércoles' },
          { dia: 'Jueves' },
          { dia: 'Viernes' },
          { dia: 'Sábado' },
          { dia: 'Domingo' }]
  time: string="";

  constructor(private fb:FormBuilder, private router:Router) {
    this.formulario=this.fb.group({
      diasSeleccionados: this.fb.array([])
    });
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

  }
}
