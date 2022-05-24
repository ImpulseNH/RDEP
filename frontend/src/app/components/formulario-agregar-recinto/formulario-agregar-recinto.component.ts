import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ListaRecintos, Recinto } from 'src/app/interfaces/recinto';

@Component({
  selector: 'app-formulario-agregar-recinto',
  templateUrl:'./formulario-agregar-recinto.component.html',
  styleUrls: ['./formulario-agregar-recinto.component.scss']
})
export class FormularioAgregarRecintoComponent implements OnInit {

  formulario: FormGroup;
  registro:boolean=false;
  nombre:any;
  direccion:any;
  lista:Array<any> = ListaRecintos;
  constructor(private fb:FormBuilder,  private router:Router) {
    this.formulario=this.fb.group({

      nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      direccion:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });


  }

  ngOnInit(): void {
  }
  validar(){
    console.log(this.formulario.get("nombre")?.value);
    console.log(this.formulario.get("direccion")?.value);
    let recinto: Recinto =  {
      nombre: this.formulario.controls['nombre'].value,
      direccion: this.formulario.controls['direccion'].value
    }
    ListaRecintos.push(recinto);
    if (this.formulario.valid){
      this.registro=true
    }
  }
} 

