import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './auditor/auditoria/auditoria.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'agendamiento',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },

    {
      path: 'misactividades',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },

    {
      path: 'reportes',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },

    {
      path: 'agenda',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'auditoria',
      loadChildren: () => import('./auditor/auditor.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'reportes',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: 'reportes'
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
