import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent implements OnInit {

  formulario:FormGroup;
  registro:boolean=false;
  constructor(private fb:FormBuilder,  private router:Router) {
    this.formulario=this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email:['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefono:['', [Validators.required, Validators.minLength(1), Validators.maxLength(9)]],
      clave:['', [Validators.required,Validators.minLength(3), Validators.maxLength(100)]],
      biografia:['',[Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
  }
  validar(){
    console.log(this.formulario.get("nombre")?.value);
    
    this.registro=true;
  }
}
