import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'ngx-login-new',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login-new.component.scss']
})
export class LoginNewComponent {

  formLogin = this.formBuilder.group({
    USR_CORREO: ['', Validators.compose([Validators.required,Validators.email])],
    USR_CONTRASENA: ['', Validators.required]

  })

  submitted = false


  constructor(private formBuilder: FormBuilder, private service:UsuariosService){

  }


  login(){
    this.submitted = true
    this.service.postLogin(this.formLogin.value).subscribe((data: any) => {
      console.log(data)
      this.submitted = false
    },error=>{
      console.log(error)
    }
    )
    console.log(this.formLogin.value)
  }

  get email(){
    return this.formLogin.get("USR_CORREO");
  }

  get password(){
    return this.formLogin.get("USR_CONTRASENA");
  }

}
