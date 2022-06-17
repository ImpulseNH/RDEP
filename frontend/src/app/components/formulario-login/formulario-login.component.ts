import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.scss']
})
export class FormularioLoginComponent implements OnInit {

  formulario:FormGroup;
  registro:boolean=false;
  constructor(private fb:FormBuilder, private servicioUsuario:UsuarioService, private router:Router) {
    this.formulario=this.fb.group({
      email:['', [Validators.required, Validators.email]],
      clave:['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }
  
  validar(){
    let datos = {
      email: this.formulario.controls['email'].value,
      contraseña: this.formulario.controls['clave'].value
    }

    this.servicioUsuario.login(datos).subscribe(rta=>{
      if(rta == true) {
        this.servicioUsuario.saveUsuarioLocalStorage(datos.email);
        this.servicioUsuario.sendLoginData(true);

        this.servicioUsuario.isAdmin(datos).subscribe(rta=>{
          if(rta == true)
            this.router.navigate(['/admin']);
          else
            this.router.navigate(['/inicio']);
        })
      }
      else
        alert("Error");
    })
  }
}
