import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ok } from 'assert';
import { userResponse, userToken } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  userLogged: boolean = false;
  token: any;
  userName: string;
  userRole: string;

  constructor(private http: HttpClient, private router: Router) { }


  // public postLogin(request){
  // return this.http.post('http://localhost:3000/usuario/login',request)
  // }

  public postLogin(user: any) {
    return new Promise(resolve => {
      this.http.post<userToken>('http://localhost:3000/usuario/login', user)
        .subscribe(resp => {
          console.log(resp);
          if (resp.ok) {
            // this.saveToken(resp.token);
            // this.readToken();
            resolve(true);
          } else {
            // this.removeToken();
            console.log('Usuario o Contraseña Incorrectas')
            resolve(false)
          }
        })
    })
  }


  getUsuarios() {
    return this.http.get<userResponse>('http://localhost:3000/usuario');
  }
}



