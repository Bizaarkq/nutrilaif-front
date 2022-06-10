import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulo encargado de almacenar todas las importaciones del angular material
import { SharedModule } from '../../shared/shared.module';

//Componentes
import { DatosPersonalesComponent } from './expediente/datos-personales/datos-personales.component';
import { ListarExpedientesComponent } from './expediente/listar-expedientes/listar-expedientes.component';
import { FrecuenciaConsumoComponent } from './consulta/frecuencia-consumo/frecuencia-consumo.component';
import { ListarAlimentosComponent } from './listar-alimentos/listar-alimentos.component';
import { DialogAlimentoComponent } from './dialog-alimento/dialog-alimento.component';



@NgModule({
  declarations: [
    DatosPersonalesComponent,
    ListarExpedientesComponent,
    FrecuenciaConsumoComponent,
    ListarAlimentosComponent,
    DialogAlimentoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DatosPersonalesComponent,
    FrecuenciaConsumoComponent,
    DatosPersonalesComponent,
    ListarAlimentosComponent,
    DialogAlimentoComponent
  ]
})
export class ComponentsModule { }
