import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.post(`http://localhost:3000/actividad/lista`, AGE_FECHA)
  }


  getModal(act_id) {


    return this.http.post(`http://localhost:3000/actividad/modal`, act_id)
  }

  getAuditor(fecha) {
    return this.http.post(`http://localhost:3000/actividad/auditor`, fecha)
  }






}