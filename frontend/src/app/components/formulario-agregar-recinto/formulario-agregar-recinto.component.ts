import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RecintoService } from '../../services/recinto/recinto.service';

@Component({
  selector: 'app-formulario-agregar-recinto',
  templateUrl:'./formulario-agregar-recinto.component.html',
  styleUrls: ['./formulario-agregar-recinto.component.scss']
})
export class FormularioAgregarRecintoComponent implements OnInit {

  formulario: FormGroup;
  registro:boolean=false;

  constructor(private fb:FormBuilder, private servicioRecinto:RecintoService, private router:Router) {
    this.formulario=this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      direccion:['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    });


  }

  ngOnInit(): void {

  }

  validar(){
    let recinto = {
      nombre_recinto: this.formulario.controls['nombre'].value,
      direccion: this.formulario.controls['direccion'].value
    }
    
    this.servicioRecinto.agregarRecinto(recinto).subscribe(rta=>{
      if(rta == true)
        this.registro = true;
      else
        alert("Error")
    })
  }
}