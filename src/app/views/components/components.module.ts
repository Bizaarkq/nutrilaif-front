import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';


//Componentes
import { DatosPersonalesComponent } from './expediente/datos-personales/datos-personales.component';
import { ListarExpedientesComponent } from './expediente/listar-expedientes/listar-expedientes.component';
import { FrecuenciaConsumoComponent } from './consulta/frecuencia-consumo/frecuencia-consumo.component';



@NgModule({
  declarations: [
    DatosPersonalesComponent,
    ListarExpedientesComponent,
    FrecuenciaConsumoComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule, 
    MatGridListModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatTableModule
  ],
  exports: [
    DatosPersonalesComponent,
    FrecuenciaConsumoComponent
  ]
})
export class ComponentsModule { }
