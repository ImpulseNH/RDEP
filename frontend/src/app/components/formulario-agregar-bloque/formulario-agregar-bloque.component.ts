import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BloqueService } from 'src/app/services/bloque/bloque.service';

@Component({
  selector: 'app-formulario-agregar-bloque',
  templateUrl: './formulario-agregar-bloque.component.html',
  styleUrls: ['./formulario-agregar-bloque.component.scss']
})
export class FormularioAgregarBloqueComponent implements OnInit {
  idServicio!: number;

  formulario: FormGroup;
  registro:boolean=false;

  constructor(private fb:FormBuilder, private servicioBloque:BloqueService, private route:ActivatedRoute) {
    this.formulario=this.fb.group({
      fecha:['', [Validators.required]],
      hora_inicio:['', [Validators.required]],
      hora_termino:['', [Validators.required]],
      valor:['', [Validators.required]]
    });

    this.route.params.subscribe(params => {
      this.idServicio = params['id'];
    })
  }

  ngOnInit(): void {
  }

  validar() {
    let bloque = {
      fecha: this.formulario.controls['fecha'].value,
      hora_inicio: this.formulario.controls['hora_inicio'].value,
      hora_termino: this.formulario.controls['hora_termino'].value,
      disponible: true,
      valor: this.formulario.controls['valor'].value,
      id_servicio: this.idServicio
    }
    
    this.servicioBloque.agregarBloque(bloque).subscribe(rta=>{
      if(rta == true)
        this.registro = true;
      else
        alert("Error")
    })
  }
}
