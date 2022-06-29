import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RecintoService {

  constructor(private http: HttpClient) { }

  public obtenerRecintos(): Observable<any> {
    return this.http.get(enviroment.connHttp+'/recintos');
  }

  public agregarRecinto(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/recintos', datos);
  }

  public eliminarRecinto(id: number): Observable<any> {
    return this.http.delete(enviroment.connHttp+'/recintos/'+id);
  }

  public editarRecinto(datos: any): Observable<any> {
    return this.http.put(enviroment.connHttp+'/recintos/'+datos._id, datos);
  }
}