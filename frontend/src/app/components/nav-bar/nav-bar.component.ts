import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  login:boolean=false;
  constructor(private servicioUsuario:UsuarioService, private router:Router) { }

  ngOnInit(): void {
    this.servicioUsuario.setLoginObservable.subscribe(rta=>{
      this.login=rta;
    });
  }

  logOut(){
    this.servicioUsuario.logout();
    this.login=false;
    this.servicioUsuario.sendLoginData(false);
    this.router.navigate(['/login']);
  }
}
