import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private loginSubject = new Subject<boolean>();
  setLoginObservable = this.loginSubject.asObservable();

  constructor(private http: HttpClient) { }

  public login(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/auth/login', datos);
  }

  public logout(){
    localStorage.removeItem("emailUsuario");
    localStorage.clear();
  }

  public isAdmin(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/usuarios/isAdmin', datos);
  }

  public sendLoginData(estado:boolean){
    this.loginSubject.next(estado);
  }

  public getUsuarioLocalStorage(){
    return String(localStorage.getItem("emailUsuario"));
  }

  public saveUsuarioLocalStorage(email:number){
    localStorage.setItem("emailUsuario", String(email));
  }

  registrarUsuario(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/usuarios', datos);
  }
}
