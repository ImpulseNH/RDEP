import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';

import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-formulario-agregar-cliente',
  templateUrl: './formulario-agregar-cliente.component.html',
  styleUrls: ['./formulario-agregar-cliente.component.scss']
})
export class FormularioAgregarClienteComponent implements OnInit {

  formulario:FormGroup;
  registro:boolean=false;
  accede:boolean=false;

  constructor(private fb:FormBuilder, private servicioUsuario:UsuarioService, private router:Router) {
    this.formulario=this.fb.group({
      rut:['',[Validators.required, Validators.pattern('[0-9]{7,8}-[kK|0-9]{1}')]],
      nombre:['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      alias:['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email:['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefono:['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  ngOnInit(): void {
  }

  validar(){    
    let cliente: Cliente =  {
      rut: this.formulario.controls['rut'].value,
      nombre_completo: this.formulario.controls['nombre'].value,
      alias_: this.formulario.controls['alias'].value,
      telefono: this.formulario.controls['telefono'].value,
      email: this.formulario.controls['email'].value,
      contraseña: Math.random().toString(36).slice(-8),
      perfil: "Cliente"
    }

    console.log("La contraseña generada es: " + cliente.contraseña);
    
    this.servicioUsuario.registrarUsuario(cliente).subscribe(rta=>{
      if(rta == true)
        this.registro = true;
      else
        alert("Error")
    })
  }

  requiereAcceso(){
    this.accede=true
  }

  noRequiereAcceso(){
    this.accede=false
  }
}
