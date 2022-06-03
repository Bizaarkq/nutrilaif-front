import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/auth/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { DatosPersonalesComponent } from './views/components/expediente/datos-personales/datos-personales.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'datos-personales',
    component: DatosPersonalesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
