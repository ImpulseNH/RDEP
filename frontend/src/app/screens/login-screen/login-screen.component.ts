import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  registro:boolean=false;
  constructor() {

  }

  ngOnInit(): void {
  }



  registrarse(){
    this.registro=true;
  }
  volverALogin(){
    this.registro=false;
  }
}
