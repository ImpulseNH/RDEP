import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { enviroment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DiaService {

  constructor(private http: HttpClient) { }

  public obtenerDias(): Observable<any> {
    return this.http.get(enviroment.connHttp+'/dias');
  }

  public obtenerDiasDeServicio(id: number): Observable<any> {
    return this.http.get(enviroment.connHttp+'/dias/'+id);
  }

  public agregarDia(datos: any): Observable<any> {
    return this.http.post(enviroment.connHttp+'/dias', datos);
  }
}
