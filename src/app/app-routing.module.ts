import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { GeneralLayoutComponent } from './views/pages/layouts/general-layout/general-layout.component';
import { InicioComponent } from './views/pages/layouts/inicio/inicio.component';
import { ConsultaComponent } from './views/pages/consultas/consulta/consulta.component';
import { ListadoExpedienteComponent } from './views/pages/expediente/listado-expediente/listado-expediente.component';
import { ExpedienteComponent } from './views/pages/expediente/expediente/expediente.component';

import { ListarAlimentosComponent } from './views/components/listar-alimentos/listar-alimentos.component';
import { CalendarioComponent } from './views/pages/citas/calendario/calendario.component';
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
        path: 'consulta/:modulo/:accion/:id_paciente/:id_consulta',
        canActivate: [AuthGuard],
        component: ConsultaComponent,
        canDeactivate: [DeactivateGuard],
        data: { roles: ['nutricionista']}
      },
      {
        path: 'consulta/:modulo/:accion/:id_paciente',
        canActivate: [AuthGuard],
        component: ConsultaComponent,
        canDeactivate: [DeactivateGuard],
        data: { roles: ['nutricionista']}
      },
      {
        path: 'consulta/:modulo/:accion',
        canActivate: [AuthGuard],
        component: ConsultaComponent,
        canDeactivate: [DeactivateGuard],
        data: { roles: ['nutricionista']}
      },
      {
        path: 'alimentos',
        canActivate: [AuthGuard],
        component: ListarAlimentosComponent,
        data: { roles: ['nutricionista']}
      },
      {
        path: 'expedientes',
        canActivate: [AuthGuard],
        component: ListadoExpedienteComponent,
        data: { roles: ['nutricionista', 'administrativo']}
      },
      {
        path: 'expediente/:id_paciente',
        canActivate: [AuthGuard],
        component: ExpedienteComponent,
        data: { roles: ['nutricionista', 'administrativo']}
      },
      {
        path: 'citas',
        canActivate: [AuthGuard],
        component: CalendarioComponent,
        data: { roles: ['administrativo', 'nutricionista']}
      },
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
