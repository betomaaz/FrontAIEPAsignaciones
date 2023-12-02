import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http:HttpClient) { }

  public getComunas(){
    return this.http.get('http://localhost:3000/comuna')
  }


}