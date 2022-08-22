import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/auth/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { GeneralLayoutComponent } from './views/pages/layouts/general-layout/general-layout.component';
import { InicioComponent } from './views/pages/layouts/inicio/inicio.component';
import { ConsultaComponent } from './views/pages/consultas/consulta/consulta.component';
import { ListadoExpedienteComponent } from './views/pages/expediente/listado-expediente/listado-expediente.component';
import { ExpedienteComponent } from './views/pages/expediente/expediente/expediente.component';

import { ListarAlimentosComponent } from './views/components/listar-alimentos/listar-alimentos.component';
import { DeactivateGuard } from './services/deactivate.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: GeneralLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'consulta/:accion/:id_paciente/:id_consulta',
        canActivate: [AuthGuard],
        component: ConsultaComponent,
        canDeactivate: [DeactivateGuard]

      },
      {
        path: 'consulta/:accion/:id_paciente',
        canActivate: [AuthGuard],
        component: ConsultaComponent,
        canDeactivate: [DeactivateGuard]

      },
      {
        path: 'consulta/:accion',
        canActivate: [AuthGuard],
        component: ConsultaComponent,
        canDeactivate: [DeactivateGuard]
      },
      {
        path: 'alimentos',
        canActivate: [AuthGuard],
        component: ListarAlimentosComponent
      },
      {
        path: 'expedientes',
        canActivate: [AuthGuard],
        component: ListadoExpedienteComponent
      },
      {
        path: 'expediente/:id_paciente',
        canActivate: [AuthGuard],
        component: ExpedienteComponent
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'inicio',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
