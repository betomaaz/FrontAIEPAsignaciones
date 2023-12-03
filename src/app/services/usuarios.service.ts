import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  
    public postLogin(request){
      return this.http.post('http://localhost:3000/usuario/login',request)
    }
  
}
