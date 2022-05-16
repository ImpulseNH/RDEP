import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-agregar-recinto',
  templateUrl:'./formulario-agregar-recinto.component.html',
  styleUrls: ['./formulario-agregar-recinto.component.scss']
})
export class FormularioAgregarRecintoComponent implements OnInit {

  formulario: FormGroup;
  registro:boolean=false;
  constructor(private fb:FormBuilder,  private router:Router) {
    this.formulario=this.fb.group({
      //rut:["",[Validators.required, Validators.pattern("{8}-[\dkK]")]],
      nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      direccion:['', [Validators.required, Validators.maxLength(100)]],
    });


  }

  ngOnInit(): void {
  }
  validar(){
    console.log(this.formulario.get("nombre")?.value);
    
    this.registro=true
  }

} 

