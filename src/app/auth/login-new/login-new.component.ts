import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { NbLoginComponent } from '@nebular/auth';
import { Router } from '@angular/router';
import { User } from '../../interfaces';


@Component({
  selector: 'ngx-login-new',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login-new.component.scss']
})
export class LoginNewComponent {

  formLogin = this.formBuilder.group({
    USR_CORREO: ['', Validators.compose([Validators.required, Validators.email])],
    USR_CONTRASENA: ['', Validators.required]

  })

  submitted = false;
  errorMsj: string = "";
  error:Boolean = false;
  usuario: User = {};
  


  constructor(private formBuilder: FormBuilder,
    private service: UsuariosService, 
    private route: Router) {

  }


  async login() {

    console.log("funciona");
    // if(this.formLogin.valid){
      this.usuario.USR_CORREO = this.email?.value;
      this.usuario.USR_CONTRASENA = this.password?.value;
    
  //   this.submitted = true
  //   this.service.postLogin(this.formLogin.value).subscribe((data: any) => {
  //     this.submitted = false
  //     this.route.navigate(['pages']);
  //   }, error => {
  //     console.log(error)
  //   }
  //   )

      const result = await this.service.postLogin(this.usuario);
      if(result){
        console.log(result)
        this.route.navigate(['/pages'])
      }else{
        console.log(this.formLogin.value)
        this.error = true;
        this.errorMsj = "El usuario o contraseña son inválidos"
      }
    }

    // this.route.navigate(['pages']);
    // console.log(this.formLogin.value)
  // }

  get email() {
    return this.formLogin.get("USR_CORREO");
  }

  get password() {
    return this.formLogin.get("USR_CONTRASENA");
  }

}
