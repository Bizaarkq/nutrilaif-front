import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input'
import {MatStepperModule} from '@angular/material/stepper'
//componentes
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './views/components/components.module';
import { GeneralLayoutComponent } from './views/pages/layouts/general-layout/general-layout.component';
import { InicioComponent } from './views/pages/layouts/inicio/inicio.component';
import { ConsultaComponent } from './views/pages/consultas/consulta/consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralLayoutComponent,
    InicioComponent,
    ConsultaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
