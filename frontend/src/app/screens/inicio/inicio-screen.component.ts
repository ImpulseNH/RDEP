import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-inicio-screen',
  templateUrl: './inicio-screen.component.html',
  styleUrls: ['./inicio-screen.component.scss']
})
export class inicioScreenComponent implements OnInit {
  login:boolean=false;

  formulario:FormGroup;
  registro:boolean=false;
  constructor(private fb:FormBuilder, private router:Router, private servicioUsuario:UsuarioService) {
    this.formulario=this.fb.group({
      nombre:['', [Validators.required]],
      email:['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefono:['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  ngOnInit(): void {
  }

  reservar() {
  }
  
  validar(){
    if (this.formulario.valid){
      this.registro=true
    }
  }
}
