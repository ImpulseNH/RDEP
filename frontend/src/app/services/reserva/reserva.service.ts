import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http: HttpClient) { }

  public obtenerReservas(): Observable<any> {
    return this.http.get(enviroment.connHttp+'/reservas');
  }

  public agregarReserva(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/reservas', datos);
  }

  public cancelarReserva(id: number): Observable<any> {
    return this.http.delete(enviroment.connHttp+'/reservas/'+id);
  }
}
