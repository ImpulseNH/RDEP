import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.scss']
})
export class FormularioContactoComponent implements OnInit {


  formulario:FormGroup;
  registro:boolean=false;
  accede:boolean=false;
  constructor(private fb:FormBuilder,  private router:Router) {
    this.formulario=this.fb.group({
      nombre:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      telefono:['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  validar(){
    console.log(this.formulario.get("nombre")?.value);
    console.log(this.formulario.get("telefono")?.value);
    console.log(this.formulario.get("email")?.value);

    if (this.formulario.valid){
      this.registro=true
    }

  }

}
