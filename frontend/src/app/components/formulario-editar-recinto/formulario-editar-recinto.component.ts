import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RecintoService } from '../../services/recinto/recinto.service';

@Component({
  selector: 'app-formulario-editar-recinto',
  templateUrl: './formulario-editar-recinto.component.html',
  styleUrls: ['./formulario-editar-recinto.component.scss']
})
export class FormularioEditarRecintoComponent implements OnInit {
  idRecinto!: number;

  formulario: FormGroup;
  registro:boolean=false;

  constructor(private fb:FormBuilder, private servicioRecinto:RecintoService, private router:Router, private route:ActivatedRoute) {
    this.formulario=this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      direccion:['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    });

    this.route.params.subscribe(params => {
      this.idRecinto = params['id'];
    })
  }

  ngOnInit(): void {
  }

  validar(){
    let recinto = {
      _id: this.idRecinto,
      nombre_recinto: this.formulario.controls['nombre'].value,
      direccion: this.formulario.controls['direccion'].value
    }
    
    this.servicioRecinto.editarRecinto(recinto).subscribe(rta=>{
      if(rta == true)
        this.registro = true;
      else
        alert("Error")
    })
  }
}