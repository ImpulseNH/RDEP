import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  constructor(private http: HttpClient) { }

  public obtenerBloques(): Observable<any> {
    return this.http.get(enviroment.connHttp+'/bloques');
  }

  public obtenerBloquesDeServicio(id: number): Observable<any> {
    return this.http.get(enviroment.connHttp+'/bloques/servicio/'+id);
  }

  public agregarBloque(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/bloques', datos);
  }

  public cambiarDisponibilidadBloque(id: number, datos: any): Observable<any> {
    return this.http.put(enviroment.connHttp+'/bloques/disponibilidad/'+id, datos);
  }
}