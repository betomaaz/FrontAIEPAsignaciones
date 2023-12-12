import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalOverlaysComponent } from './modal-overlays.component';
import { DialogComponent } from './dialog/dialog.component';
import { PopoversComponent } from './popovers/popovers.component';
import { ToastrComponent } from './misactividades/misactividades.component';
import { TooltipComponent } from './deposito/tooltip.component';

const routes: Routes = [{
  path: '',
  component: ModalOverlaysComponent,
  children: [
    {
      path: 'dialog',
      component: DialogComponent,
    },

    {
      path: 'popover',
      component: PopoversComponent,
    },
    {
      path: 'deposito',
      component: TooltipComponent,
    },
    {
      path: '',
      component: ToastrComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalOverlaysRoutingModule {
}


