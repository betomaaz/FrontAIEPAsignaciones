import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http: HttpClient) { }

  public getComunas() {
    return this.http.get('http://localhost:3000/comuna')
  }

  public getHoras() {
    return this.http.get('http://localhost:3000/hora')
  }

  public getProyectos() {
    return this.http.get('http://localhost:3000/proyecto')
  }

  public getMotivos() {
    return this.http.get('http://localhost:3000/motivo')
  }

  public postActividades(request) {
    return this.http.post('http://localhost:3000/actividad', request)
  }

  public getActividad(AGE_FECHA) {
    return this.http.get(`http://localhost:3000/actividad/${AGE_FECHA}`)
  }

}