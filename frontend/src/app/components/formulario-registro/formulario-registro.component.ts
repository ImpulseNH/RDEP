import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent implements OnInit {

  formulario:FormGroup;
  registro:boolean=false;
  constructor(private fb:FormBuilder, private servicioUsuario:UsuarioService, private router:Router) {
    this.formulario=this.fb.group({
      rut:['',[Validators.required, Validators.pattern('[0-9]{7,8}-[kK|0-9]{1}')]],
      nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      alias:['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email:['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefono:['', [Validators.required, Validators.minLength(1), Validators.maxLength(9)]],
      clave:['', [Validators.required,Validators.minLength(3), Validators.maxLength(100)]],
      
    });
  }

  ngOnInit(): void {
  }

  validar(){
    let datos = {
      nombre_completo: this.formulario.controls['nombre'].value,
      alias: this.formulario.controls['alias'].value,
      rut: this.formulario.controls['rut'].value,
      telefono: this.formulario.controls['telefono'].value,
      email: this.formulario.controls['email'].value,
      contraseña: this.formulario.controls['clave'].value,
      perfil: "Cliente"
    }
    
    console.log(datos)

    if (this.formulario.valid) {
      this.servicioUsuario.registrarUsuario(datos).subscribe(rta=>{
        if(rta == true)
          this.registro = true;
        else
          alert("Error")
      })
    }
    
  }
}