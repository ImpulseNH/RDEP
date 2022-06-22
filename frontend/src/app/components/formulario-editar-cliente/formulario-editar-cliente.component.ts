import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from 'src/app/interfaces/usuario';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-formulario-editar-cliente',
  templateUrl: './formulario-editar-cliente.component.html',
  styleUrls: ['./formulario-editar-cliente.component.scss']
})
export class FormularioEditarClienteComponent implements OnInit {
  idCliente!: number;
  clienteEditando!: Usuario;

  formulario:FormGroup;
  registro:boolean=false;
  accede:boolean=false;

  constructor(private fb:FormBuilder, private servicioUsuario:UsuarioService, private router:Router, private route:ActivatedRoute) {
    this.formulario=this.fb.group({
      rut:['',[Validators.required, Validators.pattern('[0-9]{7,8}-[kK|0-9]{1}')]],
      nombre:['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      alias:['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      telefono:['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    });

    this.route.params.subscribe(params => {
      this.idCliente = params['id'];
    })
  }

  ngOnInit(): void {
    this.servicioUsuario.obtenerUsuario(this.idCliente).subscribe(rta=>{
      this.clienteEditando = rta;
    })
  }

  validar(){    
    let cliente =  {
      _id: this.idCliente,
      rut: this.formulario.controls['rut'].value,
      nombre_completo: this.formulario.controls['nombre'].value,
      alias_: this.formulario.controls['alias'].value,
      telefono: this.formulario.controls['telefono'].value,
      email: this.clienteEditando.email,
      perfil: "Cliente"
    }
    
    this.servicioUsuario.editarCliente(cliente).subscribe(rta=>{
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