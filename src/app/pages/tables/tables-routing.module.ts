import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './calendario/calendario.component';
import { TreeGridComponent } from './usuarios/usuarios.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: '',
      component: SmartTableComponent,
    },
    {
      path: 'usuarios',
      component: TreeGridComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  TreeGridComponent,
];
