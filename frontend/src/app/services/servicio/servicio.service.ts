import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  public obtenerServicios(): Observable<any> {
    return this.http.get(enviroment.connHttp+'/servicios');
  }

  public obtenerServiciosDeRecinto(id: number): Observable<any> {
    return this.http.get(enviroment.connHttp+'/servicios/recinto/'+id);
  }

  public agregarServicio(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/servicios', datos);
  }

  public eliminarServicio(id: number): Observable<any> {
    return this.http.delete(enviroment.connHttp+'/servicios/'+id);
  }
}
