import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario/usuario.service';

declare var window:any;

@Component({
  selector: 'app-formulario-agregar-cliente',
  templateUrl: './formulario-agregar-cliente.component.html',
  styleUrls: ['./formulario-agregar-cliente.component.scss']
})
export class FormularioAgregarClienteComponent implements OnInit {
  modal: any;

  formulario:FormGroup;
  registro:boolean=false;
  accede:boolean=false;

  constructor(private fb:FormBuilder, private servicioUsuario:UsuarioService, private router:Router) {
    this.formulario=this.fb.group({
      rut:['',[Validators.required, Validators.pattern('[0-9]{7,8}-[kK|0-9]{1}')]],
      nombre:['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      alias:['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email:['', [Validators.email, Validators.maxLength(100)]],
      telefono:['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      acceso:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  validar(){    
    let cliente =  {
      rut: this.formulario.controls['rut'].value,
      nombre_completo: this.formulario.controls['nombre'].value,
      alias_: this.formulario.controls['alias'].value,
      telefono: this.formulario.controls['telefono'].value,
      email: this.formulario.controls['email'].value,
      contraseña: Math.random().toString(36).slice(-8),
      perfil: "Cliente"
    }
    
    this.servicioUsuario.registrarUsuario(cliente).subscribe(
      rta=>{
        if(rta == true) {
          this.registro = true;
          console.log("La contraseña generada es: " + cliente.contraseña);
        }
    }, error=>{
      this.modal = new window.bootstrap.Modal(
        document.getElementById("modalError")
      );
      this.modal.show();
    })
  }

  requiereAcceso(){
    this.accede=true
  }

  noRequiereAcceso(){
    this.accede=false
  }

  close() {
    this.modal.hide();
  }
}