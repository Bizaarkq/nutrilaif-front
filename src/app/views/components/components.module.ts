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
import { RecordatorioComponent } from './consulta/recordatorio/recordatorio.component';
import { TablaDietaComponent } from './dieta/tabla-dieta/tabla-dieta.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { PlanificacionDietaComponent } from './planificacion-dieta/planificacion-dieta.component';



@NgModule({
  declarations: [
    DatosPersonalesComponent,
    ListarExpedientesComponent,
    FrecuenciaConsumoComponent,
    ListarAlimentosComponent,
    DialogAlimentoComponent,
    RecordatorioComponent,
    TablaDietaComponent,
    SpinnerComponent,
    PlanificacionDietaComponent,
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
    DialogAlimentoComponent,
    RecordatorioComponent,
    TablaDietaComponent,
    SpinnerComponent,
    PlanificacionDietaComponent,
  ]
})
export class ComponentsModule { }
