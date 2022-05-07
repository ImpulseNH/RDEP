import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.scss']
})
export class FormularioLoginComponent implements OnInit {

  formulario:FormGroup;
  registro:boolean=false;
  constructor(private fb:FormBuilder,  private router:Router) {
    this.formulario=this.fb.group({
      email:['', [Validators.required, Validators.email]],
      clave:['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  validar(){

  }
}
