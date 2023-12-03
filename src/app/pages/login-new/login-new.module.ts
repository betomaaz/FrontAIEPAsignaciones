import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginNewComponent } from './login-new.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'login',
  component: LoginNewComponent
}];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class LoginNewModule { }
