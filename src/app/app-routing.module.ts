import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/auth/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { GeneralLayoutComponent } from './views/pages/layouts/general-layout/general-layout.component';
import { InicioComponent } from './views/pages/layouts/inicio/inicio.component';
import { FrecuenciaConsumoComponent } from './views/components/consulta/frecuencia-consumo/frecuencia-consumo.component'

import { ListarAlimentosComponent } from './views/components/listar-alimentos/listar-alimentos.component';

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
        path: 'inicio',
        component: InicioComponent,
        canActivate: [AuthGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
