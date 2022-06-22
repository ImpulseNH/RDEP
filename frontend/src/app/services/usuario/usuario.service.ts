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

  private adminSubject = new Subject<boolean>();
  setAdminObservable = this.adminSubject.asObservable();

  constructor(private http: HttpClient) { }

  public registrarUsuario(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/usuarios', datos);
  }

  public obtenerUsuario(id: number): Observable<any> {
    return this.http.get(enviroment.connHttp+'/usuarios/'+id);
  }

  public obtenerIdConEmail(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/usuarios/email', datos);
  }

  public obtenerClientes(): Observable<any> {
    return this.http.get(enviroment.connHttp+'/usuarios/perfil/clientes');
  }

  public eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(enviroment.connHttp+'/usuarios/'+id)
  }

  public editarCliente(datos: any): Observable<any> {
    return this.http.put(enviroment.connHttp+'/usuarios/'+datos._id, datos);
  }

  // Login

  public login(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/auth/login', datos);
  }

  public logout(){
    localStorage.removeItem("emailUsuario");
    localStorage.clear();
  }

  // Login Usuario

  public getUsuarioLocalStorage(){
    return String(localStorage.getItem("emailUsuario"));
  }

  public saveUsuarioLocalStorage(email:string){
    localStorage.setItem("emailUsuario", email);
  }

  public sendLoginData(estado:boolean, admin:boolean){
    this.loginSubject.next(estado);
    this.adminSubject.next(admin);
  }

  // Login Admin
  public isAdmin(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/usuarios/isAdmin', datos);
  }
}