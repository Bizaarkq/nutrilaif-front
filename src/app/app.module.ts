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
import {MatCheckboxModule} from '@angular/material/checkbox';

//componentes
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './views/components/components.module';
import { GeneralLayoutComponent } from './views/pages/layouts/general-layout/general-layout.component';
import { InicioComponent } from './views/pages/layouts/inicio/inicio.component';
import { ConsultaComponent } from './views/pages/consultas/consulta/consulta.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from './shared/shared.module';
import { ListadoExpedienteComponent } from './views/pages/expediente/listado-expediente/listado-expediente.component';
import { DatePipe } from '@angular/common';
import { ExpedienteComponent } from './views/pages/expediente/expediente/expediente.component';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { LOCALE_ID } from '@angular/core';
import { CalendarioComponent } from './views/pages/citas/calendario/calendario.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    GeneralLayoutComponent,
    InicioComponent,
    ConsultaComponent,
    ListadoExpedienteComponent,
    ExpedienteComponent,
    CalendarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
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
    MatStepperModule,
    MatSnackBarModule,
    MatCheckboxModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
