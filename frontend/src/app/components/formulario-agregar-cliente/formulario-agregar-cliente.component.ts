import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente, ListaClientes } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-formulario-agregar-cliente',
  templateUrl: './formulario-agregar-cliente.component.html',
  styleUrls: ['./formulario-agregar-cliente.component.scss']
})
export class FormularioAgregarClienteComponent implements OnInit {

  formulario:FormGroup;
  registro:boolean=false;
  accede:boolean=false;
  constructor(private fb:FormBuilder,  private router:Router) {
    this.formulario=this.fb.group({
      //rut:["",[Validators.required, Validators.pattern("{8}-[\dkK]")]],
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
    let cliente: Cliente =  {
      rut: this.formulario.controls['rut'].value,
      nombrecompleto: this.formulario.controls['nombre'].value,
      alias: this.formulario.controls['alias'].value,
      telefono: this.formulario.controls['telefono'].value,
      correo: this.formulario.controls['email'].value,
      contrasena: this.formulario.controls['clave'].value,

    }
    ListaClientes.push(cliente);


    this.registro=true

  }
  acceder(){
    this.accede=true
  }

}
