import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-screen',
  templateUrl: './inicio-screen.component.html',
  styleUrls: ['./inicio-screen.component.scss']
})
export class inicioScreenComponent implements OnInit {

  formulario:FormGroup;
  registro:boolean=false;
  accede:boolean=false;
  constructor(private fb:FormBuilder,  private router:Router) {
    this.formulario=this.fb.group({
      nombre:['', [Validators.required]],
      email:['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      telefono:['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  ngOnInit(): void {
  }
  validar(){
    if (this.formulario.valid){
      this.registro=true
    }
  }
}
